package handlers

import (
	"encoding/json"
	"fmt"
	"net/smtp"
	"os"
	"strings"
	"time"

	"github.com/gofiber/fiber/v2"
	"github.com/golang-jwt/jwt"
	"github.com/vladbielievtsov/sneakers/config"
	"github.com/vladbielievtsov/sneakers/database"
	"github.com/vladbielievtsov/sneakers/models"
	"github.com/vladbielievtsov/sneakers/utils"
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

	token, err := utils.GenerateToken()
	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to create token"})
	}

	newUser := models.User{
		Fullname:          payload.Fullname,
		Email:             strings.ToLower(payload.Email),
		Password:          string(hashedPassword),
		GoogleID:          nil,
		ConfirmationToken: token,
	}

	if err := database.DB.Create(&newUser).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to create user"})
	}

	auth := config.SendMail()
	msg := "Subject: Sneakers - Email Confirmation\r\nContent-Type: text/html; charset=utf-8\r\n\r\n<html><body><p>Confirm Email: <a href='http://localhost:8080/api/auth/confirm/" + token + "'>Confirmation Link</a></p></body></html>\r\n"

	err = smtp.SendMail(
		"smtp.gmail.com:587",
		auth,
		os.Getenv("SMTPFrom"),
		[]string{strings.ToLower(payload.Email)},
		[]byte(msg),
	)

	if err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to send confirmation email"})
	}

	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "data": fiber.Map{"user": models.FilterUser(&newUser)}})
}

func Confirmation(c *fiber.Ctx) error {
	var token = c.Params("token")

	var user models.User
	result := database.DB.First(&user, "confirmation_token = ?", token)
	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "Invalid token"})
	}

	user.IsConfirmed = true
	user.ConfirmationToken = ""

	if err := database.DB.Save(&user).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to confiem email", "error": err.Error()})
	}
	return c.Redirect("http://localhost:3000/sneakers")
}

func Login(c *fiber.Ctx) error {
	var payload *models.LoginRequest

	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "errors": err.Error()})
	}

	var user models.User
	result := database.DB.First(&user, "email = ?", strings.ToLower(payload.Email))
	if result.Error != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "Invalid Email or Password"})
	}

	if !user.IsConfirmed {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Email is not confirmed"})
	}

	err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(payload.Password))
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "Invalid Email or Password"})
	}

	tokenByte := jwt.New(jwt.SigningMethodHS256)
	now := time.Now().UTC()
	claims := tokenByte.Claims.(jwt.MapClaims)

	claims["sub"] = user.ID
	claims["exp"] = now.Add(120 * time.Minute).Unix()
	claims["role"] = user.Role
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

	c.Locals("user", user)

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "data": fiber.Map{"token": tokenString, "user": models.FilterUser(&user)}})
}

func Logout(c *fiber.Ctx) error {
	c.Locals("user", nil)
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
			GoogleID: &googleUser.ID,
		}

		if err := database.DB.Create(&newUser).Error; err != nil {
			return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to create user"})
		}
		return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "data": fiber.Map{"user": models.FilterUser(&newUser)}})
	} else {
		existingUser.GoogleID = &googleUser.ID
		database.DB.Save(&existingUser)
	}

	c.Locals("user", &existingUser)
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "data": fiber.Map{"user": models.FilterUser(&existingUser)}})
}
