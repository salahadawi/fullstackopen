import { useSelector } from 'react-redux'

import LogOutButton from './LogOut'
import NavigationButton from './NavigationButton'

import { HStack, Flex, Box, Divider, Heading } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'

const Navigation = () => {
  const user = useSelector((state) => state.user)

  return (
    <Box color="teal">
      <Flex w="100%" px="6" py="4" justify="space-between">
        <HStack as="nav" spacing="5">
          <NavigationButton to="/">Blogs</NavigationButton>
          <NavigationButton to="/users">Users</NavigationButton>
        </HStack>
        <Heading color="teal.900">
          Blog app <ChatIcon />
        </Heading>
        <HStack spacing="5">
          <p>{user.name} logged in</p>
          <LogOutButton />
        </HStack>
      </Flex>
      <Divider />
    </Box>
  )
}

export default Navigation
