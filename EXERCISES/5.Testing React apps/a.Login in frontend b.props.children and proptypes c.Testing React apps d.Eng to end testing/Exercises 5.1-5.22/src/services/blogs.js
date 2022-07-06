import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = async () => {
  const { data } = await axios.get(baseUrl)
  return data
}

const create = async (newBlog, { token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.post(baseUrl, newBlog, config)
  return data
}

const modify = async (id, newBlog, { token }) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
  const { data } = await axios.put(`${baseUrl}/${id}`, newBlog, config)
  return data
}

const remove = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const { data } = await axios.delete(`${baseUrl}/${id}`, config)

  return data
}

export default { getAll, create, modify, remove }
