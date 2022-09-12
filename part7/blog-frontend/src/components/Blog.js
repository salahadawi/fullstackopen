import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)

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

  if (!blog) return null
  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <p>
        {blog.likes} likes{' '}
        <button onClick={() => handleLike(blog.id)}>like</button>
      </p>
      {blog.user ? <div>added by {blog.user.name}</div> : null}
      <button onClick={() => handleRemove(blog.id)}>remove</button>
    </div>
  )
}

export default Blog
