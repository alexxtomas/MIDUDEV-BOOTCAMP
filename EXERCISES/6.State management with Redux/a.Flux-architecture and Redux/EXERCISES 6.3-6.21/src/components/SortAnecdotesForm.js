import { useDispatch } from 'react-redux'
import { setSort } from '../reducers/sortReducer'

export const SortAnecdotesForm = () => {
  const dispatch = useDispatch()
  const sortFrom = (value) => {
    dispatch(setSort(value))
  }
  return (
    <div>
      <h2>Sort The Anecdotes By Votes</h2>
      <form>
        <input type="radio" name="sort" onChange={() => sortFrom('LESS')} />{' '}
        From Less To More
        <input
          type="radio"
          name="sort"
          onChange={() => sortFrom('more')}
        />{' '}
        From More to Less
      </form>
    </div>
  )
}
