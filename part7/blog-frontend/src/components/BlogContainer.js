import { Link as ReachLink } from 'react-router-dom'

import { Link, Heading, Text, HStack, VStack } from '@chakra-ui/react'
import { ArrowUpIcon, ChatIcon } from '@chakra-ui/icons'

const UserLink = ({ user }) => {
  if (!user) {
    return <Text>Unknown user</Text>
  }
  return (
    <Link as={ReachLink} to={`/users/${user.id}`}>
      <Text>{user.name}</Text>
    </Link>
  )
}

const BlogContainer = ({ blog, hideUser }) => (
  <VStack
    spacing="4"
    align="normal"
    border="solid"
    borderColor="teal.100"
    rounded="xl"
    px="4"
    pt="8"
    pb="2"
    boxShadow="lg"
    bg="white"
  >
    <VStack spacing="4" align="normal" px="2">
      <Link as={ReachLink} to={`/blogs/${blog.id}`}>
        <Heading fontSize="xl">{blog.title}</Heading>
      </Link>
      <Text>{blog.author}</Text>
    </VStack>
    <HStack justify="space-between">
      <HStack>
        <Text>
          {blog.likes} <ArrowUpIcon />
        </Text>
        <Text>
          {blog.comments ? blog.comments.length : ''} <ChatIcon />
        </Text>
      </HStack>
      {hideUser || <UserLink user={blog.user} />}
    </HStack>
  </VStack>
)

export default BlogContainer
