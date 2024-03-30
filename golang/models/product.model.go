package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

type Size struct {
	ID        uint       `json:"id"`
	ProductID *uuid.UUID `json:"productID"`
	Size      string     `json:"size"`
	Quantity  int        `json:"quantity"`
}

type Product struct {
	ID          *uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	Title       string          `gorm:"varchar(255);not null" json:"title"`
	Description string          `gorm:"varchar(255);not null" json:"description"`
	Price       decimal.Decimal `gorm:"type:decimal(10,2);not null" json:"price"`
	Sizes       []Size          `gorm:"foreignKey:ProductID" json:"sizes"`
	CreatedAt   *time.Time      `gorm:"not null;default:now()" json:"createdAt"`
	UpdatedAt   *time.Time      `gorm:"not null;default:now()" json:"updatedAt"`
}

type ProductRequest struct {
	Title       string          `json:"title"`
	Description string          `json:"description"`
	Price       decimal.Decimal `json:"price"`
	Sizes       []Size          `json:"sizes"`
}
