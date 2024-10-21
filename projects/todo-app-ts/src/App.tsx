import { useState } from 'react'
import Todos from './components/Todos'
import { FiltersValue, TodoId, TodoTitle, Todo as TodoType } from './types'
import { Footer } from './components/Footer'
import { TODO_FILTERS } from './const'
import { Header } from './components/Header'

const mockTodos = [
  {
    id: 1,
    title: 'Sacar la basura',
    completed: false
  },
  {
    id: 2,
    title: 'Estudiar para el examen',
    completed: false
  },
  {
    id: 3,
    title: 'Limpiar la cocina',
    completed: false
  }
]

const App = (): JSX.Element => {
  const [todos, setTodos] = useState(mockTodos)
  const [filterSelected, setFilterSelected] = useState<FiltersValue>(TODO_FILTERS.ALL)

  const handleRemove = ({ id }:  TodoId) => {
    const newTodo = todos.filter(todo => todo.id !== id) 
    setTodos(newTodo)
  }

  const handleCompleted  = ({id, completed}: Pick<TodoType, 'id' | 'completed'>): void => {
    const newTodos = todos.map(todo => {
      if(todo.id === id){
        return {
          ...todo,
          completed
        }
      }
      return todo
    })
    setTodos(newTodos)
  }

  const handleFilterSelected = (filter: FiltersValue): void => {
    setFilterSelected(filter)
  }

  const handleRemoveAllCompleted = (): void => {
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  const activeCount = todos.filter(todo => !todo.completed).length
  const CompletedCount = todos.length - activeCount
  const filteredTodos = todos.filter(todo => {
    if(filterSelected === TODO_FILTERS.ALL) return true
    if(filterSelected === TODO_FILTERS.ACTIVE)  return !todo.completed
    return todo.completed
  })

  const handleAddTodo = ({title}: TodoTitle): void => {
    const newTodo = {
      id: Math.floor(Math.random() * 10000), // Genera un `id` aleatorio
      title,
      completed: false
    }
    const newTodos = ([...todos, newTodo])
    setTodos(newTodos)
  }

  return (
    <div className='todoapp'>
      <Header onAddTodo={handleAddTodo} />
      <Todos 
        onToggleCompletedTodo={handleCompleted}
        onRemoveToDo={handleRemove}
        todos={filteredTodos
        }
      />
      <Footer 
        activeCount={activeCount}
        completedCount={CompletedCount}
        FiltersSelected={filterSelected}
        onClearCompleted={handleRemoveAllCompleted}
        handleFilterOnChange={handleFilterSelected}

      />
    </div>
  )
}

export default App
