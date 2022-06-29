import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification  from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedCredentiales')
    if(loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)

    }
  }, [])

  const addBlog = async event => {
    event.preventDefault()

    const blogToAdd = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }

    const token = user.token

   const returnedBlog =  await blogService.create(blogToAdd, {token})
   
   setBlogs(blogs.concat(returnedBlog))
   setNewBlog({
     title: '',
     author: '',
     url: ''
    })
    setMessage(`A new blog ${blogToAdd.title} by ${blogToAdd.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedCredentiales', JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch(e) {
      setMessage('Wrong Credentials')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

 


  const renderFormLogin = () => (
    <>
      <div>
        <h1>Log in to application</h1>
        <Notification message={message} type='error'/>
      </div>
      <form onSubmit={handleLogin}>
        <div>
          <input
            type='text'
            value={username}
            placeholder='Username'
            name='Username'
            onChange={({target}) => setUsername(target.value)}
            />
        </div>
        <div>
          <input
            type='password'
            value={password}
            placeholder='Password'
            name='Password'
            onChange={({target}) => setPassword(target.value)}
            />
        </div>
        <button>Login</button>
      </form>
    </>
  )

  const renderFormBlogs = (blogs, Blog, user) => (
    <>
      <div>
          <p>{user.username} logged in <button onClick={handleLogout}>Logout</button></p>
          <h2>Blogs</h2>
          <Notification message={message} type='succesfully' />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
      </div>
      <div>
            <h1>Create New</h1>
            <form onSubmit={addBlog}>
              <label htmlFor="POST-title">Title:</label> 
              <input 
                value={newBlog.title}
                type='text'
                id='POST-title'
                name='title'
                onChange={({target}) => setNewBlog({
                  ...newBlog,
                  title: target.value
                })}
              />
              <label htmlFor="POST-author">Author:</label> 
              <input 
                value={newBlog.author}
                type='text'
                id='POST-author'
                name='author'
                onChange={({target}) => setNewBlog({
                  ...newBlog,
                  author: target.value
                })}
              />
              <label htmlFor="POST-url">URL:</label> 
               <input 
               value={newBlog.url}
                placeholder='https://example.com'
                type='url'
                id='POST-url'
                name='url'
                onChange={({target}) => setNewBlog({
                  ...newBlog,
                  url: target.value
                })}

              />
              <button>Create</button>
            </form>
      </div>
    </>
      
  )

 

  return (
    <>
      {user
        ? renderFormBlogs(blogs, Blog, user)
        : renderFormLogin()}
        
    </>
  )


  
}

export default App
