package models

import (
	"time"

	"github.com/google/uuid"
	"github.com/shopspring/decimal"
)

type Product struct {
	ID          *uuid.UUID      `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id"`
	Title       string          `gorm:"varchar(255);not null" json:"title"`
	Description string          `gorm:"varchar(255);not null" json:"description"`
	Price       decimal.Decimal `gorm:"type:decimal(10,2);not null" json:"price"`
	CreatedAt   *time.Time      `gorm:"not null;default:now()" json:"createdAt"`
	UpdatedAt   *time.Time      `gorm:"not null;default:now()" json:"updatedAt"`
}

type ProductRequest struct {
	Title       string          `json:"title"`
	Description string          `json:"description"`
	Price       decimal.Decimal `json:"price"`
}
