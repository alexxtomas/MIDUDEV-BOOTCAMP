import React from 'react'
import { connect } from 'react-redux'

const Notification = ({ message, type }) => {
  if (message === null) {
    return null
  } else if (type === 'succesfully') {
    return <div className="succesfully">{message}</div>
  } else if (type === 'error') {
    return <div className="error">{message}</div>
  }
}
const mapStateToProps = (state) => {
  return {
    message: state.notification
  }
}

export default connect(mapStateToProps)(Notification)
