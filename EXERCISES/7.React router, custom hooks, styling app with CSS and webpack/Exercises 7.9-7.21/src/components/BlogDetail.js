import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'
import { addLike, addComment } from '../reducers/blogsReducer'

const BlogDetail = ({ blogs, token, addLike, addComment }) => {
  const { id } = useParams()
  const blog = blogs.find((b) => b.id === id)
  const handleLike = () => {
    const newBlog = {
      ...blog,
      likes: blog.likes + 1
    }
    addLike(newBlog, { token })
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    console.log(id)
    addComment(id, comment, token)
  }
  if (!blog) return null
  return (
    <div>
      <div>
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <br />
        {blog.likes} likes <button onClick={handleLike}>like</button>
        <br />
        added by {blog.author}
        <h4>Comments</h4>
        <form onSubmit={handleSubmit}>
          <input name="comment" placeholder="Nice blog" />{' '}
          <button>add comment</button>
        </form>
        <ul>
          {blog.comments
            ? blog.comments.map((comment, i) => <li key={i}>{comment}</li>)
            : ''}
        </ul>
      </div>
    </div>
  )
}

const mapStateToProps = ({ blogs, loggedUser }) => {
  return { blogs, token: loggedUser.token }
}
const mapDispatchToProps = {
  addLike,
  addComment
}

export default connect(mapStateToProps, mapDispatchToProps)(BlogDetail)
