import React, { useState } from 'react'
import loginService from '../services/login'

export default function LoginFrom({
  message,
  addUser,
  setMessage,
  Notification
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedCredentiales', JSON.stringify(user))
      setUsername('')
      setPassword('')
      addUser(user)
    } catch (e) {
      setMessage('Wrong Credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }
  return (
    <>
      <div>
        <h1>Log in to application</h1>
        <Notification message={message} type="error" />
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type="text"
            value={username}
            placeholder="Username"
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          <input
            type="password"
            value={password}
            placeholder="Password"
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button>Login</button>
      </form>
    </>
  )
}
