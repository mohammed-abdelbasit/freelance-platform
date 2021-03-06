const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new Schema({
  title: String,
  price: String,
  details: String,
  duration: String,
  state: String,
  delieverables: [
    { title: String, freelancerCheck: Boolean, clientCheck: Boolean },
  ],
  skills: [{ type: Schema.Types.ObjectId, ref: "Skill" }],
  category: String,
  interested: [{ type: Schema.Types.ObjectId, ref: "User" }],
  assigned: [{ type: Schema.Types.ObjectId, ref: "User" }],
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  delieverablesPrice: Number,
  changeRequests: [
    {
      title: String,
      description: String,
      price: Number,
      accepted: Boolean,
      freelancerCheck: Boolean,
      clientCheck: Boolean,
    },
  ],
});

const Job = mongoose.model("Job", jobSchema);

module.exports = Job;
