const express = require('express')
const LoginRoutes = express.Router();
const User = require('../model/UserSchema')
// const cors = require('cors');
const cookie = require("cookie");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const validator = require('validator');

LoginRoutes.use(express.json());

LoginRoutes.post('/login', async (req, res) => {
    console.log("Login");
    try {
        const { password, username, email } = req.body;
        const Data = await User.findOne({ email });

        if (!Data) {
            res.send("please first register");

        }

        else {
            const checkPassword = await bcrypt.compare(password, Data.password);
            if (!checkPassword) {
                res.status(401).send("Invalid password");
            }
            else {

                const token = jwt.sign({ Data }, 'UserSchema');
                res.cookie("token", token, {
                    httpOnly: true
                })
                res.send({
                    Data
                })
            }

        }

    }
    catch (error) {
        res.status(400).send(error.message);


    }
})
module.exports = LoginRoutes;