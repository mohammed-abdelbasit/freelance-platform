const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
  name: String,
  price: String,
  details: String,
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  interested: [{ type: Schema.Types.ObjectId, ref: "User" }],
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
  company: { type: Schema.Types.ObjectId, ref: "User" },
});

const Team = mongoose.model("Team", teamSchema);

module.exports = Team;
