const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({

  name: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  department: {
    type: String,
    required: true
  },

  skills: {
    type: [String],
    required: true
  },

  experience: {
    type: Number,
    required: true
  },

  performanceScore: {
    type: Number,
    default: 0
  }

})

module.exports =
  mongoose.model('Employee', employeeSchema)