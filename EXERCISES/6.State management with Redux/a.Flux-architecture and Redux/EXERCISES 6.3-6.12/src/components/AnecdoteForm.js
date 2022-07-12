import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

export default function AnecdoteForm() {
  const dispatch = useDispatch()
  const handleSubmit = (evt) => {
    evt.preventDefault()

    const { target } = evt
    const content = target.anecdote.value
    console.log(content)
    target.anecdote.value = ''
    dispatch(createAnecdote(content))
  }
  return (
    <>
      <h2>Create New</h2>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" placeholder="Write your anecdote" />
        <button>create</button>
      </form>
    </>
  )
}
