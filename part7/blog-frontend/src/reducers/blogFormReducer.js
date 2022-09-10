import { createSlice } from '@reduxjs/toolkit'

const blogFormSlice = createSlice({
  name: 'blogForm',
  initialState: false,
  reducers: {
    toggleVisibility(state) {
      return !state
    },
    setVisibility(state, action) {
      return action.payload
    },
  },
})

export const { toggleVisibility, setVisibility } = blogFormSlice.actions

export default blogFormSlice.reducer
