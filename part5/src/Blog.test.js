import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Blog from './components/Blog'
import userEvent from '@testing-library/user-event'

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

describe('<Blog />', () => {
  test('renders content', () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler}/>)

    expect(screen.getByText(blog.title, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(blog.author, { exact: false })).toBeInTheDocument()
    expect(screen.queryByText(blog.url, { exact: false })).not.toBeInTheDocument()
    expect(screen.queryByText(`${blog.likes} likes`, { exact: false })).not.toBeInTheDocument()
    expect(screen.queryByText(blog.user.name, { exact: false })).not.toBeInTheDocument()
  })

  test('clicking the button displays url and likes', async () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)

    expect(screen.queryByText(blog.title, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(blog.url, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(`${blog.likes} likes`, { exact: false })).toBeInTheDocument()
    expect(screen.getByText(blog.user.name, { exact: false })).toBeInTheDocument()
  })

  test('clicking like twice calls event handler twice', async () => {
    const mockHandler = jest.fn()

    render(<Blog blog={blog} handleLike={mockHandler} handleRemove={mockHandler}/>)

    const user = userEvent.setup()
    await user.click(screen.getByText('view'))
    const button = screen.getByText('like')
    await user.click(button)
    await user.click(button)

    expect(mockHandler.mock.calls.length).toBe(2)
  })

})
