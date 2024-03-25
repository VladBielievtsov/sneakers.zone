package router

import (
	"github.com/gofiber/fiber/v2"
	"github.com/vladbielievtsov/sneakers/handlers"
	"github.com/vladbielievtsov/sneakers/middleware"
)

func Routes(micro *fiber.App) {
	micro.Get("/", handlers.HandlerIndex)

	micro.Route("/auth", func(router fiber.Router) {
		router.Post("/signup", handlers.Signup)
		router.Post("/login", handlers.Login)
		router.Post("/logout", middleware.DeserializeUser, handlers.Logout)
	})

	micro.Get("/user", middleware.DeserializeUser, handlers.GetMe)
}
