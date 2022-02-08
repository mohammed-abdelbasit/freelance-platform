const mongoose = require("mongoose");
const User = require("./User");

const Schema = mongoose.Schema;

const reportSchema = new Schema({
  repDetails: String,
  repDate: String,
  reported: { type: Schema.Types.ObjectId, ref: "User" },
  reporter: { type: Schema.Types.ObjectId, ref: "User" },
});

const Report = mongoose.model("Report", reportSchema);

module.exports = Report;

///////////////////////////////////////////////////////////
