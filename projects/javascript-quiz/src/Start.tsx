import { Button } from '@mui/material'
import { useQuestionsStore } from './store/questions'

export const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(5)
  }
  return (
    <Button onClick={handleClick} variant="contained">
      Empezar
    </Button>
  )
}