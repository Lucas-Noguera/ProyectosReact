import { Card, IconButton, List, ListItem, ListItemButton , ListItemText, Stack, Typography } from '@mui/material'
import { useQuestionsStore } from './store/questions'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { type Question as QuestionType } from './types'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  const getBackgroundColor = (index: number) => {
    const { correctAnswer, userSelectedAnswer } = info
    if (userSelectedAnswer === null) return 'transparent'
    if (index === correctAnswer) return 'green'
    if (index === userSelectedAnswer) return 'red'
    return 'transparent'
  }

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: 4 }}
    >
      <Typography variant="h5">{info.question}</Typography>

      <SyntaxHighlighter language="javascript" style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info?.answers?.map((answer, index) => (
          <ListItem key={index} sx={{ bgcolor: '#444' }} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer !== null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(index),
              }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
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
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore((state) => state.goPreviousQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack direction="row" spacing={2} alignContent='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        <Typography variant="h6" component="div">
          {currentQuestion + 1}/{questions.length}
        </Typography>

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>

      </Stack>
      <Question info={questionInfo} />
      <Footer />

    </>   
  )
}
