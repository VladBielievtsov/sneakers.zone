package models

type CheckoutRequest struct {
	Products []ListProducts `json:"products"`
	Email    string         `json:"email"`
}

type ListProducts struct {
	Category    string `json:"category"`
	ID          string `json:"id"`
	CreatedAt   string `json:"createdAt"`
	Description string `json:"description"`
	Price       string `json:"price"`
	Quantity    int    `json:"quantity"`
	Title       string `json:"title"`
	UpdatedAt   string `json:"updatedAt"`
}
