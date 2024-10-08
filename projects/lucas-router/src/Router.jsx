import { EVENTS } from './consts'
import { useState, useEffect, Children } from 'react'
import { match } from 'path-to-regexp'
import { getCurrentPath } from './ultis'

export function Router ({ children, routes = [], defaultComponent: DefaultComponents = () => <h1>404</h1> }) {
  const [CurrentPath, setPath] = useState(getCurrentPath())

  useEffect(() => {
    const onLocationChange = () => {
      setPath(getCurrentPath())
    }

    window.addEventListener(EVENTS.PUSHSTATE, onLocationChange)
    window.addEventListener(EVENTS.POPSTATE, onLocationChange)

    return () => {
      window.removeEventListener(EVENTS.PUSHSTATE, onLocationChange)
      window.removeEventListener(EVENTS.POPSTATE, onLocationChange)
    }
  }, [])

  let routeParams = {}

  const routesFromChildrens = Children.map(children, ({ props, type }) => {
    const { name } = type
    const isRoute = name === 'Route'

    if (!isRoute) return null

    return props
  })

  const routesToUse = routes.concat(routesFromChildrens).filter(Boolean)

  const Page = routesToUse.find(({ path }) => {
    if (path === CurrentPath) return true

    const matchURL = match(path, { decode: decodeURIComponent })
    const matched = matchURL(CurrentPath)
    if (!matched) return false

    routeParams = matched.params
    return true
  })?.Component

  return Page
    ? <Page routeParams={routeParams} />
    : <DefaultComponents routeParams={routeParams} />
}
