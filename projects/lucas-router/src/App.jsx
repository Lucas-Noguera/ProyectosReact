import './App.css'
import { EVENTS } from './consts'
import { useState, useEffect } from 'react'

const NAVIGATE_EVENT = 'pushstate'

function navigate (href) {
  window.history.pushState({}, '', href)
  const navigationEvent = new Event(EVENTS.PUSHSTATE)
  window.dispatchEvent(navigationEvent)
}

function HomePage () {
  return (
    <>
      <h1>Home</h1>
      <p>Esta es una pagina de ejemplo para un React Router desde 0</p>
      <button onClick={() => { navigate('/about') }}>Ir al sobre nosotros</button>
    </>
  )
}

function AboutPage () {
  return (
    <>
      <h1>About</h1>
      <div>
        <img src='https://avatars.githubusercontent.com/u/141255262?s=400&u=41fde4ecc1f4d9e90e981501721ae6db2c2eff7c&v=4' alt='Perfil Lucas' />
        <p>Hola, me llamo Lucas Noguera  y Estoy haciendo un clon de React Router</p>
        <button onClick={() => { navigate('/') }}>Ir a la home</button>
      </div>
    </>
  )
}
function App () {
  const [CurrentPath, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener(NAVIGATE_EVENT, onLocationChange)

    return () => {
      window.removeEventListener(NAVIGATE_EVENT, onLocationChange)
    }
  }, [])

  return (
    <main>
      {CurrentPath === '/' && <HomePage />}
      {CurrentPath === '/about' && <AboutPage />}
    </main>
  )
}

export default App
