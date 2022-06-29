const blogsRouter = require('express').Router()
const userExtractor = require('../middleware/userExtractor')
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.get('/', async (req, res) => {
    console.log(req)
    const blogs = await Blog.find({}).populate('user', {username: 1, name: 1})
    res.json(blogs)
  })

blogsRouter.get('/:id', async (req, res) => {
const { id } = req.params
const blog = await Blog.findById(id).populate('user', {username: 1, name: 1})

res.json(blog)
})



blogsRouter.delete('/:id', userExtractor,async (req, res) => {
const { id } = req.params

const blog = await Blog.findById(id)
if(req.userId.toString() === blog.user.toString()) {
  await Blog.findByIdAndRemove(id)
  res.status(204).end()
}
res.status(401).json({error: 'You cannot delete a blog that it does not belong to you'})


})

blogsRouter.put('/:id', async (req, res) => {
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

blogsRouter.post('/',userExtractor, async (req, res) => {
  const {url, title, author, likes } = req.body

  const {userId} = req
  const user = await User.findById(userId)

  const blog = new Blog({
    url,
    title,
    author,
    user: user._id,
    likes
  })

  const savedBlog = await blog.save()

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  res.status(201).json(savedBlog)
 
})

module.exports = blogsRouter