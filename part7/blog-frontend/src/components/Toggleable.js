import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { toggleVisibility } from '../reducers/blogFormReducer'

const Toggleable = ({ children, buttonLabel }) => {
  const dispatch = useDispatch()
  const visible = useSelector((state) => state.blogForm)

  if (visible) {
    return (
      <>
        {children}
        <button onClick={() => dispatch(toggleVisibility(visible))}>
          cancel
        </button>
      </>
    )
  } else {
    return (
      <>
        <button onClick={() => dispatch(toggleVisibility(visible))}>
          {buttonLabel}
        </button>
      </>
    )
  }
}

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable
