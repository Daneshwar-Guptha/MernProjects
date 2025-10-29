const express = require('express');
const ConnectionRoutes = express.Router();
const User = require('../model/UserSchema');
const Connection = require('../model/ConnectionSchema');
const auth = require('../middleware/auth');

ConnectionRoutes.post('/send/:status/:fromUserId', auth, async (req, res) => {
   try {
      const { status, fromUserId } = req.params;
      const statusType = ["interested", "ignore"];
      const userFound = req.user;
      const validUser = await User.findOne({ _id: fromUserId })

      const preConnection = await Connection.findOne(
         {
            $or: [
               { fromUserId: userFound._id, toUserId: fromUserId },
               { fromUserId: fromUserId, toUserId: userFound._id }
            ]
         })
      if (!statusType.includes(status)) {
         throw new Error("invalid statustype")
      }
      else if (userFound._id.toString() === fromUserId.toString()) {
         throw new Error("cannot send request yourself");
      }
      else if (!validUser) {
         throw new Error("Invalid FromUser");
      }
      else if (preConnection) {
         throw new Error("Coonection was Already Exists");

      }
      else {
         const connection = await Connection.create({
            toUserId: userFound._id,
            fromUserId: fromUserId,
            status: status
         })
         res.send(userFound.username + "connected to " + validUser.username);
      }
   }
   catch (error) {
      res.status(400).send(error.message)

   }
})

ConnectionRoutes.post('/review/:status/:requestId', auth, async (req, res) => {
   try {
      const { status, requestId } = req.params;
      const connectionData = await Connection.findOne({ _id: requestId });
      const statusType = ["accept", "rejected"];
      if (!statusType.includes(status)) {
         throw new Error("Invalid status Type")
      }
      else if (!connectionData) {
         throw new Error("Invalid requestId");
      }
      else {
        await Connection.findOneAndUpdate(
            { _id: requestId },
            {$set:{status:status}},
            {new:true}
         )
         res.status(200).send("connection was "+ status);
      }
   } catch (error) {
      res.status(400).send(error.message);
   }

})

module.exports = ConnectionRoutes