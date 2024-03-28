package config

import (
	"net/smtp"
	"os"
)

func SendMail() smtp.Auth {
	return smtp.PlainAuth(
		"",
		os.Getenv("SMTPFrom"),
		os.Getenv("SMTPPassword"),
		"smtp.gmail.com",
	)
}
