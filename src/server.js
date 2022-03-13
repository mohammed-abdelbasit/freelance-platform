const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const auth = require("./middlewares/auth");
const OpenUserRoutes = require("./routes/openUser.api");
const UserRoutes = require("./routes/user.api");
const JobsRoutes = require("./routes/job.api");
const CategoriesRoutes = require("./routes/categories.api");

(async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/test", {
      useNewUrlParser: true,
    });
    console.log("connect to mongo");
  } catch (error) {
    console.error("faild to connect to database: ", error);
    process.exit(1);
  }
})();

const app = express();

app.use(cors());

app.use(express.json());

app.use(express.static(__dirname + "/front"));

app.use("/user", OpenUserRoutes);

app.use("/auth/job", auth, JobsRoutes);

app.use("/auth/user", auth, UserRoutes);

app.use("/auth/category", auth, CategoriesRoutes);

(async () => {
  try {
    await app.listen(4000);
    console.log("server is running on port 4000");
  } catch (error) {
    console.error("faild to start the server: ", error);
    process.exit(1);
  }
})();
