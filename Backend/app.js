const express = require('express');
const app = express();
const DBConnection = require('./config/DBConnection');
const User = require('./model/UserSchema')
const cors = require('cors');
const cookie = require("cookie");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
            const bcryptPassword = await bcrypt.hash(password, 10)
            const newUser = new User({ username, email, password: bcryptPassword });
            await newUser.save();
            res.status(201).send(newUser)
        }

    } catch (error) {
        res.send(error.message);



    }
})

app.post('/login', async (req, res) => {
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
                console.log(checkPassword);
                const token = jwt.sign({ Data }, 'UserSchema');
                res.cookie("token", token)
                res.send(Data);
            }

        }

    }
    catch (error) {
        res.status(400).send(error.message)

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