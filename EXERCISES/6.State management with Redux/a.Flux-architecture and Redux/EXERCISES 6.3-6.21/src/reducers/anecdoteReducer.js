import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: '@anecdotes',
  initialState: [],
  reducers: {
    setAnecdotes(state, action) {
      return action.payload
    },
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    replaceAnecdote(state, action) {
      const { payload: newAnecdote } = action
      const { id } = newAnecdote
      return state.map((a) => {
        if (a.id === id) {
          a = newAnecdote
          return a
        }
        return a
      })
    }
  }
})

export const { setAnecdotes, appendAnecdote, replaceAnecdote } =
  anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = {
      content,
      votes: 0
    }

    const newAnecdote = await anecdoteService.create(anecdote)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const addVote = (anecdote) => {
  return async (dispatch) => {
    const votedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    const modifiyedAnecdote = await anecdoteService.modify(votedAnecdote)
    dispatch(replaceAnecdote(modifiyedAnecdote))
  }
}

export default anecdoteSlice.reducer

// const anecdotesAtStart = [
//   'If it hurts, do it more often',
//   'Adding manpower to a late software project makes it later!',
//   'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
//   'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
//   'Premature optimization is the root of all evil.',
//   'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
// ]

// const getId = () => (100000 * Math.random()).toFixed(0)

// const asObject = (anecdote) => {
//   return {
//     content: anecdote,
//     id: getId(),
//     votes: 0
//   }
// }

// const initialState = anecdotesAtStart.map(asObject)

// const reducer = (state = initialState, action) => {
//   console.log('state', state)
//   console.log('action', action)
//   if (action.type === '@anecdotes/vote') {
//     const { payload: id } = action
//     return state.map((a) => {
//       if (a.id === id) return { ...a, votes: a.votes + 1 }
//       return a
//     })
//   }
//   if (action.type === '@anecdotes/newAnecdote') {
//     const { payload: content } = action
//     const newAnecdote = asObject(content)
//     return [...state, newAnecdote]
//   }

//   return state
// }

// export const addVote = (id) => {
//   return {
//     type: '@anecdotes/vote',
//     payload: id
//   }
// }

// export const addAnecdote = (content) => {
//   return {
//     type: '@anecdotes/newAnecdote',
//     payload: content
//   }
// }

// export default reducer
