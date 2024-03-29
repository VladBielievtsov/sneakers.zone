package models

import (
	"time"

	"github.com/google/uuid"
)

type User struct {
	ID        *uuid.UUID `gorm:"type:uuid;default:uuid_generate_v4();primary_key"`
	Fullname  string     `gorm:"varchar(255);not null"`
	Email     string     `gorm:"varchar(255);unique;not null"`
	Password  string     `gorm:"varchar(255);not null"`
	GoogleID  string     `gorm:"varchar(255);unique"`
	CreatedAt *time.Time `gorm:"not null;default:now()"`
	UpdatedAt *time.Time `gorm:"not null;default:now()"`
}

type UserResponse struct {
	ID        uuid.UUID `json:"id,omitempty"`
	Fullname  string    `json:"fullname,omitempty"`
	Email     string    `json:"email,omitempty"`
	CreatedAt time.Time `json:"createdAt"`
	UpdatedAt time.Time `json:"updatedAt"`
}

func FilterUser(user *User) UserResponse {
	return UserResponse{
		ID:        *user.ID,
		Fullname:  user.Fullname,
		Email:     user.Email,
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
