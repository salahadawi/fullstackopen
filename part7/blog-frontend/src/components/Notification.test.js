import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { screen, waitForElementToBeRemoved } from '@testing-library/react'

import Notification from './Notification'
import { renderWithProviders } from '../tests/test_utils'
import { setupStore } from '../store'
import { setNotificationWithTimeout } from '../reducers/notificationReducer'

describe('<Notification />', () => {
  test('renders content', () => {
    const initialState = {
      text: 'Test message',
      style: 'error',
      timeoutId: null,
    }

    renderWithProviders(<Notification />, {
      preloadedState: { notification: initialState },
    })

    expect(
      screen.getByText(initialState.text, { exact: false })
    ).toBeInTheDocument()
  })

  test('does not render content', () => {
    const message = null

    const NotificationElement = renderWithProviders(<Notification />)

    expect(NotificationElement.container).toBeEmptyDOMElement()
  })

  test('notification is displayed for specified time', async () => {
    const text = 'Test message'
    const store = setupStore()
    store.dispatch(setNotificationWithTimeout('Test message', 'error', 100))
    const NotificationElement = renderWithProviders(<Notification />, {
      store,
    })

    expect(screen.getByText(text, { exact: false })).toBeInTheDocument()
    await waitForElementToBeRemoved(() =>
      screen.queryByText('Test message', { exact: false })
    )
    expect(NotificationElement.container).toBeEmptyDOMElement()
  })
})
