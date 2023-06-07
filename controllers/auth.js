const User = require("../models/userModal")
const ErrorResponse = require("../utils/errorResponse")

// @desc    Register user
// @route   GET /api/auth/register
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

    res.status(201).json({ success: true })
  } catch (error) {
    next(error)
  }


}