import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/userReducer'

import { Button } from '@chakra-ui/react'

const logOutButton = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearUser())
  }

  return (
    <Button colorScheme="teal" onClick={handleLogout}>
      Logout
    </Button>
  )
}

export default logOutButton
