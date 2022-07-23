import React, { useState } from 'react'
import { connect } from 'react-redux'
import { addUser } from '../reducers/loggedUserReducer'
import { Form, Button } from 'react-bootstrap'

const LoginFrom = ({ addUser, setNotification, Notification }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    addUser(username, password)
    setUsername('')
    setPassword('')
  }
  return (
    <div className="container">
      <h1>Log in to application</h1>
      <Notification type="error" />
      <Form className="form using the grid" onSubmit={handleLogin}>
        <Form.Group className="mb-3">
          <Form.Control
            type="username"
            value={username}
            placeholder="Enter your username"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            value={password}
            placeholder="Password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <div className="d-grid gap-2">
          <Button variant="outline-primary" type="submit">
            Login
          </Button>
        </div>
      </Form>
    </div>
  )
}

const mapDispatchToProps = {
  addUser
}

export default connect(null, mapDispatchToProps)(LoginFrom)
