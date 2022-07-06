import { useState } from 'react'
import Togglable from './Togglable'

const BlogForm = ({ addBlog, setMessage }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const handleSumbit = async (event) => {
    event.preventDefault()

    const blogToAdd = {
      title: newBlog.title,
      author: newBlog.author,
      url: newBlog.url
    }
    await addBlog(blogToAdd)
    setMessage(`A new blog ${blogToAdd.title} by ${blogToAdd.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <Togglable buttonLabel="Create New Blog">
      <div>
        <h1>Create New</h1>
        <form onSubmit={handleSumbit}>
          <label htmlFor="POST-title">Title:</label>
          <input
            value={newBlog.title}
            type="text"
            id="POST-title"
            name="title"
            onChange={({ target }) =>
              setNewBlog({
                ...newBlog,
                title: target.value
              })
            }
          />
          <label htmlFor="POST-author">Author:</label>
          <input
            value={newBlog.author}
            type="text"
            id="POST-author"
            name="author"
            onChange={({ target }) =>
              setNewBlog({
                ...newBlog,
                author: target.value
              })
            }
          />
          <label htmlFor="POST-url">URL:</label>
          <input
            value={newBlog.url}
            placeholder="https://example.com"
            type="url"
            id="POST-url"
            name="url"
            onChange={({ target }) =>
              setNewBlog({
                ...newBlog,
                url: target.value
              })
            }
          />
          <br />
          <button name="create-blog-button">Create</button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm
