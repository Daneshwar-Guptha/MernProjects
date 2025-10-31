const express = require('express');
const UserRoutes = express.Router();
const User = require('../model/UserSchema');
const Connection = require('../model/ConnectionSchema');
const auth = require('../middleware/auth');

UserRoutes.get('/connections', auth, async (req, res) => {


    try {
        const userFound = req.user;
        const connections = await Connection.find(
            {
                $or: [
                    { toUserId: userFound._id, status: "accept" },
                    { fromUserId: userFound._id, status: "accept" }
                ]
            }
        ).populate("toUserId", "username").populate("fromUserId", "username");

        let connectionNames = [];
        connections.forEach(element => {
            if (element.toUserId._id.equals(userFound._id)) {
                connectionNames.push(element.fromUserId)

            }
            else {
                connectionNames.push(element.toUserId);
            }
        });
        res.status(200).send(connectionNames);
          console.log(connectionNames)
    } catch (error) {
        res.status(400).send(error.message);
    }
})



module.exports = UserRoutes
