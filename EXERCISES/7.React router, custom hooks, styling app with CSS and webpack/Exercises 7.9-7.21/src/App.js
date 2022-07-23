import { useEffect } from 'react'
import Blogs from './components/Blogs'
import Users from './components/Users'
import User from './components/User'
import Notification from './components/Notification'
import LoginFrom from './components/LoginFrom'
import Menu from './components/Menu'
import { connect } from 'react-redux'
import { setUser } from './reducers/loggedUserReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeUsers } from './reducers/usersReducer'

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import BlogDetail from './components/BlogDetail'

const App = ({ user, setUser, initializeBlogs, initializeUsers }) => {
  useEffect(() => {
    initializeBlogs()
  }, [initializeBlogs])
  useEffect(() => {
    initializeUsers()
  }, [initializeUsers])

  useEffect(() => {
    const loggedUserJson = window.localStorage.getItem('loggedCredentiales')
    if (loggedUserJson) {
      const user = JSON.parse(loggedUserJson)
      setUser(user)
    }
  }, [setUser])

  if (user) {
    return (
      <BrowserRouter>
        <div className="container">
          <Menu />
          <Routes>
            <Route path="/" element={<Blogs Notification={Notification} />} />
            <Route path="/blogs/:id" element={<BlogDetail />} />
            <Route path="/users" element={<Users />} />
            <Route path="/users/:id" element={<User />} />
          </Routes>
        </div>
      </BrowserRouter>
    )
  } else {
    return <LoginFrom Notification={Notification} />
  }
}

const mapStateToProps = ({ loggedUser }) => {
  return { user: loggedUser }
}

const mapDispatchToProps = {
  initializeBlogs,
  setUser,
  initializeUsers
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
