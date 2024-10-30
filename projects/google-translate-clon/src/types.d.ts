import {type AUTO_LANGUAGE, type SUPPORTED_LANGUAGES} from './constants'

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage =  typeof AUTO_LANGUAGE
export type FromLanguage = Language | AutoLanguage

export interface State  {
    fromLenguage: FromLanguage
    toLanguage: Language
    fromText: string
    result: string
    loading: boolean
}

export type Action = 
    | {type: 'SET_FROM_LENGUAGE', payload: FromLanguage}
    | {type: 'INTERCHANGE_LENGUAGE'}
    | {type: 'SET_TO_LENGUAGE', payload: Language}
    | {type: 'SET_FROM_TEXT', payload: string}
    | {type: 'SET_RESULT', payload: string}

export enum SectionType {
       From = 'from',
        To ='to'
    }
