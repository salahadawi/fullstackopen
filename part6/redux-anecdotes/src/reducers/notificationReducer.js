import { createSlice } from '@reduxjs/toolkit'

const initialState = { text: '', timeoutId: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return { text: action.payload.text, timeoutId: action.payload.timeoutId }
    },
    clearNotification(state, action) {
      return initialState
    }
  }
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (text, timeout) => {
  return async dispatch => {
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
    dispatch(setNotification({ text: text, timeoutId }))
  }
}

export default notificationSlice.reducer