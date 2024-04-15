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

		router.Get("/confirm/:token", handlers.Confirmation)

		router.Get("/google", handlers.Google)
		router.Get("/google/callback", handlers.GoogleCallBack)
	})

	micro.Get("/user", middleware.DeserializeUser, handlers.GetMe)

	micro.Route("/product", func(router fiber.Router) {
		router.Post("/", middleware.DeserializeUser, handlers.Store)
		router.Get("/", handlers.FindAll)
		router.Get("/:id", handlers.FindById)
		router.Put("/:id", middleware.DeserializeUser, handlers.Update)
		router.Delete("/:id", middleware.DeserializeUser, handlers.Delete)
	})

	micro.Post("/create-checkout-session", handlers.CreateCheckoutSession)

	micro.Route("/customers", func(router fiber.Router) {
		router.Get("/", handlers.FindAllCustomers)
	})
}
