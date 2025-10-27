const express = require('express');
const ProfileRoutes = express.Router();
const auth = require('../middleware/auth');
const User = require('../model/UserSchema');
const jwt = require('jsonwebtoken')

ProfileRoutes.get('/view/:id', auth, async (req, res) => {
    const { id } = req.params;
    const data = await User.findOne({ _id: id });
    console.log(data);
    res.status(200).send(data);

});
ProfileRoutes.patch('/edit', auth, async (req, res) => {
    const { token } = req.cookies;
    const decodedObj = await jwt.verify(token, "UserSchema");

    const { id } = decodedObj;

    const userFound = await User.findById(id);

    const response = await User.findOneAndReplace(
        { _id: id },
       {$set: req.body},
        { new: true }
    );
    res.status(200).json(response);

})

// ProfileRoutes.post()
module.exports = ProfileRoutes