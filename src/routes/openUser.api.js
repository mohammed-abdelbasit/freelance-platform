const express = require('express')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../models/User')

router.post('/signup', async (req, res) => {
  try {
    const { 
      username,
      userType,
      password,
      email,
      bio,
      avatar
    } = req.body

    if (!(email && password && username)) {
      res.status(400).send("All input is required")
    }

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email })

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login")
    }

    //Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10)

    // Create user in our database
    const user = await User.create({
      username,
      userType,
      email,
      bio,
      avatar,
      password: encryptedPassword,
    })

    // Create token
    const token = jwt.sign({ user }, "SECRET")
    // save user token

    // return new user with the token
    res.status(201).json({ user, token })
  } catch (error) {
    console.log(error)
    res.status(500).send('server error: faild to sign up')
  }
})

router.post('/login', async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password } = req.body

    // Validate user input
    if (!(email && password)) {
      res.status(400).send('All inputs are required')
    }

    // Validate if user exist in our database
    const user = await User.findOne({ email })

    if (!user || user.length <= 0) {
      res.status(400).send('Invalid Credentials')
    }

    const passwordCorrect = await bcrypt.compare(password, user.password)
    if (!passwordCorrect) {
      res.status(400).send('password is wrong')
    }

    // Create token
    const token = jwt.sign({ user }, 'SECRET')

    res.status(200).json({ user, token })
  } catch (err) {
    console.log(err)
  }
  // Our register logic ends here
})

module.exports = router
