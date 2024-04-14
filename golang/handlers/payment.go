package handlers

import (
	"fmt"
	"os"
	"strconv"

	"github.com/gofiber/fiber/v2"
	"github.com/stripe/stripe-go/v78"
	"github.com/stripe/stripe-go/v78/checkout/session"
	"github.com/vladbielievtsov/sneakers/models"
)

type PriceData struct {
	Currency    string `json:"currency"`
	ProductData struct {
		Title string `json:"title"`
	} `json:"product_data"`
	UnitAmount int `json:"unit_amount"`
}

type LineItem struct {
	PriceData PriceData `json:"price_data"`
	Quantity  int       `json:"quantity"`
}

func CreateCheckoutSession(c *fiber.Ctx) error {

	var payload models.CheckoutRequest
	if err := c.BodyParser(&payload); err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": err.Error()})
	}

	stripe.Key = os.Getenv("StripeKey")

	var lineItems []*stripe.CheckoutSessionLineItemParams

	for _, product := range payload.Products {
		price, err := strconv.ParseInt(product.Price, 10, 64)
		if err != nil {
			fmt.Println("Error:", err)
			return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "Invalid price format"})
		}
		lineItems = append(lineItems, &stripe.CheckoutSessionLineItemParams{
			PriceData: &stripe.CheckoutSessionLineItemPriceDataParams{
				Currency: stripe.String("usd"),
				ProductData: &stripe.CheckoutSessionLineItemPriceDataProductDataParams{
					Name: stripe.String(product.Title),
				},
				UnitAmount: stripe.Int64(price * 100),
			},
			Quantity: stripe.Int64(int64(product.Quantity)),
		})
	}

	params := &stripe.CheckoutSessionParams{
		LineItems:     lineItems,
		CustomerEmail: &payload.Email,
		Mode:          stripe.String(string(stripe.CheckoutSessionModePayment)),
		SuccessURL:    stripe.String("http://localhost:3000/success"),
		CancelURL:     stripe.String("http://localhost:3000/sneakers"),
	}

	result, err := session.New(params)
	if err != nil {
		return c.Status(fiber.StatusBadRequest).JSON(fiber.Map{"status": "fail", "message": "Failed to make session id (stripe)"})
	}

	return c.Status(fiber.StatusOK).JSON(fiber.Map{"status": "success", "result": result})
}
