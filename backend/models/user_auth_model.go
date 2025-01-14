package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type UserLogin struct {
	Id       primitive.ObjectID `json:"id,omitempty"`
	Email    string             `json:"email" validate:"required,email"`
	Password string             `json:"password" validate:"required"`
}

type UserRegister struct {
	Id 		           primitive.ObjectID `json:"id,omitempty"`
	Email            string             `json:"email" validate:"required,email"`
	Password         string             `json:"password" validate:"required"`
	ConfirmPassword  string             `json:"confirm_password" validate:"required"`
}

type UserRegisterInsert struct{
	Id 		           primitive.ObjectID `json:"id,omitempty"`
	Email            string             `json:"email" validate:"required,email"`
	Password         string             `json:"password" validate:"required"`
}