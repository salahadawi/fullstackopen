import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'

import { toggleVisibility } from '../reducers/blogFormReducer'

import { Button, Box } from '@chakra-ui/react'

const Toggleable = ({ children, buttonLabel }) => {
  const dispatch = useDispatch()
  const visible = useSelector((state) => state.blogForm)

  if (visible) {
    return (
      <Box>
        {children}
        <Button
          colorScheme="teal"
          onClick={() => dispatch(toggleVisibility(visible))}
        >
          Cancel
        </Button>
      </Box>
    )
  } else {
    return (
      <Box>
        <Button
          colorScheme="teal"
          onClick={() => dispatch(toggleVisibility(visible))}
        >
          {buttonLabel}
        </Button>
      </Box>
    )
  }
}

Toggleable.displayName = 'Toggleable'

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
}

export default Toggleable
