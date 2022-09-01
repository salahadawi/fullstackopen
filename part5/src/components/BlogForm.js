import { useState } from 'react'

const BlogForm = ({ handleBlogCreate }) => {
  const [blogInput, setBlogInput] = useState({ title: '', author: '', url: '' })

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleBlogCreate}>
        <div>
          title: <input type="text" value={blogInput.title} name="title" onChange={({ target }) => setBlogInput({ ...blogInput, title: target.value })} />
        </div>
        <div>
          author: <input type="text" value={blogInput.author} name="author" onChange={({ target }) => setBlogInput({ ...blogInput, author: target.value })} />
        </div>
        <div>
          url: <input type="text" value={blogInput.url} name="url" onChange={({ target }) => setBlogInput({ ...blogInput, url: target.value })} />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  )
}

export default BlogForm