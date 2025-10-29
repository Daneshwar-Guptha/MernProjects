const express = require('express');
const app = express();
const DBConnection = require('./config/DBConnection');
const User = require('./model/UserSchema')
const Connection = require('./model/ConnectionSchema')
const cors = require('cors');
const cookieParser = require("cookie-parser");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const LoginRoutes = require('../Backend/routes/LoginRoutes');
const Signuproutes = require('../Backend/routes/SignupRoutes');
const LogoutRoutes = require('../Backend/routes/LogoutRoutes');
const ProfileRoutes = require('../Backend/routes/ProfileRoutes');
const ConnectionRoutes = require('./routes/ConnectionRoutes');
const UserRoutes = require('./routes/UserRoutes');

app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true,           
}));

app.use(express.json());
app.use(cookieParser())

app.use('/',Signuproutes)
app.use('/',LoginRoutes);
app.use('/',LogoutRoutes);
app.use('/profile',ProfileRoutes);
app.use('/request',ConnectionRoutes);
app.use('/user',UserRoutes)

DBConnection()
    .then(() => {
        app.listen(2000, () => {
            console.log("server was started");
        })
    })
    .catch((error) => {
        console.log(error)
    })