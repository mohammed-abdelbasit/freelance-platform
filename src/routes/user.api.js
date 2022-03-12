<<<<<<< HEAD
const express = require("express");
// const jwt = require('jsonwebtoken')
const router = express.Router();
const { join } = require("fs");

const User = require("../models/User");
const Portfolio = require("../models/Portfolio");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(process.cwd(), "/uploads/"));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + ".jpg");
  },
});

const upload = multer({ storage: storage });

////////////////////////////////////////////////////////////////
router.post("/addPortfolio", upload.array(screenshots, 5), async (req, res) => {
  try {
    const { user } = req.user;

    if (user.role !== 0) {
      res.status(500).send("only freelancer has a portfolio");
    }

    const { details } = req.body;

    const portfolio = new Portfolio.create({
      screenshots: req.files,
      details,
    });

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { portfolio } },
      { new: true }
    ).populate("portfolio");
    // const token = jwt.sign({ user: updatedUser }, 'SECRET')

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error addPortfolio");
  }
});

////////////////////////////////////////////////////////////////
router.delete("/portfolio", async (req, res) => {
  try {
    const { user } = req.user;
    if (user.role !== 0) {
      res.status(500).send("only freelancer has a portfolio");
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { portfolio: null } },
      { new: true }
    );
    // const token = jwt.sign({ user: updatedUser }, 'SECRET')

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error deletePortfolio");
  }
});

////////////////////////////////////////////////////////////////
router.put("/portfolio", async (req, res) => {
  try {
    const { user } = req.user;
    if (user.role !== 0) {
      res.status(500).send("only freelancer has a portfolio");
    }

    const portfolioInfo = req.body;

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { portfolio: portfolioInfo } },
      { new: true }
    );
    // const token = jwt.sign({ user: updatedUser }, 'SECRET')

    res.status(200).json({ updatedUser });
  } catch (error) {
    console.error(error);
    res.status(500).send("server error update portfolio");
  }
});
module.exports = router;
=======
const express = require('express')
// const jwt = require('jsonwebtoken')
const multer = require('multer')
const router = express.Router()
const { join } = require('fs')

const User = require('../models/User')
const Portfolio = require('../models/Portfolio')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, join(process.cwd(), '/uploads/'))
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '.jpg')
  }
})
 
const upload = multer({ storage: storage })

router.post('/addPortfolio', upload.array('screenshots', 5), async (req, res) => {
  try {
    const { user } = req.user

    if (user.role !== 0) {
      res.status(500).send('only freelancer has a portfolio')
    }

    const { details } = req.body

    const portfolio = new Portfolio.create({
      screenshots: req.files,
      details
    })

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { portfolio } },
      { new: true }
    ).populate('portfolio')
    // const token = jwt.sign({ user: updatedUser }, 'SECRET')

    res.status(200).json({ updatedUser })
  } catch (error) {
    console.error(error)
    res.status(500).send("server error addPortfolio")
  }
})

////////////////////////////////////////////////////////////////
router.delete('/portfolio', async (req, res) => {
  try {
    const { user } = req.user
    if (user.role !== 0) {
      res.status(500).send('only freelancer has a portfolio')
    }

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { portfolio: null } },
      { new: true }
    )
    // const token = jwt.sign({ user: updatedUser }, 'SECRET')

    res.status(200).json({ updatedUser })
  } catch (error) {
    console.error(error)
    res.status(500).send('server error deletePortfolio')
  }
})

router.put('/portfolio', async (req, res) => {
  try {
    const { user } = req.user
    if (user.role !== 0) {
      res.status(500).send('only freelancer has a portfolio')
    }

    const portfolioInfo = req.body

    const updatedUser = await User.findOneAndUpdate(
      { _id: user._id },
      { $set: { portfolio: portfolioInfo } },
      { new: true }
    )
    // const token = jwt.sign({ user: updatedUser }, 'SECRET')

    res.status(200).json({ updatedUser })
  } catch (error) {
    console.error(error)
    res.status(500).send('server error update portfolio')
  }
})
module.exports = router
>>>>>>> 10b34adef945e873e1e52c022a2b6e9f92197c5f
