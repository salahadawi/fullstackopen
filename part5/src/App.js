import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [blogInput, setBlogInput] = useState({ title: '', author: '', url: '' })

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const logOutButton = () => (
    <button onClick={handleLogout}>logout</button>
  )

  const handleBlogCreate = (event) => {
    event.preventDefault()

    const blogObject = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setBlogInput({ title: '', author: '', url: '' })
      })
  }

  const loginForm = () => (
    <>
      <form onSubmit={handleLogin}>
        <div>
          username <input type="text" value={username} name="Username" onChange={({ target }) => setUsername(target.value)} />
        </div>
        <div>
          password <input type="password" value={password} name="Password" onChange={({ target }) => setPassword(target.value)} />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  )

  const blogForm = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreate}>
        <div>
          title: <input type="text" value={blogInput.title} name="title" onChange={({ target }) => setBlogInput({ ...blogInput, title: target.value })} />
        </div>
        <div>
          author: <input type="text" value={blogInput.author} name="author" onChange={({ target }) => setBlogInput({ ...blogInput, author: target.value })} />
        </div>
        <div>
          url: <input type="text" value={blogInput.url} name="url" onChange={({ target }) => setBlogInput({ ...blogInput, url: target.value })} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )

  const blogDisplay = () => (
    <>
      <p>{user.name} logged in {logOutButton()}</p>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </>
  )

  const LoggedInDisplay = () => (
    <>
    <h2>blogs</h2>
    {blogForm()}
    {blogDisplay()}
    </>
  )

  const LoggedOutDisplay = () => (
    <>
    <h2>log in to application</h2>
    {loginForm()}
    </>
  )

  return (
    <div>
      {user ?
        LoggedInDisplay() :
        LoggedOutDisplay()
      }
    </div>
  )
}

export default App
