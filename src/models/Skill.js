const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const skillSchema = new Schema({
  name: String,
});

const Skill = mongoose.model("Skill", skillSchema);

module.exports = Skill;
