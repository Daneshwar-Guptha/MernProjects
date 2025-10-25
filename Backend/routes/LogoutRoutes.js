const express = require('express')
const LogoutRoutes = express.Router();
const User = require('../model/UserSchema')
const cookie = require("cookie");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validator = require('validator');
LogoutRoutes.use(express.json());

LogoutRoutes.get('/logout',async(req,res)=>{
    const token= null;
    res.clearCookie("token",token);
    res.status(200).send("sucess");
})
module.exports = LogoutRoutes;