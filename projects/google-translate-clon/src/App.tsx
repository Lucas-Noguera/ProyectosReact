import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { useStore } from './hooks/useStore'

function App() {
  const {fromLenguage, setFromLanguage} = useStore()
  
  return (
    <div className="App">
      <h1>Google translate</h1>
      <button
        onClick={() => {
          setFromLanguage('en')
        }}
      ></button>
      {fromLenguage}
    </div>
    
  )
}

export default App
