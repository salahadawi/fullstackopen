import { useState, useEffect, useRef } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Display from './components/Display'
import { setNotificationWithTimeout } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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

  return (
    <div>
      {user ? (
        <Display.LoggedInDisplay
          user={user}
          logOutButton={logOutButton}
          blogFormRef={blogFormRef}
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
