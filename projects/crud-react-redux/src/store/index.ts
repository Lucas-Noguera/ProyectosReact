import { configureStore, type Middleware, type Action, type UnknownAction } from '@reduxjs/toolkit'
import { toast } from 'sonner'
import usersReducer, { rollbackUser } from './users/slice'

const persistanceLocalStorageMiddleware: Middleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
}

const isActionWithPayload = (action: unknown): action is { type: string; payload: string } => {
  return typeof action === 'object' && action !== null && 'type' in action && 'payload' in action
}

const syncWithDatabaseMiddleware: Middleware = store => next => (action) => {
  if (isActionWithPayload(action)) {
    const { type, payload } = action
    console.log(type, payload)

    const previousState = store.getState() as RootState
    next(action)

    if (type === 'users/deleteUserById') {
      const userIdToRemove = payload
      const userToRemove = previousState.users.find(user => user.id === userIdToRemove)

      fetch(`https://jsonplaceholder.typicode.com/users/${userIdToRemove}`, {
        method: 'DELETE'
      })
        .then(res => {
          if (res.ok) {
            toast.success(`Usuario ${payload} eliminado correctamente`)
            return
          }
          throw new Error('Error al eliminar el usuario')
        })
        .catch(err => {
          toast.error(`Error deleting user ${userIdToRemove}`)
          if (userToRemove) store.dispatch(rollbackUser(userToRemove))
          console.log(err)
        })
    }
  } else {
    next(action)
  }
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) => {

    return getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware)
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;