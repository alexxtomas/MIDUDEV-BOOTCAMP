import React from 'react'

const Notification = ({ message, type }) => {
    if (message === null) {
      return null
    }
    else if (type === 'succesfully') {
        return (
            <div className="succesfully">
              {message}
            </div>
          )
    }
    else if (type === 'error') {
        return (
            <div className="error">
              {message}
            </div>
          )
    }
    
  }

export default Notification