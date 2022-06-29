const lodash = require('lodash')

const dummy = blogs => {
  return 1
}

const totalLikes = blogs => {
  const likes = blogs.map(blog => blog.likes)
  let addOfLikes = 0
  for (const like of likes) {
    addOfLikes += like
  }
  return addOfLikes
}

const favoriteBlog = blogs => {
  const likes = blogs.map(blog => blog.likes)
  const maxLikes = Math.max(...likes)
  const blogWithMoreLikes = blogs.filter(blog => blog.likes === maxLikes)
  return {
    title: blogWithMoreLikes[0].title,
    author: blogWithMoreLikes[0].author,
    likes: blogWithMoreLikes[0].likes
  }
}

const mostBlogs = blogs => {
  const blogAuthors = lodash.map(blogs, blog => blog.author)

  const result = lodash.values(lodash.groupBy(blogAuthors)).map(author => ({ name: author[0], blogs: author.length }))

  const sortedList = lodash.orderBy(result, 'blogs', 'desc')

  return {
    name: sortedList[0].name,
    count: sortedList[0].blogs
  }
}

const mostLikes = blogs => {
  const authors = lodash.uniq(lodash.map(blogs, blog => blog.author))
  const authorsObject = lodash.map(authors, author => ({ name: author }))
  for (const i in authorsObject) {
    authorsObject[i].likes = 0
  }
  for (const i in authorsObject) {
    for (const blog of blogs) {
      if (authorsObject[i].name === blog.author) {
        authorsObject[i].likes += blog.likes
      }
    }
  }
  const sortedList = lodash.orderBy(authorsObject, 'likes', 'desc')
  return {
    name: sortedList[0].name,
    likes: sortedList[0].likes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
