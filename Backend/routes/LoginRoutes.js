const express = require('express')
const LoginRoutes = express.Router();
const User = require('../model/UserSchema')
// const cors = require('cors');
const cookie = require("cookie");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');

LoginRoutes.use(express.json());

LoginRoutes.post('/login', async (req, res) => {

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

                const token = jwt.sign(
                    {
                        id: Data._id,
                       
                    },
                    'UserSchema',  
                 
                );

                res.cookie("token", token, {
                    httpOnly: false,  
                    sameSite: "Lax",
                });

                res.send(token);
            }

        }

    }
    catch (error) {
        res.status(400).send(error.message);


    }
})

LoginRoutes.patch('/login/forgotPassword', async (req, res) => {
    try {
        const { email, password } = req.body;
        const chechEmail = await User.findOne({ email });
        const bycrptPassword = await bcrypt.hash(password, 10);
        if (!chechEmail) {
            throw new Error("Invalid Email");
        }
        else {
            const replaceData = await User.findOneAndUpdate({ email }, { $set: { password: bycrptPassword } }, { new: true, validator: true });
            if (!(validator.isStrongPassword(password))) {
                throw new Error("please Enter Strong Password");

            }
            res.status(201).send("sucess");

        }

    }
    catch (error) {
        res.status(400).send(error.message);
    }

})
module.exports = LoginRoutes;