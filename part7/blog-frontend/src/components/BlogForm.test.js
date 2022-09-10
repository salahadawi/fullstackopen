import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import BlogForm from './BlogForm'
import Display from './Display'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../tests/test_utils'

describe('<BlogForm />', () => {
  test.skip('updates parent state and calls onSubmit', async () => {
    // const mockHandler = jest.fn()
    const user = userEvent.setup()

    renderWithProviders(<Display.LoggedInDisplay />, {
      preloadedState: {
        user: {
          username: 'testuser',
          name: 'Test User',
          token: '1234567890',
        },
        blogForm: true,
      },
    })

    // await user.click(screen.getByText('new blog'))

    let [title, author, url] = screen.getAllByRole('textbox')
    const form = screen.getByText('create')
    await user.type(title, 'Test blog')
    await user.type(author, 'Test author')
    await user.type(url, 'url.com')
    await user.click(form)

    // expect(mockHandler.mock.calls.length).toBe(1)
    // expect(mockHandler.mock.calls[0][0].title).toEqual('Test blog')
    // expect(mockHandler.mock.calls[0][0]).toEqual({
    //   title: 'Test blog',
    //   author: 'Test author',
    //   url: 'url.com',
    // })
    // expect(('Test blog', { exact: false })).toBeInTheDocument()

    // renderWithProviders(<Display.BlogDisplay />)

    expect(screen.getByText('Test blog', { exact: false })).toBeInTheDocument()
  })
})
