import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import { setNotification } from './notificationReducer'

const loggedUserReducer = createSlice({
  name: '@users',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    removeUser(state, action) {
      return null
    }
  }
})

export const { setUser, removeUser } = loggedUserReducer.actions
export const addUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login(username, password)
      window.localStorage.setItem('loggedCredentiales', JSON.stringify(user))
      dispatch(setUser(user))
    } catch (e) {
      dispatch(setNotification('Wrong Credentials', 5))
    }
  }
}
export default loggedUserReducer.reducer
