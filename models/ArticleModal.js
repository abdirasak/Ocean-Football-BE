const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({

  title: {
    type: String,
    required: [true, 'Please add title']
  },

  team: {
    type: String,
    required: [true, 'Please add team name']
  },

  league: {
    type: String,
    required: [true, 'Please add league title']
  },

  article: {
    type: String,
    required: [true, 'Please add article']
  },

})

module.exports = mongoose.model('Article', articleSchema)