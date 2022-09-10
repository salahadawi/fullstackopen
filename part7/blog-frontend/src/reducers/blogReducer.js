import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotificationWithTimeout } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers: {
    updateBlog(state, action) {
      const updatedBlog = action.payload
      return state.map((blog) =>
        blog.id !== updatedBlog.id ? blog : updatedBlog
      )
    },
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return [...state, action.payload]
    },
  },
})

export const { updateBlog, appendBlog, setBlogs } = blogSlice.actions

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const createBlog = (blog) => {
  return async (dispatch, getState) => {
    const newBlog = await blogService.create(blog)
    newBlog.user = getState().user
    dispatch(appendBlog(newBlog))
    dispatch(
      setNotificationWithTimeout(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        'success'
      )
    )
  }
}

export const likeBlog = (id) => {
  return async (dispatch, getState) => {
    const blogs = getState().blogs
    const blogToLike = blogs.find((blog) => blog.id === id)
    const likedBlog = {
      ...blogToLike,
      likes: blogToLike.likes + 1,
    }
    await blogService.update(id, likedBlog)
    dispatch(updateBlog(likedBlog))
  }
}

export const removeBlog = (id) => {
  return async (dispatch, getState) => {
    await blogService.remove(id)
    const blogs = getState().blogs
    dispatch(setBlogs(blogs.filter((blog) => blog.id !== id)))
  }
}

export default blogSlice.reducer
