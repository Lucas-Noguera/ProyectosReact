import { lazy, Suspense } from 'react'
import './App.css'
import { Router } from './Router'
import Page404 from './pages/404'
import { SearchPage } from './pages/Search.jsx'
import { Route } from './Route.jsx'

const LazyAboutPage = lazy(() => import('./pages/About'))
const LazyHomePage = lazy(() => import('./pages/Home'))

const routes = [
  {
    path: '/:lang/about',
    Component: LazyAboutPage
  },
  {
    path: '/search/:query',
    Component: SearchPage
  }
]

function App () {
  return (
    <main>
      <Suspense fallback={<h1>Loading...</h1>}>
        <Router routes={routes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>

    </main>
  )
}

export default App
