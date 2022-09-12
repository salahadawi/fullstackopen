const jwt = require('jsonwebtoken')
const config = require('../utils/config')

const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.JWT_SECRET)
  if (!request.token || !decodedToken.id)
    return response.status(401).json({ error: 'token missing or invalid' })

  const user = await User.findById(decodedToken.id)
  // fails if user token valid but user not found in db
  request.body.user = user._id
  const blog = new Blog(request.body)

  const createdBlog = await blog.save()
  user.blogs = user.blogs.concat(createdBlog._id)
  await user.save()

  response.status(201).json(createdBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, config.JWT_SECRET)
  if (!request.token || !decodedToken.id)
    return response.status(401).json({ error: 'token missing or invalid' })

  const blog = await Blog.findById(request.params.id)
  if (blog && blog.user && blog.user.toString() !== decodedToken.id)
    return response
      .status(401)
      .json({ error: 'only the creator of a blog can delete it' })

  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {
    new: true,
  }).populate('user')
  response.json(updatedBlog)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  response.json(blog.comments)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog) return response.status(404).end()
  if (!request.body.comment) return response.status(400).end()
  blog.comments = blog.comments.concat(request.body.comment)
  await blog.save()
  response.status(201).json(blog.comments)
})

module.exports = blogsRouter
