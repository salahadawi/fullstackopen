import LoginForm from './LoginForm'
import Notification from './Notification'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import BlogForm from './BlogForm'
import Toggleable from './Toggleable'

import { Center, VStack, Box, Heading } from '@chakra-ui/react'

const BlogDisplay = () => {
  const blogs = useSelector((state) => state.blogs)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <div id="blogdisplay">
      {sortedBlogs.map((blog) => (
        <div key={blog.id} style={blogStyle}>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </div>
      ))}
    </div>
  )
}

const LoggedInDisplay = () => {
  return (
    <>
      <Toggleable buttonLabel="new blog">
        <BlogForm />
      </Toggleable>
      <BlogDisplay />
    </>
  )
}

const LoggedOutDisplay = () => (
  <Box>
    <Notification />
    <Center h="90vh">
      <VStack bg="teal.50" px="64px" py="64px" rounded="xl" spacing="8">
        <Heading>Log in to application</Heading>
        <LoginForm />
      </VStack>
    </Center>
  </Box>
)

const Display = { BlogDisplay, LoggedInDisplay, LoggedOutDisplay }

export default Display
