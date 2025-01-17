package controllers

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/PathomKwpn/basic_golang_auth/configs"
	"github.com/PathomKwpn/basic_golang_auth/models"
	"github.com/PathomKwpn/basic_golang_auth/responses"
	"github.com/PathomKwpn/basic_golang_auth/utils"

	"github.com/labstack/echo"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

var userAuthCollection *mongo.Collection = configs.GetCollection(configs.DB, "user_accounts")

func RegisterUser(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var userRegister models.UserRegister
	// Bind และ Validate ในขั้นตอนเดียว
	if err := c.Bind(&userRegister); err != nil {
		fmt.Println("Error binding userRegister:", err)
		return c.JSON(http.StatusBadRequest, responses.UserLoginResponse{
			Status:  http.StatusBadRequest,
			Message: "error",
			Data:    &echo.Map{"data": err.Error()},
		})
	}
	if err := validate.Struct(&userRegister); err != nil {
		fmt.Println("Error validating userRegister:", err)
		return c.JSON(http.StatusBadRequest, responses.UserLoginResponse{
			Status:  http.StatusBadRequest,
			Message: "error",
			Data:    &echo.Map{"data": err.Error()},
		})
	}

	// ตรวจสอบอีเมลซ้ำ
	if err := userAuthCollection.FindOne(ctx, bson.M{"email": userRegister.Email}).Err(); err == nil {
		fmt.Println("Email already exists")
		return c.JSON(http.StatusConflict, responses.UserLoginResponse{
			Status:  http.StatusConflict,
			Message: "error",
			Data:    &echo.Map{"data": "Email already exists"},
		})
	}

	// ตรวจสอบรหัสผ่านและยืนยันรหัสผ่าน
	if userRegister.Password != userRegister.ConfirmPassword {
		fmt.Fprintln(c.Response().Writer, "Password and ConfirmPassword should match")
		return c.JSON(http.StatusBadRequest, responses.UserLoginResponse{
			Status:  http.StatusBadRequest,
			Message: "error",
			Data:    &echo.Map{"data": "Password and ConfirmPassword should match"},
		})
	}

	// เข้ารหัสรหัสผ่าน
	hashedPassword, err := utils.HashPassword(userRegister.Password)
	if err != nil {
		log.Println("Error hashing password:", err)
		return c.JSON(http.StatusInternalServerError, responses.UserLoginResponse{
			Status:  http.StatusInternalServerError,
			Message: "error",
			Data:    &echo.Map{"data": "Failed to hash password"},
		})
	}

	// สร้างข้อมูลผู้ใช้ใหม่
	newAccountUser := models.UserRegisterInsert{
		Id:         primitive.NewObjectID(),
		Email:      userRegister.Email,
		Password:   hashedPassword,
		CreateDate: time.Now(),
		UpdateDate: time.Now(),
	}

	// แทรกข้อมูลผู้ใช้ในฐานข้อมูล
	if result, err := userAuthCollection.InsertOne(ctx, newAccountUser); err != nil {
		fmt.Println("Error inserting user:", err)
		return c.JSON(http.StatusInternalServerError, responses.UserRegisterResponse{
			Status:  http.StatusInternalServerError,
			Message: "error",
			Data:    &echo.Map{"data": err.Error()},
		})
	} else {
		return c.JSON(http.StatusCreated, responses.UserRegisterResponse{
			Status:  http.StatusCreated,
			Message: "success",
			Data:    &echo.Map{"data": result},
		})
	}
}

func LoginUser(c echo.Context) error {
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	var userLogin models.UserLogin

	// Bind และ Validate ในขั้นตอนเดียว
	if err := c.Bind(&userLogin); err != nil {
		return c.JSON(http.StatusBadRequest, responses.UserLoginResponse{
			Status:  http.StatusBadRequest,
			Message: "error",
			Data:    &echo.Map{"data": err.Error()},
		})
	}
	if err := validate.Struct(&userLogin); err != nil {
		return c.JSON(http.StatusBadRequest, responses.UserLoginResponse{
			Status:  http.StatusBadRequest,
			Message: "error",
			Data:    &echo.Map{"data": err.Error()},
		})
	}

	// ค้นหาผู้ใช้งานในฐานข้อมูล
	var existingUser models.UserLogin
	err := userAuthCollection.FindOne(ctx, bson.M{"email": userLogin.Email}).Decode(&existingUser)
	if err != nil {
		return c.JSON(http.StatusUnauthorized, responses.UserLoginResponse{
			Status:  http.StatusUnauthorized,
			Message: "error",
			Data:    &echo.Map{"data": "Invalid email or password"},
		})
	}

	// ตรวจสอบรหัสผ่าน
	if !utils.CheckPasswordHash(userLogin.Password, existingUser.Password) {
		return c.JSON(http.StatusUnauthorized, responses.UserLoginResponse{
			Status:  http.StatusUnauthorized,
			Message: "error",
			Data:    &echo.Map{"data": "Invalid email or password"},
		})
	}

	// สร้าง JWT Token
	token, err := utils.GenerateJWT(existingUser.Email)
	fmt.Println("tokennn : ", token)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, responses.UserLoginResponse{
			Status:  http.StatusInternalServerError,
			Message: "error",
			Data:    &echo.Map{"data": "Failed to generate token"},
		})
	}

	// การเข้าสู่ระบบสำเร็จ พร้อมส่ง Token กลับ
	return c.JSON(http.StatusOK, responses.UserLoginResponse{
		Status:  http.StatusOK,
		Message: "success",
		Data:    &echo.Map{
			"message": "Login success",
			"token":   token, // ส่ง Token กลับไปให้ Frontend
		},
	})
}