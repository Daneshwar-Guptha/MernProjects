const express = require('express');
const app = express();
const DBConnection = require('./config/DBConnection');
const User = require('./model/UserSchema')
const cors = require('cors');

app.use(cors());

app.post('/signup',(req,res)=>{
    console.log(res.body);
    res.send(req.body);
})



DBConnection()
.then(()=>{
    app.listen(2000,()=>{
        console.log("server was started");
    })
})
.catch((error)=>{
    console.log(error)
})