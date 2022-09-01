import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Display from './components/Display'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)
  const blogFormRef = useRef()

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
      setNotification({ text: 'Wrong username or password', style: 'error' })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
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
        setNotification({ text: `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`, style: 'success' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    blogFormRef.current.toggleVisibility()
  }

  const handleLike = id => {
    const blogToLike = blogs.find(blog => blog.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    }

    blogService
      .update(id, likedBlog)
      .then(returnedBlog => {
        console.log(returnedBlog)
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      }).catch(error => {
        setNotification({ text: `error: ${error.response.data.error}`, style: 'error' })
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
  }

  const handleRemove = id => {
    const blogToRemove = blogs.find(blog => blog.id === id)

    if (window.confirm(`remove blog ${blogToRemove.title} by ${blogToRemove.author}`)) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id))
          setNotification({ text: `blog ${blogToRemove.title} by ${blogToRemove.author} removed`, style: 'success' })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }).catch(error => {
          setNotification({ text: `error: ${error.response.data.error}`, style: 'error' })
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        }
        )
    }
  }

  return (
    <div>
      {user ?
        <Display.LoggedInDisplay notification={notification} user={user}
          handleBlogCreate={handleBlogCreate} logOutButton={logOutButton}
          blogs={blogs} blogFormRef={blogFormRef} handleLike={handleLike} handleRemove={handleRemove} /> :
        <Display.LoggedOutDisplay notification={notification} handleLogin={handleLogin}
          username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
      }
    </div>
  )
}

export default App
