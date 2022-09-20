import { useSelector } from 'react-redux'

import { Alert, AlertIcon, AlertDescription } from '@chakra-ui/react'

const Notification = () => {
  // use toast from chakra ui ??
  const notification = useSelector((state) => state.notification)
  if (notification.text === '') {
    return null
  }
  return (
    <Alert id="notification" status={notification.style}>
      <AlertIcon />
      <AlertDescription>{notification.text}</AlertDescription>
    </Alert>
  )
}

export default Notification
