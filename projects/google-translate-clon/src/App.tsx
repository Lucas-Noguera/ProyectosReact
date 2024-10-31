import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE } from './constants'
import { ArrowIcon } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { Textarea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'

function App() {
  const {
    loading, 
    fromLenguage, 
    fromText, 
    result, 
    setFromLanguage, 
    toLanguage, 
    setToLanguage, 
    interChangeLanguages, 
    setFromText, 
    setResult} = useStore()

  useEffect(() => {
    if (fromText === null) return
    translate({ FromLanguage: fromLenguage, toLanguage, text: fromText })
      .then(result => {
        if(result == null) return
        setResult(result)
      })
      .catch(() => {setResult('Error')})
  }, [fromText, fromLenguage, toLanguage, setResult])
  
  return (

    <Container fluid>
      <h2>Google translate</h2>

      <Row>

        <Col>
          <Stack gap={2}>
            <LanguageSelector onChange={setFromLanguage} 
              value={fromLenguage}
              type={SectionType.From}
            />
            <Textarea
              loading={loading}
              type={SectionType.From}
              value={fromText}
              onChange={setFromText}

            />
          </Stack>
        </Col>

        <Col xs='auto'>
          <Button
            variant="link"
            onClick={interChangeLanguages}
            disabled={fromLenguage === AUTO_LANGUAGE}
          >
            <ArrowIcon />
          </Button>
        </Col>

        <Col>
          <Stack gap={2}>
            <LanguageSelector onChange={setToLanguage} 
              value={toLanguage}
              type={SectionType.To}
            />
            <Textarea
              loading={loading}
              type={SectionType.To}
              value={result}
              onChange={setResult}
            />       
          </Stack>
        </Col>
      </Row>
    </Container>
    
  )
}

export default App
