const express = require('express')
const LogoutRoutes = express.Router();
const User = require('../model/UserSchema')
const cookie = require("cookie");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validator = require('validator');
LogoutRoutes.use(express.json());

LogoutRoutes.get('/logout', (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,    
    secure: false,      
    sameSite: 'lax',
  });
  res.status(200).json({ message: 'Logged out successfully' });
});
module.exports = LogoutRoutes;