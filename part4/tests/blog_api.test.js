const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('when there is initially some blogs saved', () => {
  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('the unique identifier property of a blog post is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})

describe('addition of a new blog', () => {
  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogsAtEnd.map(blog => blog.title)).toContain(newBlog.title)
  })

  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/'
    }
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.likes).toBe(0)
  })

  test('if the title and url property is missing from the request, it will return 400 Bad Request', async () => {
    const newBlog = {
      author: 'Michael Chan',
      likes: 7
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    expect(blogsAtEnd.map(blog => blog.title)).not.toContain(blogToDelete.title)
  })
  test('fails with status code 400 if id is invalid', async () => {
    await api
      .delete('/api/blogs/123')
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})