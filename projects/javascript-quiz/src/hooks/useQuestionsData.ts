import { useQuestionsStore } from '../store/questions'

export const useCuestionsData = () => {
        
  const questions = useQuestionsStore((state) => state.questions)

  let correctQuestions = 0
  let incorrectQuestions = 0
  let unansweredQuestions = 0

  questions.forEach((question) => {
    const { correctAnswer, userSelectedAnswer } = question
    if(userSelectedAnswer === null) unansweredQuestions++
    else if(correctAnswer === userSelectedAnswer) correctQuestions++
    else incorrectQuestions++
   
  })
  return {
    correctQuestions,
    incorrectQuestions,
    unansweredQuestions
  }
}
