import LoginForm from './LoginForm'
import Notification from './Notification'
import { useSelector } from 'react-redux'

import BlogForm from './BlogForm'
import BlogContainer from './BlogContainer'

import { Center, VStack, Box, Heading, SimpleGrid } from '@chakra-ui/react'

const BlogDisplay = () => {
  const blogs = useSelector((state) => state.blogs)

  // const blogStyle = {
  //   paddingTop: 10,
  //   paddingLeft: 2,
  //   border: 'solid',
  //   borderWidth: 1,
  //   marginBottom: 5,
  // }

  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)
  return (
    <SimpleGrid id="blogdisplay" spacing="8" minChildWidth="2xs" p="16">
      {sortedBlogs.map((blog) => (
        <BlogContainer key={blog.id} blog={blog} />
      ))}
    </SimpleGrid>
  )
}

const LoggedInDisplay = () => {
  return (
    <Box bg="gray.50">
      {/* <Flex pt="5" pl="5"> */}
      {/* <Toggleable buttonLabel="New blog"> */}
      <BlogForm />
      {/* </Toggleable> */}
      {/* </Flex> */}
      <BlogDisplay />
    </Box>
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
