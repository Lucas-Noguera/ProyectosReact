import './App.css'
import { Container, Stack, Typography} from '@mui/material'
import { JavaScriptLogo } from './JavasciptLogo'
import { Start } from './Start'

function App() {

  return (
    <main>
      <Container>
        <Stack direction='row' alignItems='center' justifyContent='center' gap={2}>
          <JavaScriptLogo />
          <Typography variant='h6' component='h1' >
            <h1>JavaScript Quiz</h1>
          </Typography>
        </Stack>
        <Start />
      </Container>
    </main>
  )
} 

export default App
