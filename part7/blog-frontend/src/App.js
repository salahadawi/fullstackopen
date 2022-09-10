import { useEffect } from 'react'
import Display from './components/Display'
import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch } from 'react-redux'
import { initializeUser } from './reducers/userReducer'
import { useSelector } from 'react-redux'

const App = () => {
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
      {user ? <Display.LoggedInDisplay /> : <Display.LoggedOutDisplay />}
    </div>
  )
}

export default App
