package routes

import (
	"github.com/PathomKwpn/basic_golang_auth/controllers"
	"github.com/labstack/echo"
)

func UserRoute(e *echo.Echo) {
	e.POST("/user",controllers.CreateUser)
	e.GET("/user/:userId",controllers.GetAUser)
	e.PUT("user/:userId",controllers.EditAUser)
	e.DELETE("/user/:userId", controllers.DeleteAUser)
	e.GET("/users",controllers.GetAllUsers)
}