import { Link as ReachLink } from 'react-router-dom'

import { Button, Link } from '@chakra-ui/react'

const NavigationButton = (props) => {
  const { children, to, ...rest } = props
  return (
    <Link as={ReachLink} to={to}>
      <Button variant="nav" {...rest}>
        {children}
      </Button>
    </Link>
  )
}

export default NavigationButton
