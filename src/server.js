const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const auth = require("./middlewares/auth");
const OpenUserRoutes = require("./routes/openUser.api");
const UserRoutes = require("./routes/user.api");
const JobsRoutes = require("./routes/job.api");
mongoose
  .connect("mongodb://127.0.0.1:27017/test", { useNewUrlParser: true })
  .then(() => console.log("connect to mongo"))
  .catch((error) => console.log("faild to connect to database: ", error));

const app = express();

app.use(cors());

app.use(express.json());

app.listen(4000, () => console.log("server is running on port 4000"));
app.use(express.static(__dirname + "/front"));

app.use("/user", OpenUserRoutes);

app.use("/auth/job", auth, JobsRoutes);

app.use("/auth/user", auth, UserRoutes);
