import { useState } from 'react'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  if (visible) {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button>
        <div>{blog.url}</div>
        <div>{blog.likes} likes <button onClick={() => blog.likes++}>like</button></div>
        { blog.user ? <div>added by {blog.user.name}</div> : null }
      </div>
    )
  } else {
    return (
      <div style={blogStyle}>
        {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
      </div>
    )

    // return (
    //   <div style={blogStyle}>
    //     {blog.title} {blog.author}
    //   </div>
    // )
  }
}

export default Blog