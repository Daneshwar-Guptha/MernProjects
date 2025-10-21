const mongoose = require('mongoose')
const uri= 'mongodb+srv://dbUser:dbUser@guptacluster.terlemf.mongodb.net/userschema?retryWrites=true&w=majority&appName=GuptaCluster'
const DBConnection = async()=>{
   await mongoose.connect(uri)
   try{
    console.log("db was connected")
   }
   catch(err){
    console.log(err)
   }

}
module.exports = DBConnection