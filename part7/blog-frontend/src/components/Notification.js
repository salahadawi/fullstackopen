const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return <div className={message.style}>{message.text}</div>
}

export default Notification
