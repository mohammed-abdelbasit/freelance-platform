const mongoose = require('mongoose')

const Schema = mongoose.Schema

const portfolioSchema = new Schema({
    screenshots:[String],
    details:String
})

module.exports = mongoose.model('Portfolio', portfolioSchema)
