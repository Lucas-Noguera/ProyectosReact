import { useEffect, useState } from 'react'
import './App.css'
import {type User} from './types'
import { UserList } from './components/UserList'

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sortByCountry, setSortByCountry] = useState(false)
 
  const toggleColors = () => setShowColors(!showColors)

  const toggleSortByCountry = () => {
    setSortByCountry(prevState => !prevState)
  }

  useEffect(() => {
    fetch('https://randomuser.me/api?results=100')
      .then(async res => await res.json())
      .then(res => {
        setUsers(res.results)
      })
      .catch(err => console.log(err))
  }, [])

  const sortedUsers = sortByCountry ? users.toSorted((a, b) => {
    return a.location.country.localeCompare(b.location.country)
  }): users
  
  return (
    <>
      <div className='App'>
        <h1>Prueba técnica</h1>
        <header>
          <button onClick={toggleColors}>
            Cambiar colores
          </button>

          <button onClick={toggleSortByCountry}>
            {sortByCountry ? 'No ordernar por país' : 'Ordenar por país'}
          </button>
        </header>
        <main>
          <UserList showColors={showColors} users={sortedUsers} />
        </main>
      </div>
    </>
  )
}

export default App
