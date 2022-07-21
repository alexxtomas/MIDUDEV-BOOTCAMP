import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'

export const AnecdoteForm = ({ createAnecdote, setNotification }) => {
  const handleSubmit = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    createAnecdote(content)
    setNotification(`New Anecdote created '${content}'`, 3)
    event.target.anecdote.value = ''
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input name="anecdote" />
        </div>
        <button>create</button>
      </form>
    </div>
  )
}

const mapDispatchToProps = {
  createAnecdote,
  setNotification
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
