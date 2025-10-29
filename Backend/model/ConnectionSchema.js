const express = require('express');
const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const User = require('./UserSchema');
const ConnectionRoutes = new Schema({
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    status:{
        type:String,
        enum:["accept","rejected","interested","ignore"]
    }
},{timestamps:true})
const Connection = new model("Connection", ConnectionRoutes);
module.exports = Connection