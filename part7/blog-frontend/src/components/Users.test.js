import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen } from '@testing-library/react'

import Users from './Users'
import { renderWithProviders } from '../tests/test_utils'

describe('<Users />', () => {
  test('renders content', () => {
    const initialState = {
      users: [
        {
          username: 'testuser',
          name: 'Test User',
          id: '1',
          blogs: [
            {
              title: 'Test blog',
              author: 'Test author',
              url: 'url.com',
              likes: 0,
            },
          ],
        },
      ],
    }

    renderWithProviders(<Users />, { preloadedState: initialState })

    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  test('several users are rendered', () => {
    const initialState = {
      users: [
        {
          username: 'testuser',
          name: 'Test User',
          id: '1',
          blogs: [],
        },
        {
          username: 'testuser2',
          name: 'Test User 2',
          id: '2',
          blogs: [],
        },
      ],
    }

    renderWithProviders(<Users />, { preloadedState: initialState })

    expect(screen.getByText('Users')).toBeInTheDocument()
    expect(screen.getByText('Test User')).toBeInTheDocument()
    expect(screen.getByText('Test User 2')).toBeInTheDocument()
    expect(screen.getAllByText('0')).toHaveLength(2)
  })
})
