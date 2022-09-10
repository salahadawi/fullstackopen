import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

export const setupStore = (preloadedState) => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
    },
    preloadedState,
  })
}

const store = setupStore()

export default store
