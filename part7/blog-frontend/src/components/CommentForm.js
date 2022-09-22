import { useState } from 'react'
import { useDispatch } from 'react-redux'

import { createComment } from '../reducers/blogReducer'

import { Input, Button, FormControl, FormLabel, HStack } from '@chakra-ui/react'

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
      <FormControl>
        <FormLabel>Comment</FormLabel>
        <HStack>
          <Input
            type="text"
            value={comment}
            name="comment"
            onChange={({ target }) => setComment(target.value)}
            bg="white"
            w="60%"
          />
          <Button colorScheme="teal" type="submit" w="40%">
            Add comment
          </Button>
        </HStack>
      </FormControl>
    </form>
  )
}

export default CommentForm
