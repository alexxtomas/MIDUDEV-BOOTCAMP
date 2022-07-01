import { useState, useEffect } from 'react'
import Blogs from './components/Blogs'
import blogService from './services/blogs'
import Notification from './components/Notification'
import LoginFrom from './components/LoginFrom'

const App = () => {
  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedCredentiales')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [])

  const addBlog = async (blog) => {
    const token = user.token

    const returnedBlog = await blogService.create(blog, { token })

    setBlogs(blogs.concat(returnedBlog))
  }

  const addUser = async (user) => {
    try {
      setUser(user)
    } catch (e) {
      setMessage('Wrong Credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const clearUser = () => {
    setUser(null)
  }

  const addLike = async (id, newBlog) => {
    const token = user.token

    const modifiedBlog = await blogService.modify(id, newBlog, { token })

    const modifiedBlogs = blogs.map((blog) => {
      if (blog.id === modifiedBlog.id) {
        blog = {
          ...blog,
          likes: modifiedBlog.likes
        }
        return blog
      }
      return blog
    })
    setBlogs(modifiedBlogs)
  }

  const removeBlog = async (id) => {
    const token = user.token

    await blogService.remove(id, token)

    const newBlogs = await blogService.getAll()
    setBlogs(newBlogs)
  }

  return (
    <>
      {user ? (
        <Blogs
          user={user}
          Notification={Notification}
          message={message}
          blogs={blogs}
          clearUser={clearUser}
          addBlog={addBlog}
          addLike={addLike}
          removeBlog={removeBlog}
          setMessage={setMessage}
        />
      ) : (
        <LoginFrom
          message={message}
          addUser={addUser}
          setMessage={setMessage}
          Notification={Notification}
        />
      )}
    </>
  )
}

export default App
