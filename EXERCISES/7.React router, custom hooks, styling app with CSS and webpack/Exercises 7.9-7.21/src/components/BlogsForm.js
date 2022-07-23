import { useState } from 'react'
import Togglable from './Togglable'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import { Form, Button } from 'react-bootstrap'

const BlogForm = ({ addBlog, setNotification, user }) => {
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
  const { token } = user

  const handleSumbit = async (event) => {
    event.preventDefault()

    const { title, author, url } = newBlog

    if (!(title && author && url))
      return window.alert('Some fields are empty, please check it ')

    const blogToAdd = {
      title,
      author,
      url,
      likes: 0,
      comments: []
    }
    addBlog(blogToAdd, { token })
    setNotification(
      `A new blog ${blogToAdd.title} by ${blogToAdd.author} added`,
      5
    )
    setNewBlog({
      title: '',
      author: '',
      url: ''
    })
  }

  return (
    <Togglable buttonLabel="Create New Blog">
      <div className="container">
        <h1>Create New</h1>
        <Form onSubmit={handleSumbit}>
          <Form.Group className="mb-3">
            <Form.Label>Title:</Form.Label>
            <Form.Control
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
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Author:</Form.Label>
            <Form.Control
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
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>URL:</Form.Label>
            <Form.Control
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
          </Form.Group>

          <Button
            variant="outline-dark"
            size="sm"
            name="create-blog-button"
            type="submit"
          >
            Create
          </Button>
        </Form>
      </div>
    </Togglable>
  )
}
const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  }
}

const mapDispatchToProps = {
  setNotification,
  addBlog
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogForm)
