const mongoose = require("mongoose");
const Category = require("./Category");
const Skill = require("./Skill");

const Schema = mongoose.Schema;

const User = require("./User");

const jobSchema = new Schema({
  name: String,
  price: String,
  details: String,
  duration: String,
  delieverables: String,
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  category: { type: Schema.Types.ObjectId, ref: "Category" },
  interested: [{ type: Schema.Types.ObjectId, ref: "User" }],
  assigned: [{ type: Schema.Types.ObjectId, ref: "User" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
