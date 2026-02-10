const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

// REGISTER
exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body

    const exists = await User.findOne({ email })
    if (exists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const hash = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hash
    })

    res.json({
      message: "User registered successfully",
      userId: user._id
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}


// LOGIN
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid email" })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      return res.status(400).json({ message: "Invalid password" })
    }

    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "1d" }
    )

    res.json({
      message: "Login successful",
      token
    })

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
