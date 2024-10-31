import { AUTO_LANGUAGE } from '../constants'
import { Action, FromLanguage, Language, State } from '../types'
import { useReducer } from 'react'

const initialState: State = {
  fromLenguage: AUTO_LANGUAGE,
  toLanguage: 'en',
  fromText: '',
  result: '',
  loading: false,
}

function reducer(state: State, action: Action): State {
  const { type } = action

  if (type === 'INTERCHANGE_LENGUAGE') {
    if (state.fromLenguage === AUTO_LANGUAGE) return state
    const loading = state.fromText !== ''

    return {
      ...state,
      loading,
      result: '',
      fromLenguage: state.toLanguage,
      toLanguage: state.fromLenguage,
    }
  }

  if (type === 'SET_FROM_LENGUAGE') {
    if (state.fromLenguage === action.payload) return state
    const loading = state.fromText !== ''

    return {
      ...state,
      fromLenguage: action.payload,
      result: '',
      loading,
    }
  }

  if (type === 'SET_TO_LENGUAGE') {
    if (state.fromLenguage === action.payload) return state
    const loading = state.fromText !== ''
    return {
      ...state,
      toLanguage: action.payload,
      result: '',
      loading,
    }
  }

  if (type === 'SET_FROM_TEXT') {
    const loading = action.payload !== ''
    return {
      ...state,
      loading,
      fromText: action.payload,
      result: '',
    }
  }

  if (type === 'SET_RESULT') {
    return {
      ...state,
      loading: false,
      result: action.payload,
    }
  }

  return state // Default case
}

export function useStore() {
  const [
    { fromLenguage, toLanguage, fromText, result, loading },
    dispatch,
  ] = useReducer(reducer, initialState)

  const interChangeLanguages = () => {
    dispatch({ type: 'INTERCHANGE_LENGUAGE' })
  }

  const setFromLanguage = (payload: FromLanguage) => {
    dispatch({ type: 'SET_FROM_LENGUAGE', payload })
  }

  const setToLanguage = (payload: Language) => {
    dispatch({ type: 'SET_TO_LENGUAGE', payload })
  }

  const setFromText = (payload: string) => {
    dispatch({ type: 'SET_FROM_TEXT', payload })
  }

  const setResult = (payload: string) => {
    dispatch({ type: 'SET_RESULT', payload })
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
    setResult,
  }
}
