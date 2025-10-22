const express = require('express');
const app = express();
const DBConnection = require('./config/DBConnection');
const User = require('./model/UserSchema')
const cors = require('cors');
const cookie = require("cookie");

app.use(cors());
app.use(express.json())

app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const userData = await User.findOne({ email });
        if (userData) {
           return res.status(400).json({ message: "User already exists with this email" });
        }

        else {
            const newUser = new User({username,email,password });
            await newUser.save();
            res.status(201).send(newUser)
        }

    } catch (error) {
        res.send(error.message);



    }
})




DBConnection()
    .then(() => {
        app.listen(2000, () => {
            console.log("server was started");
        })
    })
    .catch((error) => {
        console.log(error)
    })