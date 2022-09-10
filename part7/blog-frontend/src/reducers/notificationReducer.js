import { createSlice } from '@reduxjs/toolkit'

const initialState = { text: '', style: '', timeoutId: null }

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification(state, action) {
      if (state.timeoutId) {
        clearTimeout(state.timeoutId)
      }
      return {
        text: action.payload.text,
        style: action.payload.style,
        timeoutId: action.payload.timeoutId,
      }
    },
    clearNotification() {
      return initialState
    },
  },
})

export const { setNotification, clearNotification } = notificationSlice.actions

export const setNotificationWithTimeout = (
  text,
  style = 'error',
  timeout = 5000
) => {
  return async (dispatch) => {
    const timeoutId = setTimeout(() => {
      dispatch(clearNotification())
    }, timeout)
    dispatch(setNotification({ text, style, timeoutId }))
  }
}

export default notificationSlice.reducer
