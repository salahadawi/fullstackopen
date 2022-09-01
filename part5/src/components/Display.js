import Blog from './Blog'
import LoginForm from './LoginForm'
import Notification from './Notification'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'

const BlogDisplay = ( {blogs} ) => (
  <>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </>
)

const LoggedInDisplay = ({ notification, user, handleBlogCreate, blogInput, setBlogInput, logOutButton, blogs, blogFormRef }) => (
  <>
  <h2>blogs</h2>
  <Notification message={notification} />
  <p>{user.name} logged in {logOutButton()}</p>
  <Toggleable buttonLabel="new blog" ref={blogFormRef}>
    <BlogForm handleBlogCreate={handleBlogCreate} blogInput={blogInput} setBlogInput={setBlogInput} />
  </Toggleable>
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