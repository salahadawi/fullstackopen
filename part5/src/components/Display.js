import Blog from './Blog'
import LoginForm from './LoginForm'
import Notification from './Notification'
import BlogForm from './BlogForm'
import Toggleable from './Toggleable'

const BlogDisplay = ({ blogs, handleLike, handleRemove }) => (
  <>
    {blogs.sort(function (a, b) {
      return b.likes - a.likes
    }
    ).map(blog =>
      <Blog key={blog.id} blog={blog} handleLike={() => handleLike(blog.id)} handleRemove={() => handleRemove(blog.id)} />
    )}
  </>
)

const LoggedInDisplay = ({ notification, user, handleBlogCreate, logOutButton, blogs, blogFormRef, handleLike, handleRemove }) => (
  <>
    <h2>blogs</h2>
    <Notification message={notification} />
    <p>{user.name} logged in {logOutButton()}</p>
    <Toggleable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm handleBlogCreate={handleBlogCreate} />
    </Toggleable>
    <BlogDisplay blogs={blogs} handleLike={handleLike} handleRemove={handleRemove} />
  </>
)

const LoggedOutDisplay = ({ notification, handleLogin, username, password, setUsername, setPassword }) => (
  <>
    <h2>log in to application</h2>
    <Notification message={notification} />
    <LoginForm handleLogin={handleLogin} username={username} password={password} setUsername={setUsername} setPassword={setPassword} />
  </>
)

const Display = { BlogDisplay, LoggedInDisplay, LoggedOutDisplay }

export default Display