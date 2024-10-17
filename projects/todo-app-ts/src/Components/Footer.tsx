import { Filters } from './Filters'
import { FiltersValue } from '../types'

interface Props {
  activeCount: number
  completedCount: number
  FiltersSelected: FiltersValue
  onClearCompleted: () => void
  handleFilterOnChange: (filter: FiltersValue) => void
}

export const Footer: React.FC<Props> = ({
  activeCount = 0, 
  completedCount = 0,
  FiltersSelected,
  handleFilterOnChange,
  onClearCompleted
}) => {
  const singleActiveCount = activeCount === 1
  const activeTodoWord = singleActiveCount ? 'tarea' : 'tareas'
  return ( 
    <footer className='footer'>
      <span className='todo-count'>
        <strong>{activeCount}</strong> {activeTodoWord} pendiente{!singleActiveCount && 's'}
      </span>
      <Filters
        FiltersSelected={FiltersSelected}
        onFilterChange={handleFilterOnChange}
      />
      {
        completedCount > 0 && (
          <button
            className='clear-completed'
            onClick={onClearCompleted}
          >
            Borrar tareas completadas
          </button>
        )
      }
    </footer>
  )
}