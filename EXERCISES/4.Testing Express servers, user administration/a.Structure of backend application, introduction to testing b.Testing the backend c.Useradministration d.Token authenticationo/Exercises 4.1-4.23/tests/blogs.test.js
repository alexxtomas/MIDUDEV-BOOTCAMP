const { JsonWebTokenError } = require('jsonwebtoken')
const { mongoose } = require('mongoose')
const supertest = require('supertest')
const { app, server } = require('../index')
const Blog = require('../models/Blog')
const User = require('../models/User')
const api = supertest(app)
const {initalBlogs, initialUsers} = require('./helper')

// UPDATE BLOGS 



beforeEach(async () => {

  await User.deleteMany({})
  for(const user of initialUsers) {
      await api.post('/api/users')
               .send(user)
  }

  const adminUser = await User.findOne({username: 'admin'})
  


  await Blog.deleteMany({})
  for(const blog of initalBlogs) {
    const newBlog = new Blog({
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
      user: adminUser.id
    })
    await newBlog.save()
  }
})

describe('GET /api/blogs', () => {
  test('blogs are returned as json', async () => {
   
    const credentials = {username: "admin", password:"admin"}
    const req = await api.post('/api/login').send(credentials)
    const {body: token} = req
    console.log(token)
    
    console.log(token.body)
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

    const firstReq = await api.get('/api/blogs')
    const {body: oldBlogs} = firstReq  

    const credentials = {username: 'admin', password: 'admin'}
    const data = await api.post('/api/login').send(credentials)
    const {token} = data.body
    const newBlog = {
      title: 'My first blog',
      author: 'Alex Tomas Llimos',
      url: 'https://alexblog.com',
      likes: 100
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const secondReq = await api.get('/api/blogs')
    const {body: newBlogs} = secondReq

    const addedBlog = newBlogs.find(blog => blog.author === newBlog.author && blog.title === newBlog.title && blog.url === newBlog.url)

    expect(newBlogs).toHaveLength(oldBlogs.length + 1)
    expect(newBlogs).toContain(addedBlog)

  })

  test.skip('request has likes propiety', async () => {
    const request = {
      title: 'My first blog',
      author: 'Alex Tomas Llimos',
      url: 'https://alexblog.com',
      likes: 5
    }

    expect(request.likes).toBeDefined()
  })

  test.skip('title and url propieties are missing from the request data, the backend responds to the 400 status code', async () => {
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



afterAll(() => {
  server.close()
  mongoose.connection.close()
})
