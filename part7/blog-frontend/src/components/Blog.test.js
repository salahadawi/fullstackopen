import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, waitFor } from '@testing-library/react'
import Blog from './Blog'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../tests/test_utils'
import { MemoryRouter, Route, Routes } from 'react-router-dom'

const blog = {
  title: 'Test blog',
  author: 'Test author',
  url: 'url.com',
  likes: 0,
  id: '1',
  user: {
    name: 'Test user',
    username: 'testuser',
    id: '5e8f8f8f8f8f8f8f8f8f8f8f',
  },
}

const RenderWithRouter = ({ children }) => (
  <MemoryRouter initialEntries={['/blogs/1']}>
    <Routes>
      <Route path="/blogs/:id" element={children} />
    </Routes>
  </MemoryRouter>
)

describe('<Blog />', () => {
  beforeEach(() => {
    renderWithProviders(
      <RenderWithRouter>
        <Blog />
      </RenderWithRouter>,
      { preloadedState: { blogs: [blog] } }
    )
  })
  test('renders content', () => {
    expect(screen.getByText(blog.title, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(blog.author, { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(blog.url, { exact: false })).toBeInTheDocument()
    expect(
      screen.queryByText(`${blog.likes} likes`, { exact: false })
    ).toBeInTheDocument()
    expect(
      screen.queryByText(blog.user.name, { exact: false })
    ).toBeInTheDocument()
  })
})
