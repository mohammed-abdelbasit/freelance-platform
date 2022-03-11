const mongoose = require("mongoose");
const Job = require("./Job");
const Portfolio = require("./Portfolio");
const Skill = require("./Skill");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  avatar: String,
  username: {
    unique: true,
    type: String,
  },
  password: String,
  email: String,
  role: Number,
  bio: String,
  done: [{ type: Schema.Types.ObjectId, ref: "Job" }],
  ratings: [Number],
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  portfolio: { type: Schema.Types.ObjectId, ref: "Portfolio" },
  suspended: Boolean,
  wallet: Number,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
