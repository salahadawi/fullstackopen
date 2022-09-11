import { useDispatch } from 'react-redux'
import { clearUser } from '../reducers/userReducer'

const logOutButton = () => {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(clearUser())
  }

  return <button onClick={handleLogout}>logout</button>
}

export default logOutButton
