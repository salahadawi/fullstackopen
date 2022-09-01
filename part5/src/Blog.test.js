import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './components/Blog'

describe('<Blog />', () => {
  test('renders content', () => {
    const blog = {
      title: 'Test blog',
      author: 'Test author',
      url: 'url.com',
      likes: 0,
      user: {
        name: 'Test user',
        username: 'testuser',
        id: '5e8f8f8f8f8f8f8f8f8f8f8f'
      }
    }

    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler}/>)

    expect(screen.getByText(blog.title, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(blog.author, { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(blog.url, { exact: false })).not.toBeInTheDocument()
    expect(screen.queryByText(`${blog.likes} likes`, { exact: false })).not.toBeInTheDocument()
    expect(screen.queryByText(blog.user.name, { exact: false })).not.toBeInTheDocument()
  })

})
