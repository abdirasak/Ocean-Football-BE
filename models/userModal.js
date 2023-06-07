const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please insert your name']
  },

  email: {
    type: String,
    required: [true, 'Please insert your email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
    lowercase: true
  },

  password: {
    type: String,
    required: [true, 'Please add title'],
    minlength: 6,
    select: false,
  },

  role: {
    type: String,
    default: 'user',
    enum: ["publisher", "user"]
  },


},
  {
    timestamps: true
  }
)

//Encrypt password with bcrypt
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
  next()
})

//jwt token method
userSchema.methods.getToken = function () {

}

module.exports = mongoose.model('User', userSchema)