const express = require('express');
const { Schema, model } = require('mongoose');
const validator = require('validator');
const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        minLength:[4,"minimum length is 4"]
    },
    email:{
        type:String,
        required:true,
        unique:true,
        validate:{
        validator:validator.isEmail,
        message: "Please enter a valid email address"
        }
        
    },
    password:{
        type:String,
        required:true,
        validate:{
            validator:validator.isStrongPassword,
            message:"please Enter Strong password"
        }
    }
},{timestamps:true})
const User = new model("User",UserSchema);
module.exports = User