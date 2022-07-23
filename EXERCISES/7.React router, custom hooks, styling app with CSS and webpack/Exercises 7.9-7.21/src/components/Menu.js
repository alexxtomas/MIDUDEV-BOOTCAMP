import { connect } from 'react-redux'
import { removeUser } from '../reducers/loggedUserReducer'
import { Link } from 'react-router-dom'
import { Button, Navbar, Nav } from 'react-bootstrap'

export const Menu = ({ user, removeUser }) => {
  const handleLogout = () => {
    window.localStorage.clear()
    removeUser()
  }

  const inlineStyle = {
    color: 'white',
    margin: 10
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav.Link href="#">
          <Link to="/">Blogs</Link>
        </Nav.Link>
        <Nav.Link href="#">
          <Link to="/users">Users</Link>
        </Nav.Link>
        <p style={inlineStyle}> {user.username} logged in </p>
        <Button variant="outline-light" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </Navbar.Collapse>
    </Navbar>
  )
}

const mapStateToProps = (state) => {
  return {
    user: state.loggedUser
  }
}

const mapDisptachToProps = {
  removeUser
}

export default connect(mapStateToProps, mapDisptachToProps)(Menu)
