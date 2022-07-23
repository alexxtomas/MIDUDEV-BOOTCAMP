import { useParams } from 'react-router-dom'
import { connect } from 'react-redux'

const User = ({ users }) => {
  const { id } = useParams()
  const user = users.find((u) => u.id === id)
  if (!user) return null
  const { username, blogs } = user
  return (
    <div>
      <h2>{username}</h2>
      <h4>Added Blogs</h4>
      <ul>
        {blogs.map((blog, i) => (
          <li key={i}>{blog.title}</li>
        ))}
      </ul>
    </div>
  )
}

const mapStateToProps = ({ users }) => {
  return { users }
}

export default connect(mapStateToProps, null)(User)
