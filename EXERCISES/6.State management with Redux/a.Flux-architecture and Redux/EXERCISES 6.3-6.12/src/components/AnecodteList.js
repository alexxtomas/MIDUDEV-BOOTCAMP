import { useSelector, useDispatch } from 'react-redux'
import { actionVote } from '../reducers/anecdoteReducer'

export default function AnecdoteList() {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(actionVote(id))
  }

  const ordenedAnecdotes = anecdotes.sort((a, b) => {
    return b.votes - a.votes
  })

  return (
    <>
      {ordenedAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </>
  )
}
