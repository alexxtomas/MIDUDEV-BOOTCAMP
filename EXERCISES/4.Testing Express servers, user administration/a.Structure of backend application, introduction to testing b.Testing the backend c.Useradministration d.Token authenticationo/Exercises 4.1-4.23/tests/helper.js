// Blogs
const supertest = require('supertest')
const { app } = require('../index')

const api = supertest(app)

const initalBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  },
  {
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10
  },
  {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  },
  {
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2
  }
]
const initialUsers = [
  {
    username: 'admin',
    password: 'admin'
  },
  {
    username: 'user',
    password: 'user'
  }
]

const getUsers = async () => {
  const req = await api.get('/api/users')
  const users = req.body

  return users
}

const getUserById = async (id) => {
  const req = await api.get(`/api/users/${id}`)

  const user = req.body

  return user
}

// const getToken = async api => {
//   const req = await api.post('/api/login')
// }

module.exports = {
  initalBlogs,
  initialUsers,
  getUsers,
  getUserById
}
