const express = require('express')
const Signuproutes = express.Router();
const User = require('../model/UserSchema')
const cookie = require("cookie");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const validator = require('validator');
Signuproutes.use(express.json());



Signuproutes.post('/signup',async (req, res) => {
   
    try {
        const { username, email, password } = req.body;
        const userData = await User.findOne({ email });
        

        if (!username || username.length < 4) {
            res.status(400).send({ message: "plase Enter UserName minium 5 characters" });
            
        }

        else if (userData) {
            res.status(400).send({ message: "User already exists with this email" });
            
        }
        else if (!(validator.isStrongPassword(password))) {
            res.status(400).send({ message: "please Enter Strong password" })
            
        }


        else {
            const bcryptPassword = await bcrypt.hash(password, 10)
            const newUser = new User({ username, email, password: bcryptPassword });
            await newUser.save();
            res.status(201).send(newUser)
            console.log("true");
        }

    } catch (error) {
        res.send(error.message);
        console.log(error.message);

    }
})
module.exports = Signuproutes