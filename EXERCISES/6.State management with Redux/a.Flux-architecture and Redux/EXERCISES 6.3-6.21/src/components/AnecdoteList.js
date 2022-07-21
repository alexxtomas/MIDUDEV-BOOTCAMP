import { connect } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { SortAnecdotesForm } from './SortAnecdotesForm'
// import { addVote } from '../reducers/anecdoteReducer'

export const AnecdoteList = ({ anecdotes, addVote, setNotification }) => {
  const handleVote = (id) => {
    const anecdote = anecdotes.find((a) => a.id === id)
    addVote(anecdote)
    setNotification(`You Voted '${anecdote.content}'`, 3)
  }

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}

      <SortAnecdotesForm />
    </div>
  )
}

const mapStateToProps = ({ anecdotes: a, sort, filter }) => {
  let anecdotesCopy = [...a]

  let filtredAnecdotes = []
  if (filter === '') {
    if (sort === 'NONE') return { anecdotes: anecdotesCopy }
    else if (sort === 'LESS') {
      anecdotesCopy = anecdotesCopy.sort((a, b) => {
        return a.votes - b.votes
      })
      return {
        anecdotes: anecdotesCopy
      }
    } else {
      anecdotesCopy = anecdotesCopy.sort((a, b) => {
        return b.votes - a.votes
      })
      return {
        anecdotes: anecdotesCopy
      }
    }
  }

  if (filter !== '') {
    anecdotesCopy.forEach((a) => {
      if (a.content.includes(filter)) {
        filtredAnecdotes.push(a)
      }
    })
    if (sort === 'NONE') return { anecdotesCopy: filtredAnecdotes }
    else if (sort === 'LESS') {
      filtredAnecdotes = filtredAnecdotes.sort((a, b) => {
        return a.votes - b.votes
      })
      return {
        anecdotes: filtredAnecdotes
      }
    }
  } else {
    filtredAnecdotes = filtredAnecdotes.sort((a, b) => {
      return b.votes - a.votes
    })
    return {
      anecdotes: filtredAnecdotes
    }
  }
}
const mapDispatchToProps = {
  addVote,
  setNotification
}
export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
