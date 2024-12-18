import { create } from 'zustand'
import { persist, PersistOptions } from 'zustand/middleware'
import { Question } from '../types'
import confetti from 'canvas-confetti'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
}

type MyPersist = PersistOptions<State>

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => ({
      questions: [],
      currentQuestion: 0,

      fetchQuestions: async (limit: number) => {
        const res = await fetch('http://localhost:5173/data.json')
        const json = await res.json()

        const questions = json
          .sort(() => Math.random() - 0.5)
          .slice(0, limit)
          .map((q: Question) => ({
            ...q,
            userSelectedAnswer: null,
            isCorrectUserAnswer: null,
          }))

        set({ questions })
      },

      selectAnswer: (questionId: number, answerIndex: number) => {
        const { questions } = get()
        const newQuestions = structuredClone(questions)

        const questionIndex = newQuestions.findIndex((q) => q.id === questionId)
        if (questionIndex === -1) return

        const questionInfo = newQuestions[questionIndex]
        const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
        if (isCorrectUserAnswer) confetti()

        newQuestions[questionIndex] = {
          ...questionInfo,
          isCorrectUserAnswer,
          userSelectedAnswer: answerIndex,
        }

        set({ questions: newQuestions })
      },

      goNextQuestion: () => {
        const { currentQuestion, questions } = get()
        if (currentQuestion + 1 < questions.length) {
          set({ currentQuestion: currentQuestion + 1 })
        }
      },

      goPreviousQuestion: () => {
        const { currentQuestion } = get()
        if (currentQuestion > 0) {
          set({ currentQuestion: currentQuestion - 1 })
        }
      },

      reset: () => {
        set({currentQuestion: 0, questions: []})
      }
    }),
    {
      name: 'questions', // Clave de almacenamiento en localStorage
    } as MyPersist
  )
)
