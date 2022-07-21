import axios from 'axios'

const baseURL = 'http://localhost:3001/anecdotes'

const getAll = () => {
  return axios.get(baseURL).then(({ data }) => data)
}

const create = (anecdote) => {
  return axios.post(baseURL, anecdote).then(({ data }) => data)
}

const modify = (anecdote) => {
  const { id } = anecdote
  return axios.put(`${baseURL}/${id}`, anecdote).then(({ data }) => data)
}

export default { getAll, create, modify }
