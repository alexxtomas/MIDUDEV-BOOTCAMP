import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = ({ users }) => {
  console.log(users)
  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td style={{ paddingLeft: 37 }}>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
const mapStateToProps = (state) => {
  const { users } = state
  return {
    users
  }
}

export default connect(mapStateToProps, null)(Users)
