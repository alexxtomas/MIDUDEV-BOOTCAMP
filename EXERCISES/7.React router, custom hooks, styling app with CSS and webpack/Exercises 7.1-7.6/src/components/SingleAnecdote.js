import { useParams } from 'react-router-dom'
const SingleAnecdote = ({ anecdotes }) => {
  const { id } = useParams()
  const anecdote = anecdotes.find((a) => a.id === Number(id))
  return (
    <>
      <h1>{anecdote.content}</h1>
      <div>has {anecdote.votes} votes</div>
    </>
  )
}

export default SingleAnecdote
