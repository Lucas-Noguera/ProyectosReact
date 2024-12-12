import { Card, List, ListItem, ListItemButton , ListItemText, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from './types'

const Question = ({info}: {info: QuestionType}) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)
  return (
    <Card variant='outlined' sx={{bgcolor: '#222', p: 2,  textAlign: 'left', marginTop: 4}}>
      <Typography variant='h5'>{info.question}</Typography>

      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{bgcolor: '#333'}} disablePadding>
        {info?.answers?.map((answer, index) => (
          <ListItem key={index} sx={{bgcolor: '#444'}} disablePadding divider>
            <ListItemButton>
              <ListItemText primary={answer} sx={{textAlign: 'center'}} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <Question info={questionInfo} />
  )
  
}