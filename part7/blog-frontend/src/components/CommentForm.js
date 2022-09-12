import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createComment } from '../reducers/blogReducer'

const CommentForm = ({ blog }) => {
  const dispatch = useDispatch()

  const [comment, setComment] = useState('')

  const addComment = (event) => {
    event.preventDefault()
    if (comment === '') return
    dispatch(createComment(blog, comment))
    setComment('')
  }

  return (
    <form onSubmit={addComment}>
      <input
        type="text"
        value={comment}
        name="comment"
        onChange={({ target }) => setComment(target.value)}
      />
      <button type="submit">add comment</button>
    </form>
  )
}

export default CommentForm
