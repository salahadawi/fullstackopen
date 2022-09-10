import { useEffect, useRef } from 'react'
import Display from './components/Display'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import { useSelector } from 'react-redux'

const App = () => {
  const blogFormRef = useRef()
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUser())
  }, [dispatch])

  return (
    <div>
      {user ? (
        <Display.LoggedInDisplay blogFormRef={blogFormRef} />
      ) : (
        <Display.LoggedOutDisplay />
      )}
    </div>
  )
}

export default App
