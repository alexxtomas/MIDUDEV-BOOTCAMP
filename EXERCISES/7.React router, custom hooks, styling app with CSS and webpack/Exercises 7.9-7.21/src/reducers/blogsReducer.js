import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogReducer = createSlice({
  name: '@blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
    modifyBlog(state, action) {
      const { payload: modifiedBlog } = action
      return state.map((blog) => {
        if (blog.id === modifiedBlog.id) return modifiedBlog
        return blog
      })
    },
    discarBlog(state, action) {
      const { payload: id } = action
      const newState = state.filter((blog) => blog.id !== id)
      return newState
    }
  }
})

export const { setBlogs, appendBlog, modifyBlog, discarBlog } =
  blogReducer.actions
export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blog, { token }) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(blog, { token })
    dispatch(appendBlog(newBlog))
  }
}

export const addLike = (newBlog, { token }) => {
  return async (dispatch) => {
    const modifiedBlog = await blogService.modify(newBlog, { token })
    dispatch(modifyBlog(modifiedBlog))
  }
}

export const removeBlog = (id, { token }) => {
  console.log(token)
  return async (dispatch) => {
    await blogService.remove(id, { token })
    dispatch(discarBlog(id))
  }
}

export const addComment = (id, comment, token) => {
  console.log(token)
  return async (dispatch) => {
    const modifiedBlog = await blogService.addComent(id, { comment }, token)
    dispatch(modifyBlog(modifiedBlog))
  }
}
export default blogReducer.reducer
