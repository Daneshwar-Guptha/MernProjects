const express = require('express');
const ConnectionRoutes = express.Router();
const User = require('../model/UserSchema');
const Connection = require('../model/ConnectionSchema');
const jwt = require('jsonwebtoken');

ConnectionRoutes.post('/send/:status/:fromUserId', async (req, res) => {
   try{
     const { status, fromUserId } = req.params;

    const { token } = req.cookies;
    const decodedObj = await jwt.verify(token, "UserSchema");
    const { id } = decodedObj;
    const userFound = await User.findById(id);
    const {_id} = userFound;
    
    console.log(_id);
    res.send("hi");
   
   }catch(error){
    res.status(500).send(error.message);
   }




})
module.exports = ConnectionRoutes