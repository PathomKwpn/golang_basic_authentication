package routes

import (
	"github.com/PathomKwpn/basic_golang_auth/controllers"
	"github.com/labstack/echo"
)

func AuthRoute(e *echo.Echo) {
	e.POST("/register", controllers.RegisterUser)
}