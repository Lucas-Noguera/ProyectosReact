import { useCuestionsData } from './hooks/useQuestionsData'

export const Footer = () => {
  const { correctQuestions, incorrectQuestions, unansweredQuestions } = useCuestionsData()

  return (
    <footer style={{ marginTop: '16px' }}>
      <strong>{`✔ ${correctQuestions} correctas - ✖ 
      ${incorrectQuestions} incorrectas - ❓ 
      ${unansweredQuestions} sin respuesta`}
      </strong>
    </footer>
  )
}