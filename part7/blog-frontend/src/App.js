import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route, useMatch } from 'react-router-dom'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { initializeUsers } from './reducers/usersReducer'

import Display from './components/Display'
import Users from './components/Users'
import User from './components/User'
import LogOutButton from './components/LogOut'
import Notification from './components/Notification'

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

  const match = useMatch('/users/:id')
  const users = useSelector((state) => state.users)
  const userToDisplay = match
    ? users.find((user) => user.id === match.params.id)
    : null

  if (!user) return <Display.LoggedOutDisplay />
  return (
    <div>
      <h2>blogs</h2>
      <Notification />
      <p>{user.name} logged in</p>
      <p>
        <LogOutButton />
      </p>
      <Routes>
        <Route path="/" element={<Display.LoggedInDisplay />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User user={userToDisplay} />} />
      </Routes>
    </div>
  )
}

export default App
