import LoginForm from './LoginForm'
import Notification from './Notification'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogDisplay = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div id="blogdisplay">
      {sortedBlogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

const LoggedInDisplay = () => {
  return (
    <>
      <Toggleable buttonLabel="new blog">
        <BlogForm />
      </Toggleable>
      <BlogDisplay />
    </>
  )
}

const LoggedOutDisplay = () => (
  <>
    <h2>log in to application</h2>
    <Notification />
    <LoginForm />
  </>
)

const Display = { BlogDisplay, LoggedInDisplay, LoggedOutDisplay }

export default Display
