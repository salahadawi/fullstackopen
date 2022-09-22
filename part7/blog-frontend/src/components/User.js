import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'

import BlogContainer from './BlogContainer'

import { Heading, SimpleGrid, Box, VStack } from '@chakra-ui/react'

const User = () => {
  const id = useParams().id
  const user = useSelector((state) => state.users.find((u) => u.id === id))

  if (!user) return null
  return (
    <Box spacing="4" bg="teal.50" px="64px" py="48px" rounded="xl" m="8">
      <VStack>
        <Heading>{user.name}</Heading>
      </VStack>
      <SimpleGrid id="blogdisplay" spacing="8" minChildWidth="3xs" p="16">
        {user.blogs.map((blog) => (
          <BlogContainer key={blog.id} blog={blog} hideUser={true} />
        ))}
      </SimpleGrid>
    </Box>
  )
}

export default User
