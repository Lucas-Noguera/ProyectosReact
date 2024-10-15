import  { type ListOfTodo } from '../types'

interface Props {
  todos: ListOfTodo
}

export const Todos: React.FC<Props> = ({ todos }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          {todo.title}
        </li>
      ))}
    </ul>
  )
}

export default Todos
