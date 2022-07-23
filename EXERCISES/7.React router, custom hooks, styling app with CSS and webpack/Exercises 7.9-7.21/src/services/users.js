import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'

const getUsers = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}
const getUser = async (id) => {
  const { data } = await axios.get(`${baseUrl}/${id}`)
  return data
}

export default { getUsers, getUser }
