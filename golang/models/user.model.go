package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID                *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key" json:"id,omitempty"`
	Fullname          string     `gorm:"varchar(255);not null" json:"fullname,omitempty"`
	Email             string     `gorm:"varchar(255);unique;not null" json:"email,omitempty"`
	Password          string     `gorm:"varchar(255);not null" json:"password"`
	GoogleID          *string    `gorm:"varchar(255);unique" json:"googleId"`
	IsConfirmed       bool       `gorm:"not null;default:false" json:"isConfirmed"`
	Role              string     `gorm:"varchar(50);not null;default:'user'" json:"role"`
	ConfirmationToken string     `gorm:"varchar(255)" json:"confirmationToken"`
	CreatedAt         *time.Time `gorm:"not null;default:now()" json:"createdAt"`
	UpdatedAt         *time.Time `gorm:"not null;default:now()" json:"updatedAt"`
}

type UserResponse struct {
	ID        uuid.UUID `json:"id,omitempty"`
	Fullname  string    `json:"fullname,omitempty"`
	Email     string    `json:"email,omitempty"`
	Role      string    `json:"role"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func FilterUser(user *User) UserResponse {
	return UserResponse{
		ID:        *user.ID,
		Fullname:  user.Fullname,
		Email:     user.Email,
		Role:      user.Role,
		CreatedAt: *user.CreatedAt,
		UpdatedAt: *user.UpdatedAt,
	}
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
