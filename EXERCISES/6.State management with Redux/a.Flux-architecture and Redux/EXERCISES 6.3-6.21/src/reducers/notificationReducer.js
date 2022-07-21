import { createSlice } from '@reduxjs/toolkit'

const notificationReducer = createSlice({
  name: '@notification',
  initialState: null,
  reducers: {
    setMessage(state, action) {
      if (!action.payload) return null
      return action.payload
    },
    removeMessage(state, action) {
      return null
    }
  }
})

export const { setMessage, removeMessage } = notificationReducer.actions

export const setNotification = (message, time = 5) => {
  time *= 1000
  return (dispatch) => {
    dispatch(setMessage(message))
    setTimeout(() => {
      dispatch(removeMessage())
    }, time)
  }
}
export default notificationReducer.reducer
