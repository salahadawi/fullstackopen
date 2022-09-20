import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import Display from './components/Display'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

import { Box } from '@chakra-ui/react'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  if (!user) return <Display.LoggedOutDisplay />
  return (
    <Box>
      <Navigation />
      <Notification />
      <Routes>
        <Route path="/" element={<Display.LoggedInDisplay />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<Blog />} />
      </Routes>
    </Box>
  )
}

export default App
