const mongoose = require("mongoose");

const Schema = mongoose.Schema;



const portfolioSchema = new Schema({
    screenshots:[String],
    details:String
})
const Portfolio = mongoose.model('Portfolio',portfolioSchema);


module.exports = Portfolio;
///////////////////////////////////////////////////////////