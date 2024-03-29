const blogsRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get('/', async (req, res) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
  res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
  const { id } = req.params
  const blog = await Blog.findById(id).populate('user', {
    username: 1,
    name: 1
  })

  res.json(blog)
})

blogsRouter.delete('/:id', userExtractor, async (req, res) => {
  const { id } = req.params

  const blog = await Blog.findById(id)
  if (req.userId.toString() === blog.user.toString()) {
    await Blog.findByIdAndRemove(id)
    res.status(204).end()
  }
  res
    .status(401)
    .json({ error: 'You cannot delete a blog that it does not belong to you' })
})

blogsRouter.put('/:id', userExtractor, async (req, res) => {
  const { id } = req.params
  const blog = req.body
  const { userId } = req

  if (!blog.title || !blog.author || !blog.url || !blog.likes)
    res.status(400).json({
      error: 'title, author, url or likes is requeried to modify blog'
    })
  const user = await User.findById(userId)
  const newBlogInfo = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    user: user._id,
    likes: blog.likes
  }

  const modifiedBlog = await Blog.findByIdAndUpdate(id, newBlogInfo, {
    new: true
  })
  user.blogs = user.blogs.concat(modifiedBlog._id)
  await user.save()
  res.status(202).json(modifiedBlog)
})

blogsRouter.post('/', userExtractor, async (req, res) => {
  const { url, title, author, likes, comments } = req.body

  const { userId } = req
  const user = await User.findById(userId)

  const blog = new Blog({
    url,
    title,
    author,
    user: user._id,
    likes,
    comments
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
})

blogsRouter.get('/:id/comments', async (req, res) => {
  const { id } = req.params
  const { comments } = await Blog.findById(id)
  res.status(200).json(comments)
})

blogsRouter.post('/:id/comments', userExtractor, async (req, res) => {
  const { comment } = req.body
  const { id } = req.params
  console.log(id)

  const blog = await Blog.findById(id)
  const newBlogInfo = {
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes,
    comments: [...blog.comments, comment]
  }

  const modifiedBlog = await Blog.findByIdAndUpdate(id, newBlogInfo, {
    new: true
  })

  res.status(201).json(modifiedBlog)
})

module.exports = blogsRouter
