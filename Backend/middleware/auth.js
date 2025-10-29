const express = require('express');
const cookie = require('cookie-parser');
const User = require('../model/UserSchema');
const jwt = require('jsonwebtoken')
const auth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        const decodedObj = await jwt.verify(token, "UserSchema");
        const { id } = decodedObj;
        const userFound = await User.findById(id).select("-password");
        if (!userFound) {
            throw new Error('Invalid User')
        }
        req.user = userFound;
        next();
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}
module.exports = auth
