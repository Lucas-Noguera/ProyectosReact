import { EVENTS } from './consts'
import { useState, useEffect } from 'react'

export function Router ({ routes = [], defaultComponent: DefaultComponents = () => <h1>404</h1> }) {
  const [CurrentPath, setPath] = useState(window.location.pathname)

  useEffect(() => {
    const onLocationChange = () => {
      setPath(window.location.pathname)
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  const Page = routes.find(({ path }) => path === CurrentPath)?.Component
  return Page ? <Page /> : <DefaultComponents />
}
