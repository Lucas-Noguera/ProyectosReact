import {TodoId, type Todo as TodoType} from '../types'

interface Props extends TodoType {
    onRemoveToDo: ({id}: TodoId) => void
    onToggleCompletedTodo: ({id, completed}: Pick<TodoType, 'id' | 'completed'>) => void
}

export const Todo: React.FC<Props> = ({ id, title, completed, onRemoveToDo, onToggleCompletedTodo }) => {
  const handleOnChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>): void => {
    onToggleCompletedTodo({
      id,
      completed: event.target.checked
    })
  }
  
  return (
    <div className="todo">
      <input type="checkbox"
        className="toggle"
        checked={completed}
        onChange={handleOnChangeCheckBox}
      />
      <label htmlFor="">{title}</label>
      <button
        className='destroy'
        onClick={() => {
          onRemoveToDo({id})
        }}
      ></button>
    </div>
  )
}