import { useSelector } from 'react-redux'

import LogOutButton from './LogOut'
import NavigationButton from './NavigationButton'

import { HStack, Flex } from '@chakra-ui/react'

const Navigation = () => {
  const user = useSelector((state) => state.user)

  return (
    <Flex
      w="100%"
      px="6"
      py="5"
      align="center"
      justify="space-between"
      color="teal"
    >
      <HStack as="nav" spacing="5" m="auto">
        <NavigationButton to="/">Blogs</NavigationButton>
        <NavigationButton to="/users">Users</NavigationButton>
      </HStack>
      <HStack spacing="5">
        <p>{user.name} logged in</p>
        <LogOutButton />
      </HStack>
    </Flex>
  )
}

export default Navigation
