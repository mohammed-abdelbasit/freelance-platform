const express = require("express");
const router = express.Router();

const Category = require("../models/Category");

router.get("/categories", async (req, res) => {
  try {
    const filters = req.body.filters;

    const categories = await Category.find();
    console.log("categories: ", categories);
    res.status(200).json(categories);
  } catch (error) {
    console.log(error);
    res.status(500).send("faild to fetch categories");
  }
});

module.exports = router;
