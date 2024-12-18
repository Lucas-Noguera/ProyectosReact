import { Button } from '@mui/material'
import { useCuestionsData } from './hooks/useQuestionsData'
import { useQuestionsStore } from './store/questions'

export const Footer = () => {
  const { correctQuestions, incorrectQuestions, unansweredQuestions } = useCuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✔ ${correctQuestions} correctas - ✖ 
      ${incorrectQuestions} incorrectas - ❓ 
      ${unansweredQuestions} sin respuesta`}
      </strong>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          Resetear Juego
        </Button>
      </div>
    </footer>
  )
}