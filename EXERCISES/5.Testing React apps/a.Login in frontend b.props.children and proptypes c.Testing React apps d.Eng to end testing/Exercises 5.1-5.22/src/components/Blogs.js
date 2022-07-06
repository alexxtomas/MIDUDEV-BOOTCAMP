import BlogForm from './BlogsForm'
import Blog from './Blog'

const Blogs = ({
  user,
  Notification,
  message,
  blogs,
  clearUser,
  addBlog,
  setMessage,
  addLike,
  removeBlog
}) => {
  const handleLogout = () => {
    window.localStorage.clear()
    clearUser()
  }

  return (
    <>
      <div>
        <p>
          {user.username} logged in{' '}
          <button onClick={handleLogout}>Logout</button>
        </p>
        <h2>Blogs</h2>
        <Notification message={message} type="succesfully" />
        <BlogForm addBlog={addBlog} setMessage={setMessage} />
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            removeBlog={removeBlog}
          />
        ))}
      </div>
    </>
  )
}

export default Blogs
