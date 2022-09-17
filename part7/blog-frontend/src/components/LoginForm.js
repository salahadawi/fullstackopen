import { useDispatch } from 'react-redux'
import { useState } from 'react'

import { setNotificationWithTimeout } from '../reducers/notificationReducer'
import { setUser } from '../reducers/userReducer'

import loginService from '../services/login'

import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Box,
  VStack,
} from '@chakra-ui/react'

const LoginForm = () => {
  // use react-hook-form ??
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password,
      })

      dispatch(setUser(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(exception)
      dispatch(setNotificationWithTimeout('Wrong username or password'))
    }
  }

  return (
    <Box>
      <form onSubmit={handleLogin}>
        <VStack spacing="8">
          <Box color="teal">
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                id="username"
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
                bg="white"
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                id="password"
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
                bg="white"
              />
            </FormControl>
          </Box>
          <Button colorScheme="teal" w="100%" id="login-button" type="submit">
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default LoginForm
