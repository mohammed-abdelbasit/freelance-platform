const express = require('express')
const router = express.Router()

/*
  Database models
*/
const Job = require('../models/Job')
const User = require('../models/User')
const Team = require('../models/Team')

/*
  create team route
*/
router.post('/', async (req, res) => {
  try {
    const {
      name,
      price,
      details,
      category,
      interested,
      members,
      company
    } = req.body

    const team = await Team.create({
      name,
      price,
      details,
      category,
      interested,
      members,
      company
    })

    res.status(200).json({ team });
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})

/*
  get specific team route
*/
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params

    const team = await Team.findById(id)

    res.status(200).json({ team });
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})

/*
  get all teams route
*/
router.get('/:id', async (req, res) => {
  try {
    const teams = await Team.find({})

    res.status(200).json({ teams });
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})

/*
  delete team route
*/
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const team = await Team.findOneAndDelete(id)

    res.status(200).json({ team });
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})

/*
  update team route
*/
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const teamInfo = req.body

    const updatedTeam = await Team.findByIdAndUpdate(
      id,
      { $set: teamInfo },
      { lean: true, new: true }
    );

    res.status(200).json({ updatedTeam });
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})

module.exports = router
