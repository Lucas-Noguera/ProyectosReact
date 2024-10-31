import {test, expect} from 'vitest'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from './src/App'

test('My app works as expected', async() => {
  const app = render(<App />)
  const user = userEvent.setup()
  const textAreaFrom = app.getByPlaceholderText('Introducir texto')

  await user.type(textAreaFrom, 'Hola mundo')
  const result = await app.findByDisplayValue('Hola mundo')

  expect(result).toBeTruthy()
}, 10000)
