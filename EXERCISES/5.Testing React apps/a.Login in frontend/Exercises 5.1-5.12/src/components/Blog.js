import { useRef } from 'react'

import Togglable from './Togglable'

const Blog = ({ blog, addLike, removeBlog }) => {
  const togglableRef = useRef()

  const handleLike = () => {
    const likes = blog.likes + 1
    const newBlog = {
      ...blog,
      likes: likes
    }
    addLike(blog.id, newBlog)
  }

  const handleRemove = () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      removeBlog(blog.id)
    }
  }
  const handleClick = () => {
    togglableRef.current.toggleVisibility()
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const buttonLabel = ['view', 'hiden']

  if (blog.likes === undefined) blog.likes = 0
  return (
    <Togglable buttonLabel={buttonLabel} data={blog.title} ref={togglableRef}>
      <div style={blogStyle}>
        <div>
          {blog.title} <button onClick={handleClick}>hide</button>
          <br />
          {blog.url}
          <br />
          likes: {blog.likes} <button onClick={handleLike}>like</button>
          <br />
          {blog.author}
          <br />
          <button className="remove-blog" onClick={handleRemove}>
            remove
          </button>
        </div>
      </div>
    </Togglable>
  )
}

export default Blog
