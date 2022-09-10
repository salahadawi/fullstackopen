import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import userReducer from './reducers/userReducer'

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
      blogs: blogReducer,
      user: userReducer,
    },
    preloadedState,
  })
}

const store = setupStore()

export default store
