import {createSlice, type PayloadAction} from '@reduxjs/toolkit'

const DEFAULT_STATE = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@doe.com',
    github: 'johndoe'
  },
  {
    id: '2',
    name: 'Jane Doe',
    email: 'jane@doe.com',
    github: 'janedoe'
  },
  {
    id: '3',
    name: 'Bob Smith',
    email: 'bob@smith.com',
    github: 'bobsmith'
  }
]

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
    id: UserId
}

const initialState: UserWithId[] = (() => {
  const persistedStage = localStorage.getItem('__redux__state__')
  if(persistedStage){
    return JSON.parse(persistedStage).users
  }
  return DEFAULT_STATE
})()
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      return [...state, {id, ...action.payload}]
    },
    deleteUserById: (state, action: PayloadAction<UserId>) => {    
      const id = action.payload
      return state.filter(user => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.find(user => user.id === action.payload.id)
      if(!isUserAlreadyDefined){
        return [...state, action.payload]
      }
      
    },

  },
})

export default usersSlice.reducer

export const { deleteUserById, addNewUser, rollbackUser } = usersSlice.actions