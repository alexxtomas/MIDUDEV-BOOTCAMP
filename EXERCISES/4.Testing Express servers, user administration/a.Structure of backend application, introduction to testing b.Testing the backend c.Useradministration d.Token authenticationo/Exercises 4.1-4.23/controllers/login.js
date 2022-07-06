const loginRouter = require('express').Router()
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

loginRouter.post('/', async (req, res) => {
  console.log(req.body)
  const { username, password } = req.body

  const user = await User.findOne({ username })

  const passwordCorrect =
    user === null ? false : await bcrypt.compare(password, user.passwordHash)

  if (!(user && passwordCorrect))
    return res.status(401).json({ error: 'Invalid username or password' })

  const userForToken = {
    username: user.username,
    id: user._id
  }

  const token = jwt.sign(userForToken, process.env.SECRET, {
    expiresIn: 60 * 60 * 24 * 7
  })

  res.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter
