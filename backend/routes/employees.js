const express = require('express')

const Employee = require('../models/Employee')

const auth = require('../middleware/auth')

const router = express.Router()

router.post('/', auth, async (req, res) => {

  try {

    const employee = new Employee(req.body)

    await employee.save()

    res.json(employee)

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }

})

router.get('/', auth, async (req, res) => {

  try {

    const employees = await Employee.find()

    res.json(employees)

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }

})

router.get('/search', auth, async (req, res) => {

  try {

    const department = req.query.department

    const employees = await Employee.find({
      department
    })

    res.json(employees)

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }

})

router.delete('/:id', auth, async (req, res) => {

  try {

    await Employee.findByIdAndDelete(req.params.id)

    res.json({
      msg: 'Deleted'
    })

  } catch (err) {

    res.status(500).json({
      error: err.message
    })

  }

})

module.exports = router