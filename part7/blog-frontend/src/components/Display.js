import Blog from './Blog'
import LoginForm from './LoginForm'
import Notification from './Notification'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'
import { useSelector, useDispatch } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const BlogDisplay = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) => state.blogs)

  const handleLike = (id) => {
    dispatch(likeBlog(id)).catch((error) => {
      dispatch(
        setNotificationWithTimeout(`error: ${error.response.data.error}`)
      )
    })
  }

  const handleRemove = async (id) => {
    const blogToRemove = blogs.find((blog) => blog.id === id)
    if (
      window.confirm(
        `remove blog ${blogToRemove.title} by ${blogToRemove.author}`
      )
    ) {
      dispatch(removeBlog(id))
        .then(() => {
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

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div id="blogdisplay">
      {sortedBlogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={() => handleLike(blog.id)}
          handleRemove={() => handleRemove(blog.id)}
        />
      ))}
    </div>
  )
}

const LoggedInDisplay = ({ user, logOutButton, blogFormRef }) => (
  <>
    <h2>blogs</h2>
    <Notification />
    <p>
      {user.name} logged in {logOutButton()}
    </p>
    <Toggleable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm />
    </Toggleable>
    <BlogDisplay />
  </>
)

const LoggedOutDisplay = ({
  handleLogin,
  username,
  password,
  setUsername,
  setPassword,
}) => (
  <>
    <h2>log in to application</h2>
    <Notification />
    <LoginForm
      handleLogin={handleLogin}
      username={username}
      password={password}
      setUsername={setUsername}
      setPassword={setPassword}
    />
  </>
)

const Display = { BlogDisplay, LoggedInDisplay, LoggedOutDisplay }

export default Display
