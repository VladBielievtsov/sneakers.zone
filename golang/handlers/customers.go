package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vladbielievtsov/sneakers/database"
	"github.com/vladbielievtsov/sneakers/models"
)

func FindAllCustomers(c *fiber.Ctx) error {
	var customers []models.User

	result := database.DB.Find(&customers)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "fail", "message": "Customers not found"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "data": fiber.Map{"customers": customers}})
}
