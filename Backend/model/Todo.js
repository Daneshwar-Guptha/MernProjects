const { Schema, model } = require('mongoose');

const TodoSchema = new Schema({

    title:{
        type:String
    },
    id:{
        type:Number
    },
    status:{
        type:Boolean
    }
})