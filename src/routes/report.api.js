const express = require('express')
const router = express.Router()

/*
  Database models
*/

const Report = require('../models/Report')

/*
  create report route
*/
router.post('/', async (req, res) => {
  try {
    const {
      repDetails,
      reported,
      reporter
    } = req.body

    const report = await Report.create({
      repDetails,
      repDate: new Date().toISOString(),
      reported,
      reporter
    })

    res.status(200).json({ report });
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})

/*
  get reportes for specific user route
*/
router.get('/:userId', async (req, res) => {
  try {
    const { userId } = req.params

    const reported = await Report.find({
      reported: userId
    })

    res.status(200).json({ reported });
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})

/*
  get all reports route
*/
router.get('/', async (req, res) => {
  try {
    const reports = await Report.find({})

    res.status(200).json({ reports })
  } catch (error) {
    res.status(500).send('Internal server error')
  }
})


module.exports = router
