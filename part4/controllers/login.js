const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const { JWT_SECRET } = require('../utils/config')
const loginRouter = require('express').Router()

loginRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.username || !body.password)
    return response.status(400).json({ error: 'username or password missing' })

  const user = await User.findOne({ username: body.username })
  const passwordCorrect = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)

  if (!(user && passwordCorrect)) {
    return response.status(401).json({ error: 'invalid username or password' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, JWT_SECRET)
  response.status(200).send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter