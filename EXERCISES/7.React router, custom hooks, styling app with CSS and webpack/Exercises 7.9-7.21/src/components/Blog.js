import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'

const Blog = ({ blog }) => {
  return (
    <ListGroup.Item variant="light">
      <Link to={`/blogs/${blog.id}`}>
        {blog.title} by {blog.author}
      </Link>
    </ListGroup.Item>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  }
}

export default connect(mapStateToProps, null)(Blog)
