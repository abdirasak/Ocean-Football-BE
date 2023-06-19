const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({

  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    require: true
  },

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

  articleImage: {
    type: String,
    required: [true, 'Please add an image']
  }

})

module.exports = mongoose.model('Article', articleSchema)