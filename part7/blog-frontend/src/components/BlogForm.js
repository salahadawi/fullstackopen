import { useState, useRef, forwardRef } from 'react'
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

const TextInput = forwardRef(({ label, value, onChange, name }, ref) => {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        id={name}
        type="text"
        value={value}
        name={name}
        onChange={onChange}
        ref={ref}
      />
    </FormControl>
  )
})
TextInput.displayName = 'TextInput'

const Form = ({ initialFocusRef, onClose }) => {
  const dispatch = useDispatch()
  const [blogInput, setBlogInput] = useState({
    title: '',
    author: '',
    url: '',
  })

  const addBlog = (event) => {
    event.preventDefault()
    dispatch(createBlog(blogInput))
  }

  const handleBlogInputChange = (event) => {
    const { name, value } = event.target
    setBlogInput({ ...blogInput, [name]: value })
  }

  return (
    <form onSubmit={addBlog}>
      <VStack>
        <TextInput
          label="Title"
          value={blogInput.title}
          onChange={handleBlogInputChange}
          name="title"
          ref={initialFocusRef}
        />
        <TextInput
          label="Author"
          value={blogInput.author}
          onChange={handleBlogInputChange}
          name="author"
        />
        <TextInput
          label="Url"
          value={blogInput.url}
          onChange={handleBlogInputChange}
          name="url"
        />
        <FormControl>
          <Spacer />
          <Button id="create-button" type="submit" onClick={onClose}>
            Create
          </Button>
        </FormControl>
      </VStack>
    </form>
  )
}

const BlogForm = () => {
  const initialFocusRef = useRef()
  const { onOpen, onClose, isOpen } = useDisclosure()

  return (
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
            <Form initialFocusRef={initialFocusRef} onClose={onClose} />
          </PopoverBody>
        </FocusLock>
      </PopoverContent>
    </Popover>
  )
}

export default BlogForm
