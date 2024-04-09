package handlers

import (
	"github.com/gofiber/fiber/v2"
	"github.com/shopspring/decimal"
	"github.com/vladbielievtsov/sneakers/database"
	"github.com/vladbielievtsov/sneakers/models"
)

const IsAdmin = "admin"

func Store(c *fiber.Ctx) error {

	isAdmin := c.Locals("role").(string)

	if isAdmin != IsAdmin {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "You are not admin"})
	}

	var payload models.ProductRequest
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": err.Error()})
	}

	price, err := decimal.NewFromString(payload.Price.String())
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "Invalid price format"})
	}

	newProduct := models.Product{
		Title:       payload.Title,
		Description: payload.Description,
		Price:       price,
		Category:    payload.Category,
	}

	for _, size := range payload.Sizes {
		newSize := models.Size{
			Size:     size.Size,
			Quantity: size.Quantity,
		}
		newProduct.Sizes = append(newProduct.Sizes, newSize)
	}

	if err := database.DB.Create(&newProduct).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to create product"})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "data": fiber.Map{"product": &newProduct}})
}

func FindAll(c *fiber.Ctx) error {
	var products []models.Product

	result := database.DB.Preload("Sizes")
	category := c.Query("category")
	if category != "" && category != "shop-all" {
		result = result.Where("category = ?", category)
	}

	sortParam := c.Query("sort")
	switch sortParam {
	case "price-asc":
		result = result.Order("price ASC")
	case "price-desc":
		result = result.Order("price DESC")
	case "", "none":
	default:
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "Invalid sort parameter"})
	}

	result.Find(&products)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "fail", "message": "Products not found"})
	}
	return c.Status(fiber.StatusCreated).JSON(fiber.Map{"status": "success", "data": fiber.Map{"products": products}})
}

func FindById(c *fiber.Ctx) error {
	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "ID parameter is required"})
	}

	var product models.Product
	result := database.DB.Preload("Sizes").First(&product, "id = ?", id)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Product not found"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "data": fiber.Map{"product": product}})
}

func Update(c *fiber.Ctx) error {
	isAdmin := c.Locals("role").(string)

	if isAdmin != IsAdmin {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "You are not admin"})
	}

	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "ID parameter is required"})
	}

	var product models.Product
	result := database.DB.Preload("Sizes").First(&product, "id = ?", id)

	if result.Error != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Product not found"})
	}

	var payload models.ProductRequest
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "errors": err.Error()})
	}

	product.Title = payload.Title
	product.Description = payload.Description
	price, err := decimal.NewFromString(payload.Price.String())
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "Invalid price format"})
	}
	product.Price = price
	product.Category = payload.Category

	if err := database.DB.Where("product_id = ?", id).Delete(&models.Size{}).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to delete old sizes", "error": err.Error()})
	}

	product.Sizes = nil

	for _, size := range payload.Sizes {
		newSize := models.Size{
			Size:      size.Size,
			Quantity:  size.Quantity,
			ProductID: product.ID,
		}
		product.Sizes = append(product.Sizes, newSize)
	}

	if err := database.DB.Save(&product).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to update product", "error": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "data": fiber.Map{"product": product}})
}

func Delete(c *fiber.Ctx) error {
	isAdmin := c.Locals("role").(string)

	if isAdmin != IsAdmin {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "You are not admin"})
	}

	id := c.Params("id")
	if id == "" {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "ID parameter is required"})
	}

	var product models.Product
	result := database.DB.Preload("Sizes").First(&product, "id = ?", id)
	if result.Error != nil {
		return c.Status(fiber.StatusNotFound).JSON(fiber.Map{"status": "fail", "message": "Product not found"})
	}

	if err := database.DB.Delete(&product.Sizes).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to delete sizes", "error": err.Error()})
	}

	if err := database.DB.Delete(&product).Error; err != nil {
		return c.Status(fiber.StatusInternalServerError).JSON(fiber.Map{"status": "fail", "message": "Failed to delete product", "error": err.Error()})
	}
	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "message": "Product deleted successfully"})
}

// func saveFile(file *multipart.FileHeader, filename string) error {
// 	src, err := file.Open()
// 	if err != nil {
// 		return err
// 	}
// 	defer src.Close()

// 	dst, err := os.Create(filepath.Join("./uploads", filename))
// 	if err != nil {
// 		return err
// 	}
// 	defer dst.Close()

// 	if _, err = io.Copy(dst, src); err != nil {
// 		return err
// 	}

// 	return nil
// }
