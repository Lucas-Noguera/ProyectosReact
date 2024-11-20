import { configureStore } from '@reduxjs/toolkit'
import usersReducers from './users/slice'

const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem('__redux__state__', JSON.stringify(store.getState()))
  console.log(localStorage.getItem('__redux__state__'))
}

export const store = configureStore({
  reducer: {
    users: usersReducers,
  },
  middleware: (getDefaultMiddleware) => {

    return getDefaultMiddleware().concat(persistanceLocalStorageMiddleware)
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch