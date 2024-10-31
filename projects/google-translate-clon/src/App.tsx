import 'bootstrap/dist/css/bootstrap.min.css'
import { Container, Row, Col, Button, Stack } from 'react-bootstrap'
import './App.css'
import { useStore } from './hooks/useStore'
import { AUTO_LANGUAGE, VOICE_FOR_LANGUAGE } from './constants'
import { ArrowIcon, ClipboardIcon, Speaker } from './components/icons'
import { LanguageSelector } from './components/LanguageSelector'
import { SectionType } from './types.d'
import { Textarea } from './components/TextArea'
import { useEffect } from 'react'
import { translate } from './services/translate'
import { useDebounce } from './hooks/useDebounce'

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

  const debounceFromText = useDebounce(fromText, 300)

  useEffect(() => {
    if (debounceFromText === null) return
    translate({ FromLanguage: fromLenguage, toLanguage, text: debounceFromText })
      .then(result => {
        if(result == null) return
        setResult(result)
      })
      .catch(() => {setResult('Error')})
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceFromText, fromLenguage, toLanguage])

  const handleClicpBoard = () => {
    navigator.clipboard.writeText(result).catch(() => {})
  }

  const handleSpeak = () => {
    const utterance = new SpeechSynthesisUtterance(result)
    utterance.lang = VOICE_FOR_LANGUAGE[toLanguage]
    window.speechSynthesis.speak(utterance)
  }
  
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
            <div style={{position: 'relative'}}>
              <Textarea
                loading={loading}
                type={SectionType.To}
                value={result}
                onChange={setResult}
              />
              <div style={{position: 'absolute', left: '0', bottom: '0', display: 'flex'}}>
                <Button 
                  variant="link" 
                  onClick={handleClicpBoard} 
                >
                  <ClipboardIcon />
                </Button>

                <Button 
                  variant="link" 
                  onClick={handleSpeak} 
                >
                  <Speaker />
                </Button>
              </div>
   
            </div>
          </Stack>
        </Col>
      </Row>
    </Container>
    
  )
}

export default App
