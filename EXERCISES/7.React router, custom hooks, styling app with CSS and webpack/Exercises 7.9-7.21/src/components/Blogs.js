import BlogForm from './BlogsForm'
import Blog from './Blog'
import { connect } from 'react-redux'
import { ListGroup } from 'react-bootstrap'

const Blogs = ({ Notification, blogs }) => {
  return (
    <>
      <div>
        <h2>Blogs</h2>
        <Notification type="succesfully" />
        <BlogForm />
        <ListGroup variant="flush">
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </ListGroup>
      </div>
    </>
  )
}

const mapStateToProps = ({ blogs }) => {
  return { blogs }
}

export default connect(mapStateToProps, null)(Blogs)
