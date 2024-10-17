import { TodoId, type ListOfTodo, Todo as TodoType } from '../types'
import { Todo } from './Todo'

interface Props {
  todos: ListOfTodo
  onToggleCompletedTodo: ({ id, completed }: Pick<TodoType, 'id' | 'completed'>) => void
  onRemoveToDo: ({ id }: TodoId) => void
}

export const Todos: React.FC<Props> = ({ todos, onRemoveToDo, onToggleCompletedTodo }) => {
  return (
    <ul className='todo-list'>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`${todo.completed ? 'completed' : ''}`}
        >
          <Todo
            id={todo.id}
            title={todo.title}
            completed={todo.completed}
            onToggleCompletedTodo={onToggleCompletedTodo} 
            onRemoveToDo={onRemoveToDo}
          />
        </li>
      ))}
    </ul>
  )
}

export default Todos
