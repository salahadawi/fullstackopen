import { useState } from 'react'

const BlogForm = ({ handleBlogCreate }) => {
  const [blogInput, setBlogInput] = useState({ title: '', author: '', url: '' })

  const addBlog = (event) => {
    event.preventDefault()
    handleBlogCreate(blogInput)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title: <input id="title" placeholder='title' type="text" value={blogInput.title} name="title" onChange={({ target }) => setBlogInput({ ...blogInput, title: target.value })} />
        </div>
        <div>
          author: <input id="author" placeholder='author' type="text" value={blogInput.author} name="author" onChange={({ target }) => setBlogInput({ ...blogInput, author: target.value })} />
        </div>
        <div>
          url: <input id="url" placeholder='url' type="text" value={blogInput.url} name="url" onChange={({ target }) => setBlogInput({ ...blogInput, url: target.value })} />
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm