const brcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', {
    title: 1,
    author: 1,
    url: 1,
    likes: 1,
    id: 1,
    comments: 1,
  })
  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 3) {
    return response
      .status(400)
      .json({ error: 'password must be at least 3 characters long' })
  }

  if (await User.findOne({ username: body.username }))
    return response.status(400).json({ error: 'username must be unique' })

  const saltRounds = 10
  const passwordHash = await brcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.json(savedUser)
})

module.exports = usersRouter
