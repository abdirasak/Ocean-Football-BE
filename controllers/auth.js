const User = require("../models/userModal")
const ErrorResponse = require("../utils/errorResponse")

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body

    //create a user
    const user = await User.create({
      name,
      email,
      password,
      role
    })
    //create a token
    const token = user.getUserToken()
    res.status(201).json({ success: true, token })
  } catch (error) {
    next(error)
  }
}

// @desc    User login
// @route   POST /api/auth/login
// @access  Public

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body

    //Validate email and password
    if (!email && !password) {
      return next(new ErrorResponse('please add an email and password', 400))
    }

    //check user
    const user = await User.findOne({ email }).select('+password')
    if (!user) {
      return next(new ErrorResponse('Invalid credentails', 400))
    }

    //check if password matches
    const isMatch = await user.matchPassword(password)
    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentails', 400))
    }

    //create a token
    const token = user.getUserToken()
    res.status(201).json({ success: true, token })
  } catch (error) {
    next(error)
  }
}