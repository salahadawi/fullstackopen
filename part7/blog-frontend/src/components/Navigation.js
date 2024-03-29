import { useSelector } from 'react-redux'

import LogOutButton from './LogOut'
import NavigationButton from './NavigationButton'

import { HStack, Grid, Box, Divider, Heading } from '@chakra-ui/react'
import { ChatIcon } from '@chakra-ui/icons'

const Navigation = () => {
  const user = useSelector((state) => state.user)

  return (
    <Box color="teal">
      <Grid templateColumns="repeat(3, 1fr)" px="6" py="4" maxW="1280" m="auto">
        <HStack as="nav" spacing="5">
          <NavigationButton to="/">Blogs</NavigationButton>
          <NavigationButton to="/users">Users</NavigationButton>
        </HStack>
        <Heading color="teal.900" textAlign="center">
          Blog app <ChatIcon />
        </Heading>
        <HStack spacing="5" justify="end">
          <p>{user.name} logged in</p>
          <LogOutButton />
        </HStack>
      </Grid>
      <Divider />
    </Box>
  )
}

export default Navigation
