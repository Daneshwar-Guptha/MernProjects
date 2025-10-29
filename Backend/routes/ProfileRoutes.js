const express = require('express');
const ProfileRoutes = express.Router();
const auth = require('../middleware/auth');
const User = require('../model/UserSchema');
const validator = require('validator');

ProfileRoutes.get('/view', auth, async (req, res) => {
    try {
        const userFound = req.user;
        res.status(200).send(userFound);

    } catch (error) {
        res.status(400).send(error.message);
    }
});

ProfileRoutes.patch('/edit/username', auth, async (req, res) => {
    try {


        const userFound = req.user;
        const userFound1 = await User.findById(userFound._id);
        if (!userFound1) {
            throw new Error({ message: "Invalid User" });
        }
        const { username } = req.body;
        if (username.trim().length > 4) {
            const response = await User.findByIdAndUpdate(
                {_id:userFound._id}, 
                { $set: req.body },
                { new: true }
            ).select("-password");
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
       const userFound = req.user;
        const userFound1 = await User.findById(userFound._id);
        if (!userFound1) {
            throw new Error({ message: "Invalid User" });
        }
        const { password } = req.body;
        if (!(validator.isStrongPassword(password))) {
            res.status(400).send({ message: "please Enter Strong password" })
        }
        else {
            const response = await User.findByIdAndUpdate(
                { _id:userFound._id },
                { $set: req.body },
                { new: true }
            ).select("-password");
            res.status(200).json("modified");
        }
    }
    catch (error) {
        res.status(500).send(error.message);
    }
})
module.exports = ProfileRoutes