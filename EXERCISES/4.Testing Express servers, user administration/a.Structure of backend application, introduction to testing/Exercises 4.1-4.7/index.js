require('dotenv').config()
require('./mongo')
require('express-async-errors')

const express = require('express')
const app = express()
const cors = require('cors')
const { Blog } = require('./models/Blog')
app.use(cors())
app.use(express.json())

app.get('/api/blogs', async (req, res) => {
  const data = await Blog.find({})
  res.json(data)
})

app.get('/api/blogs/:id', async (req, res) => {
  const { id } = req.params
  const blogs = await Blog.find({})
  const blog = blogs.find(blog => blog.id === id)
  res.json(blog)
})

app.post('/api/blogs', async (req, res) => {
  const blog = new Blog(req.body)

  const data = await blog.save()
  res.status(201).json(data)
  // else throw Error('Bad request')
})

app.delete('/api/blogs/:id', async (req, res) => {
  const { id } = req.params

  await Blog.findByIdAndDelete(id)
  res.status(204).end()
})

app.put('/api/blogs/:id', async (req, res) => {
  const { id } = req.params
  const blog = req.body

  if (!blog.title || !blog.author || !blog.url || !blog.likes) res.status(400).json({ error: 'title, author, url or likes is requeried to modify blog' })
  const newBlogInfo = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes
  }

  const response = await Blog.findByIdAndUpdate(id, newBlogInfo, { new: true })
  res.status(202).json(response)
})

app.use((err, req, res, next) => {
  if (err.name === 'ValidationError') res.status(400).json({ error: 'Error in the post request validation' })
  if (err.name === 'CastError') res.status(400).json({ error: 'id used is malformed' })
})

const PORT = process.env.PORT
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

module.exports = { app, server }
