import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import { JavaScriptLogo } from './JavasciptLogo'
import { Start } from './Start'
import { useQuestionsStore } from './store/questions'

function App() {
  const questions = useQuestionsStore((state) => state.questions)
  console.log(questions)

  return (
    <main>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='center' gap={2}>
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quiz
          </Typography>
        </Stack>
        <Start />
      </Container>
    </main>
  )
}

export default App