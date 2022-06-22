const { mongoose } = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const { Blog } = require('../models/Blog')
const api = supertest(app)

const initalBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  for (const blog of initalBlogs) {
    const blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
  test('unique identifier propety of the blogs is named id', async () => {
    const response = await api.get('/api/blogs')
    const blogs = response.body
    const ids = blogs.map(blog => blog.id)

    expect(ids).toBeDefined()
  })
})

describe('POST /api/blogs', () => {
  test('blog is created succesfully ', async () => {
    const newBlog = {
      title: 'My first blog',
      author: 'Alex Tomas Llimos',
      url: 'https://alexblog.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const request = await api.get('/api/blogs')
    const blogs = request.body
    const findNewBlog = blogs.find(blog => blog.title === newBlog.title && blog.author === newBlog.author && blog.url === newBlog.url && blog.likes === newBlog.likes)
    const { id, ...addedBlog } = findNewBlog

    expect(blogs).toHaveLength(initalBlogs.length + 1)
    expect(addedBlog).toStrictEqual(newBlog)
  })

  test('request has likes propiety', async () => {
    const request = {
      title: 'My first blog',
      author: 'Alex Tomas Llimos',
      url: 'https://alexblog.com',
      likes: 5
    }

    expect(request.likes).toBeDefined()
  })

  test('title and url propieties are missing from the request data, the backend responds to the 400 status code', async () => {
    const request = {
      author: 'Alex',
      likes: 5
    }

    await api
      .post('/api/blogs')
      .send(request)
      .expect(400)
  })
})

describe('DELETE /api/blogs/:id', () => {
  test('a blog can be deleted succesfully', async () => {
    const response = await api.get('/api/blogs')
    const { body: blogs } = response
    const blogToDelete = blogs[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const secondResponse = await api.get('/api/blogs')
    const { body: newBlogs } = secondResponse

    expect(newBlogs).toHaveLength(blogs.length - 1)
    expect(newBlogs).not.toContain(blogToDelete)
  })
})

describe('PUT /api/blogs/:id', () => {
  test('a blog can be modified', async () => {
    const req = await api.get('/api/blogs')
    const { body: blogs } = req
    const blogToModify = blogs[0]
    const newNote = {
      title: 'Hello World',
      author: 'PAPA HA LLEGADO',
      url: 'https://helloWorld.com',
      likes: 3232
    }
    await api
      .put(`/api/blogs/${blogToModify.id}`)
      .send(newNote)
      .expect(202)
      .expect('Content-Type', /application\/json/)

    const secReq = await api.get('/api/blogs')
    const { body: newBlogs } = secReq
    const modifiedBlog = newBlogs.find(blog => blog.id === blogToModify.id)

    expect(newBlogs).toContain(modifiedBlog)
    expect(newBlogs).toHaveLength(blogs.length)
  })
})
afterAll(() => {
  server.close()
  mongoose.connection.close()
})
