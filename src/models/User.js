const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const UserSchema = new Schema({
    avatar:String,
    username:{
        unique:true,
        type:String,
    },
    password:String,
    email:String,
    userType:Number,
    bio:String
})


const User = mongoose.model('User',UserSchema);


module.exports = User;