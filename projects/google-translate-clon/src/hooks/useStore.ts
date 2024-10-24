import {Action, FromLanguage, Language, type State} from '../types.d'
import { useReducer } from 'react'

const initialState = {
  fromLenguage: 'auto',
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
}
  
function reducer (state: State, action: Action){
  const { type } = action
  if(type === 'INTERCHANGE_LENGUAGE'){
    return {
      ...state,
      fromLenguage: state.toLanguage,
      toLanguage: state.fromLenguage,
    }
  }
  
  if(type === 'SET_FROM_LENGUAGE'){
    return {
      ...state,
      fromLenguage: action.payload,
    }
  }
  
  if(type === 'SET_TO_LENGUAGE'){
    return {
      ...state,
      toLanguage: action.payload,
    }
  }
  
  if(type === 'SET_FROM_TEXT'){
    return {
      ...state,
      loading: true,
      fromText: action.payload,
      result: '',
    }
  }
  
  if(type === 'SET_RESULT'){
    return {
      ...state,
      loading: false,
      result: action.payload,
    }
  }
  
  return state
}

export function useStore  () {
  const [{
    fromLenguage,
    toLanguage,
    fromText,
    result,
    loading
  }, dispatch] = useReducer(reducer, initialState)

  const interChangeLanguages = () => {
    dispatch({type: 'INTERCHANGE_LENGUAGE'})
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({type: 'SET_FROM_LENGUAGE', payload})
  }

  const setToLanguage = (payload: Language) => {
    dispatch({type: 'SET_TO_LENGUAGE', payload})
  }

  const setFromText = (payload: Language) => {
    dispatch({type: 'SET_FROM_TEXT', payload})
  }

  const setResult = (payload: Language) => {
    dispatch({type: 'SET_RESULT', payload})
  } 

  return {
    fromLenguage,
    toLanguage,
    fromText,
    result,
    loading,
    interChangeLanguages,
    setFromLanguage,
    setToLanguage,
    setFromText,
    setResult
  }
} 