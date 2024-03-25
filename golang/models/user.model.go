package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID        *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id,omitempty"`
	Fullname  string     `gorm:"varchar(255);not null" json:"fullname,omitempty"`
	Email     string     `gorm:"varchar(255);unique;not null" json:"email,omitempty"`
	Password  string     `gorm:"varchar(255);not null" json:"password,omitempty"`
	CreatedAt time.Time  `gorm:"not null" json:"createdAt,omitempty"`
	UpdatedAt time.Time  `gorm:"not null" json:"updatedAt,omitempty"`
}

type SignupRequest struct {
	Fullname string `json:"fullname"`
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}
