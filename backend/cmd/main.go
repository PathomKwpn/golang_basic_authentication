package main

import (
	"github.com/PathomKwpn/basic_golang_auth/configs"
	"github.com/PathomKwpn/basic_golang_auth/routes"
	"github.com/labstack/echo"
)


func main() {
    e := echo.New()

    configs.ConnectDB()

    routes.UserRoute(e)
    routes.AuthRoute(e)

    e.Logger.Fatal(e.Start(":6000"))
}