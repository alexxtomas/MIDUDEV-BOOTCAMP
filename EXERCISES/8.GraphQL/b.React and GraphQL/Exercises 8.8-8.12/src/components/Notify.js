const Notify = ({ message }) => {
  console.log(message)
  if (message === null) return null
  return (
    <span
      style={{
        color: 'red',
        fontFamily: 'sans-serif'
      }}
    >
      {message}
    </span>
  )
}

export default Notify
