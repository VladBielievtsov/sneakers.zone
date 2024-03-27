package handlers

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/vladbielievtsov/sneakers/config"
	"github.com/vladbielievtsov/sneakers/database"
	"github.com/vladbielievtsov/sneakers/models"
	"golang.org/x/crypto/bcrypt"
	"golang.org/x/oauth2"
)

func Signup(c *fiber.Ctx) error {
	var payload *models.SignupRequest

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "errors": err.Error()})
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(payload.Password), bcrypt.DefaultCost)

	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "errors": err.Error()})
	}

	newUser := models.User{
		Fullname: payload.Fullname,
		Email:    strings.ToLower(payload.Email),
		Password: string(hashedPassword),
	}

	if err := database.DB.Create(&newUser).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to create user"})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "data": fiber.Map{"user": models.FilterUser(&newUser)}})
}

func Login(c *fiber.Ctx) error {
	var payload *models.LoginRequest

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "errors": err.Error()})
	}

	var user models.User
	result := database.DB.First(&user, "email = ?", strings.ToLower(payload.Email))
	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "Invalid email or Password"})
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "Invalid email or Password"})
	}

	tokenByte := jwt.New(jwt.SigningMethodHS256)
	now := time.Now().UTC()
	claims := tokenByte.Claims.(jwt.MapClaims)

	claims["sub"] = user.ID
	claims["exp"] = now.Add(120 * time.Minute).Unix()
	claims["iat"] = now.Unix()
	claims["nbf"] = now.Unix()

	tokenString, err := tokenByte.SignedString([]byte(os.Getenv("JWT_SECRET")))
	if err != nil {
		return c.Status(fiber.StatusBadGateway).JSON(fiber.Map{"status": "fail", "message": fmt.Sprintf("generating JWT Token failed: %v", err)})
	}

	c.Cookie(&fiber.Cookie{
		Name:     "token",
		Value:    tokenString,
		Path:     "/",
		MaxAge:   120 * 60,
		Secure:   false,
		HTTPOnly: true,
		Domain:   "localhost",
	})
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "data": fiber.Map{"token": tokenString, "user": models.FilterUser(&user)}})
}

func Logout(c *fiber.Ctx) error {
	expired := time.Now().Add(-time.Hour * 24)
	c.Cookie(&fiber.Cookie{
		Name:    "token",
		Value:   "",
		Expires: expired,
	})
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success"})
}

func GetMe(c *fiber.Ctx) error {
	user := c.Locals("user").(models.UserResponse)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "data": fiber.Map{"user": user}})
}

func Google(c *fiber.Ctx) error {
	url := config.GetGoogleOauthConfig().AuthCodeURL("state-token", oauth2.AccessTypeOffline)
	return c.Redirect(url)
}

func GoogleCallBack(c *fiber.Ctx) error {
	code := c.Query("code")
	token, err := config.GetGoogleOauthConfig().Exchange(oauth2.NoContext, code)
	if err != nil {
		return err
	}

	client := config.GetGoogleOauthConfig().Client(oauth2.NoContext, token)
	resp, err := client.Get("https://www.googleapis.com/oauth2/v2/userinfo")
	if err != nil {
		return err
	}

	defer resp.Body.Close()

	var googleUser struct {
		Email string `json:"email"`
		Name  string `json:"name"`
		ID    string `json:"id"`
	}

	if err := json.NewDecoder(resp.Body).Decode(&googleUser); err != nil {
		return err
	}

	var existingUser models.User
	if err := database.DB.Where("email = ?", googleUser.Email).First(&existingUser).Error; err != nil {
		hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(googleUser.ID), bcrypt.DefaultCost)
		newUser := models.User{
			Fullname: googleUser.Name,
			Email:    googleUser.Email,
			Password: string(hashedPassword),
			GoogleID: googleUser.ID,
		}

		if err := database.DB.Create(&newUser).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to create user"})
		}
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "data": fiber.Map{"user": models.FilterUser(&newUser)}})
	} else {
		existingUser.GoogleID = googleUser.ID
		database.DB.Save(&existingUser)
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "data": fiber.Map{"user": models.FilterUser(&existingUser)}})
}
