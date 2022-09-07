const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')

const api = supertest(app)

let token = null
beforeEach(async () => {
  await User.deleteMany({})

  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', name: 'Superuser', passwordHash })

  await user.save()

  await Blog.deleteMany({})

  for (let blog of helper.initialBlogs) {
    blog['user'] = user.id
    let blogObject = new Blog(blog)
    await blogObject.save()
  }

  const result = await api
    .post('/api/login')
    .send({ username: 'root', password: 'sekret' })
  token = result.body.token
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
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
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
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

  test('adding blog without token returns 401 Unauthorized', async () => {
    const newBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)
  })
})

describe('deletion of a blog', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('Authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    expect(blogsAtEnd.map(blog => blog.title)).not.toContain(blogToDelete.title)
  })
  test('fails with status code 400 if id is invalid', async () => {
    await api
      .delete('/api/blogs/123')
      .set('Authorization', `bearer ${token}`)
      .expect(400)
  })

  test('fails with status code 401 if token is missing', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)
  })
})

describe('updating a blog', () => {
  test('succeeds with status code 200 if id is valid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: blogToUpdate.likes + 1
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    expect(blogsAtEnd.filter(blog => blog.id === blogToUpdate.id)[0].likes).toBe(updatedBlog.likes)
  })
  test('fails with status code 400 if id is invalid', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]

    const updatedBlog = {
      title: 'async/await simplifies making async calls',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: blogToUpdate.likes + 1
    }

    await api
      .put('/api/blogs/123')
      .send(updatedBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})