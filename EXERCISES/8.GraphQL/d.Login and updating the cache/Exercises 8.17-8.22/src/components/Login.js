import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { LOGIN } from '../authors-books/graphql-mutations'

const Login = ({ show, notifyError, setToken }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [getToken] = useMutation(LOGIN)

  const handleSubmit = (evt) => {
    evt.preventDefault()
    getToken({ variables: { username, password } })
      .then(({ data }) => {
        let { value: token } = data.login
        setToken(token)
        window.localStorage.setItem('loggedUserToken', token)
        window.location.reload()
      })
      .catch((e) => notifyError(e.message))
    setUsername('')
    setPassword('')
  }
  if (!show) return null
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            <input
              value={username}
              placeholder="username"
              onChange={(evt) => setUsername(evt.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <input
              value={password}
              placeholder="password"
              type="password"
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </label>
        </div>
        <button>login</button>
      </form>
    </div>
  )
}

export default Login
