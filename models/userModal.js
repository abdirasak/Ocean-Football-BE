const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please insert your name']
  },

  email: {
    type: String,
    required: [true, 'Please insert your email'],
    unique: true
  },

  password: {
    type: String,
    required: [true, 'Please add title']
  },

  role: {
    type: String,
    default: 'basic',
    enum: ["basic", "admin"]
  },


},
  {
    timestamps: true
  }
)

module.exports = mongoose.model('User', userSchema)