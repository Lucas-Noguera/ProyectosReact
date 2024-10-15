import { useState } from 'react'
import Todos from './components/Todos'

const mockTodos = [
  {
    id: 1,
    title: 'Task 1',
    completed: false
  },
  {
    id: 2,
    title: 'Task 2',
    completed: true
  },
  {
    id: 3,
    title: 'Task 3',
    completed: false
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)

  return (
    <Todos todos={todos} />
  )
}

export default App
