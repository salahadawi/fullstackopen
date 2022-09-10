import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Display from './components/Display'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
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
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      dispatch(setNotificationWithTimeout('Wrong username or password'))
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const logOutButton = () => <button onClick={handleLogout}>logout</button>

  const handleBlogCreate = (blogObject) => {
    blogService.create(blogObject).then((returnedBlog) => {
      returnedBlog.user = user
      setBlogs(blogs.concat(returnedBlog))
      dispatch(
        setNotificationWithTimeout(
          `a new blog ${returnedBlog.title} by ${returnedBlog.author} added`,
          'success'
        )
      )
    })
    blogFormRef.current.toggleVisibility()
  }

  const handleLike = (id) => {
    const blogToLike = blogs.find((blog) => blog.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    }

    blogService
      .update(id, likedBlog)
      .then((returnedBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnedBlog)))
      })
      .catch((error) => {
        dispatch(
          setNotificationWithTimeout(`error: ${error.response.data.error}`)
        )
      })
  }

  const handleRemove = (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id)

    if (
      window.confirm(
        `remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      blogService
        .remove(id)
        .then(() => {
          setBlogs(blogs.filter((blog) => blog.id !== id))
          dispatch(
            setNotificationWithTimeout(
              `blog ${blogToRemove.title} by ${blogToRemove.author} removed`,
              'success'
            )
          )
        })
        .catch((error) => {
          dispatch(
            setNotificationWithTimeout(`error: ${error.response.data.error}`)
          )
        })
    }
  }

  return (
    <div>
      {user ? (
        <Display.LoggedInDisplay
          user={user}
          handleBlogCreate={handleBlogCreate}
          logOutButton={logOutButton}
          blogs={blogs}
          blogFormRef={blogFormRef}
          handleLike={handleLike}
          handleRemove={handleRemove}
        />
      ) : (
        <Display.LoggedOutDisplay
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      )}
    </div>
  )
}

export default App
