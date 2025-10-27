const express = require('express');
const app = express();
const DBConnection = require('./config/DBConnection');
const User = require('./model/UserSchema')
const cors = require('cors');
const cookie = require("cookie");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const LoginRoutes = require('../Backend/routes/LoginRoutes');
const Signuproutes = require('../Backend/routes/SignupRoutes');
const LogoutRoutes = require('../Backend/routes/LogoutRoutes')

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,           
}));

app.use(express.json());



app.use('/',Signuproutes)
app.use('/',LoginRoutes);
app.use('/',LogoutRoutes);


DBConnection()
    .then(() => {
        app.listen(2000, () => {
            console.log("server was started");
        })
    })
    .catch((error) => {
        console.log(error)
    })