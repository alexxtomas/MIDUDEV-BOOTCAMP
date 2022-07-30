const Notify = ({ message }) => {
  if (!message) return null
  return <div style={{ color: 'red', top: 0, width: '100%' }}>{message}</div>
}

export default Notify
