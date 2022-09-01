import Blog from './Blog'
import LoginForm from './LoginForm'
import Notification from './Notification'
import BlogForm from './BlogForm'

const BlogDisplay = ( {blogs} ) => (
  <>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </>
)

const LoggedInDisplay = ({ notification, user, handleBlogCreate, blogInput, setBlogInput, logOutButton, blogs}) => (
  <>
  <h2>blogs</h2>
  <Notification message={notification} />
  <p>{user.name} logged in {logOutButton()}</p>
  <BlogForm handleBlogCreate={handleBlogCreate} blogInput={blogInput} setBlogInput={setBlogInput} />
  <BlogDisplay blogs={blogs} />
  </>
)

const LoggedOutDisplay = ({ notification, handleLogin, username, password, setUsername, setPassword }) => (
  <>
  <h2>log in to application</h2>
  <Notification message={notification} />
  <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword}/>
  </>
)

const Display = { BlogDisplay, LoggedInDisplay, LoggedOutDisplay }

export default Display