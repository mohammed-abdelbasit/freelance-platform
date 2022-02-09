const User = require("../models/User");
const Portfolio = require("../models/Portfolio");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const router = express.Router();

router.post("/addPortfolio", async (req, res) => {
  try {
    const { user } = req.user;
    if (user.role === 0) {
      const { screenshots, details } = req.body;
      const portfolio = new Portfolio({
        screenshots,
        details,
      });
      await portfolio.save();
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { portfolio } },
        { new: true }
      ).populate("portfolio");
      const token = jwt.sign({ user: updatedUser }, "SECRET");

      res.status(200).json({ updatedUser, token });
    } else {
      res.status(500).send("only freelancer has a portfolio");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error addPortfolio");
  }
});
////////////////////////////////////////////////////////////////
router.post("/deletePortfolio", async (req, res) => {
  try {
    const { user } = req.user;
    if (user.role === 0) {
      const updatedUser = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: { portfolio: null } },
        { new: true }
      );
      const token = jwt.sign({ user: updatedUser }, "SECRET");

      res.status(200).json({ updatedUser, token });
    } else {
      res.status(500).send("only freelancer has a portfolio");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("server error deletePortfolio");
  }
});
module.exports = router;
