import { createSlice } from '@reduxjs/toolkit'
const initialState = 'NONE'

// const sortReducer = (state = initialState, action) => {
//   if (action.type === 'SORT') {
//     return action.payload
//   }

//   return state
// }

// export const sortChanged = (sortBy) => {
//   return {
//     type: 'SORT',
//     payload: sortBy
//   }
// }

// export default sortReducer

const sortReducer = createSlice({
  name: '@sort',
  initialState,
  reducers: {
    setSort(state, action) {
      if (action.payload) return action.payload
      return state
    }
  }
})

export const { setSort } = sortReducer.actions
export default sortReducer.reducer
