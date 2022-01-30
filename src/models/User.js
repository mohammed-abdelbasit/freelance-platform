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

///////////////////////////////////////////////////////////

const jobsSchema = new Schema({
    jobName:String,
    jobPrice:String,
    jobDetails:String,
    jobDuration:String,
    jobDelieverables:String,
    jobInterested:[{id:''}]

})
const User = mongoose.model('User',jobsSchema);

///////////////////////////////////////////////////////////

const portfolioSchema = new Schema({
    portScreenshots:String,
    portDetails:String
})
const User = mongoose.model('User',portfolioSchema);

///////////////////////////////////////////////////////////

const categoriesSchema= new Schema({
    catName:String,
    catDate:String

})
const User = mongoose.model('User',categoriesSchema);

///////////////////////////////////////////////////////////

const reportsSchema = new Schema({
    repDetails:String,
    repDate:String
})
const User = mongoose.model('User',reportsSchema);

///////////////////////////////////////////////////////////

const skillsSchema = new Schema({
    skills:String
})
const User = mongoose.model('User',skillsSchema);

///////////////////////////////////////////////////////////

const rankSchema = new Schema({
    rank:String
})
const User = mongoose.model('User',rankSchema);


module.exports = User;