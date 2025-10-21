const express = require('express');
const { Schema, model } = require('mongoose');
const UserSchema = new Schema({
    userName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: [/^\S+@\S+\.\S+$/, 'Please use a valid email']
    },
    password:{
        type:String,
        required:true
    }
})
const User = new model("User",UserSchema);
module.exports = User