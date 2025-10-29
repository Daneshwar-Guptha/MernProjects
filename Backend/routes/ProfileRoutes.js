const express = require('express');
const ProfileRoutes = express.Router();
const auth = require('../middleware/auth');
const User = require('../model/UserSchema');
const jwt = require('jsonwebtoken');
const validator = require('validator');

ProfileRoutes.get('/view/:id', auth, async (req, res) => {
    const { id } = req.params;
    const data = await User.findOne({ _id: id });
    res.status(200).send(data);
});

ProfileRoutes.patch('/edit/username', auth, async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedObj = await jwt.verify(token, "UserSchema");
        const { id } = decodedObj;
        const userFound = await User.findById(id);
        if (!userFound) {
            throw new Error({ message: "Invalid User" });
        }
        const { username } = req.body;
        if (username.trim().length > 4) {
            const response = await User.findByIdAndUpdate(
                { _id: id },
                { $set: req.body },
                { new: true }
            );
            res.status(200).json(response);
        }
        else {
            throw new Error({ message: "minimum length is 4" });
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})

ProfileRoutes.patch('/edit/password', auth, async (req, res) => {
    try {
        const { token } = req.cookies;
        const decodedObj = await jwt.verify(token, "UserSchema");
        const { id } = decodedObj;
        const userFound = await User.findById(id);
        if (!userFound) {
            throw new Error({ message: "Invalid User" });
        }
        const { password } = req.body;
        if (!(validator.isStrongPassword(password))) {
            res.status(400).send({ message: "please Enter Strong password" })
        }
        else {
            const response = await User.findByIdAndUpdate(
                { _id: id },
                { $set: req.body },
                { new: true }
            );
            res.status(200).json("modified");
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})
module.exports = ProfileRoutes