package controllers

import (
	"context"
	"net/http"
	"time"

	"github.com/PathomKwpn/basic_golang_auth/configs"
	"github.com/PathomKwpn/basic_golang_auth/models"
	"github.com/PathomKwpn/basic_golang_auth/responses"
	"github.com/labstack/echo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var userLoginCollection *mongo.Collection = configs.GetCollection(configs.DB, "user_accounts")

func RegisterUser(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var userRegister models.UserRegister
	defer cancel()

	// Bind the request body to the userLogin struct
	if err := c.Bind(&userRegister); err != nil {
		return c.JSON(http.StatusBadRequest, responses.UserLoginResponse{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": err.Error()}})
	}
	
	//Validate the request body
	if validationErr := validate.Struct(&userRegister); validationErr != nil {
		return c.JSON(http.StatusBadRequest, responses.UserLoginResponse{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": validationErr.Error()}})
	}

	// Check if email already exists
	var existingUser models.UserRegister
	err := userLoginCollection.FindOne(ctx, bson.M{"email": userRegister.Email}).Decode(&existingUser)
	if err == nil {
		return c.JSON(http.StatusInternalServerError, responses.UserLoginResponse{Status: http.StatusInternalServerError, Message: "error", Data: &echo.Map{"data": "Email already exists"}})
	}

	//Password and ConfirmPassword should match
	if userRegister.Password != userRegister.ConfirmPassword {
		return c.JSON(http.StatusBadRequest, responses.UserLoginResponse{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": "Password and ConfirmPassword should match"}})
	}

	newAccountUser := models.UserRegister{
		Id:              primitive.NewObjectID(),
		Email:           userRegister.Email,
		Password:        userRegister.Password,
	}

	result, err := userLoginCollection.InsertOne(ctx, newAccountUser)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, responses.UserLoginResponse{Status: http.StatusInternalServerError, Message: "error", Data: &echo.Map{"data": err.Error()}})
	}
	return c.JSON(http.StatusCreated, responses.UserLoginResponse{Status: http.StatusCreated, Message: "success", Data: &echo.Map{"data": result}})
}

func LoginUser(c echo.Context) error {
	_, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	var userLogin models.UserLogin
	defer cancel()

	// Bind the request body to the userLogin struct
	if err := c.Bind(&userLogin); err != nil {
		return c.JSON(http.StatusBadRequest, responses.UserLoginResponse{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": err.Error()}})
	}

	//Validate the request body
	if validationErr := validate.Struct(&userLogin); validationErr != nil {
		return c.JSON(http.StatusBadRequest, responses.UserLoginResponse{Status: http.StatusBadRequest, Message: "error", Data: &echo.Map{"data": validationErr.Error()}})
	}


	return c.JSON(http.StatusOK, responses.UserLoginResponse{Status: http.StatusOK, Message: "success", Data: &echo.Map{"data": "Login success"}})
}