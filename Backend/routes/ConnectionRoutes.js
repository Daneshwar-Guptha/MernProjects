const express = require('express');
const ConnectionRoutes = express.Router();
const User = require('../model/UserSchema');
const Connection = require('../model/ConnectionSchema');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

ConnectionRoutes.post('/send/:status/:fromUserId', auth, async (req, res) => {
   try {
      const { status, fromUserId } = req.params;
      const userFound = req.user;
      if (userFound._id.toString() === fromUserId.toString()) {
         throw new Error("cannot send request yourself");
      }
      else {
         const connection = await Connection.create({
            toUserId: userFound._id,
            fromUserId: fromUserId,
            status: status
         })
         res.send(connection);
      }
   }
   catch (error) {
      res.status(400).send(error.message)
      console.log(error.message);
   }
})
module.exports = ConnectionRoutes