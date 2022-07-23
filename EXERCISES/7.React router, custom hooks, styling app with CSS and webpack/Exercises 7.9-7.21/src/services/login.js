import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/login'

const login = async (username, password) => {
  const credentials = {
    username,
    password
  }
  const { data } = await axios.post(baseUrl, credentials)
  return data
}

export default { login }
