import {create} from 'zustand'
import { Question } from '../types'

interface State {
    questions: Question[]
    currentQuestion: number
    fetchQuestions: (limit: number) => Promise<void>
    selectAnswer: (questinId: number, answerIndex: number) => void
}

export const useQuestionsStore = create<State>((set, get) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async (limit: number) => {
    const res = await fetch('http://localhost:5173/data.json')
    const json = await res.json()
    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
    set({ questions })
  },

  selectAnswer: (questionId: number, answerIndex: number) => {
    const {questions} = get() 

    const newQuestions = structuredClone(questions)
    const questionIndex = newQuestions.findIndex(q => q.id === questionId)
    const questionInfo  = newQuestions[questionIndex]
    const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
    
    newQuestions[questionIndex] = {
      ...questionInfo,
      isCorrectUserAnswer,
      userSelectedAnswer: answerIndex
    }

    set({ questions: newQuestions })
  }
}))