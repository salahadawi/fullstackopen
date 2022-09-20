import { useState, useRef } from 'react'
import { useDispatch } from 'react-redux'
import FocusLock from 'react-focus-lock'

import { createBlog } from '../reducers/blogReducer'

import {
  Button,
  Input,
  FormControl,
  FormLabel,
  Spacer,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { EditIcon } from '@chakra-ui/icons'

const BlogForm = () => {
  const dispatch = useDispatch()
  const initialFocusRef = useRef()
  const { onOpen, onClose, isOpen } = useDisclosure()

  const [blogInput, setBlogInput] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = (event) => {
    event.preventDefault()

    // temporary for testing css
    const tmpBlog = {
      title: 'The Title of the blog',
      author: 'The Author of the blog',
      url: 'urloftheblog.com',
    }

    console.log('blogInput', blogInput)
    dispatch(createBlog(tmpBlog))
    dispatch(createBlog(tmpBlog))
    dispatch(createBlog(tmpBlog))
    dispatch(createBlog(tmpBlog))
    dispatch(createBlog(tmpBlog))
  }

  return (
    // use popover for blog form
    // split up into components
    <Popover
      closeOnBlur={false}
      initialFocusRef={initialFocusRef}
      isOpen={isOpen}
      onOpen={onOpen}
      onClose={onClose}
    >
      <PopoverTrigger>
        <Button colorScheme="teal" leftIcon={<EditIcon />} mt="8" ml="16">
          Create New Blog
        </Button>
      </PopoverTrigger>
      <PopoverContent p="4">
        <FocusLock>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            <form onSubmit={addBlog}>
              <VStack>
                <FormControl>
                  <FormLabel>Title</FormLabel>
                  <Input
                    id="title"
                    type="text"
                    value={blogInput.title}
                    name="title"
                    onChange={({ target }) =>
                      setBlogInput({ ...blogInput, title: target.value })
                    }
                    ref={initialFocusRef}
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Author</FormLabel>
                  <Input
                    id="author"
                    type="text"
                    value={blogInput.author}
                    name="author"
                    onChange={({ target }) =>
                      setBlogInput({ ...blogInput, author: target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <FormLabel>Url</FormLabel>
                  <Input
                    id="url"
                    type="text"
                    value={blogInput.url}
                    name="url"
                    onChange={({ target }) =>
                      setBlogInput({ ...blogInput, url: target.value })
                    }
                  />
                </FormControl>
                <FormControl>
                  <Spacer />
                  <Button id="create-button" type="submit" onClick={onClose}>
                    Create
                  </Button>
                </FormControl>
              </VStack>
            </form>
          </PopoverBody>
        </FocusLock>
      </PopoverContent>
    </Popover>
  )
}

export default BlogForm
