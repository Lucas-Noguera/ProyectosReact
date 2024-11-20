import { UserId, User, deleteUserById, addNewUser } from '../store/users/slice'
import { useAppDispatch } from './store'

export const useUsersActions = () => {
  const dispatch = useAppDispatch()

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }
  
  const removeUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { removeUser, addUser }
}