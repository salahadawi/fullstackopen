import { useState, forwardRef, useImperativeHandle } from 'react'

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

export default Toggleable