import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

import CommentForm from './CommentForm'

import {
  Heading,
  VStack,
  Text,
  Button,
  Link,
  Center,
  HStack,
  List,
  ListItem,
  ListIcon,
} from '@chakra-ui/react'

import {
  ExternalLinkIcon,
  DeleteIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons'
import HeartIcon from '../icons/heart'

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
    // redirect to blogs page
  }

  if (!blog) return null
  return (
    <Center>
      <VStack
        alignItems="start"
        spacing="4"
        bg="teal.50"
        px="64px"
        py="48px"
        rounded="xl"
        m="8"
      >
        <Heading>{blog.title}</Heading>
        <Heading size="md">{blog.author}</Heading>
        <Link href={blog.url} isExternal>
          {blog.url} <ExternalLinkIcon />
        </Link>
        <Text>added by {blog.user ? blog.user.name : 'Unknown User'}</Text>
        <HStack w="100%" justify="space-between" pt="8">
          <Text>{blog.likes} likes </Text>
          <HStack>
            <Button
              leftIcon={<HeartIcon />}
              colorScheme="teal"
              onClick={() => handleLike(blog.id)}
            >
              Like
            </Button>
            <Button
              leftIcon={<DeleteIcon />}
              colorScheme="teal"
              onClick={() => handleRemove(blog.id)}
            >
              Delete
            </Button>
          </HStack>
        </HStack>
        <CommentForm blog={blog} />
        <List>
          {blog.comments &&
            blog.comments.map((comment, index) => (
              <ListItem key={index}>
                <ListIcon as={ChevronRightIcon} color="teal" />
                {comment}
              </ListItem>
            ))}
        </List>
      </VStack>
    </Center>
  )
}

export default Blog
