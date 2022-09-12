import { Link } from 'react-router-dom'
import LogOutButton from './LogOut'
import { useSelector } from 'react-redux'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const padding = {
    paddingRight: 5,
  }

  const style = {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '0 10px',
    backgroundColor: 'lightgrey',
    color: 'black',
  }

  return (
    <div style={style}>
      <Link style={padding} to="/">
        blogs
      </Link>
      <Link style={padding} to="/users">
        users
      </Link>
      <p>
        {user.name} logged in <LogOutButton />
      </p>
    </div>
  )
}

export default Navigation
