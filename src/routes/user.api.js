const express = require('express')
// const jwt = require('jsonwebtoken')
const router = express.Router()

const User = require('../models/User')
const Portfolio = require('../models/Portfolio')

router.post('/addPortfolio', async (req, res) => {
  try {
    const { user } = req.user

    if (user.role !== 0) {
      res.status(500).send('only freelancer has a portfolio')
    }

    const { screenshots, details } = req.body

    const portfolio = new Portfolio.create({
      screenshots,
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
