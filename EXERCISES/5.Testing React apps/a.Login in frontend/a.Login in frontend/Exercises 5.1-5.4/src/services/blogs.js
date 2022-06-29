import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

// let token = null

// const setToken = newToken => {
//   token = newToken
//   return token
// }

const getAll = async () => {
  const {data} = await axios.get(baseUrl)
  return data
}

const create = async (newBlog, {token}) => {

  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const {data} = await axios.post(baseUrl,newBlog ,config)
  return data
}


export default { getAll, create }