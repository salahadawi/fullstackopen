import { useState, forwardRef, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

const Toggleable = forwardRef(({children, buttonLabel}, refs) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility
    }
  })

  if (visible) {
    return (
      <>
        {children}
        <button onClick={toggleVisibility}>cancel</button>
      </>
    )
  } else {
    return (
      <>
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </>
    )
  }
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable