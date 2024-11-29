import { useEffect, useMemo, useRef, useState } from 'react'
import './App.css'
import {SortBy, type User} from './types.d'
import { UserList } from './components/UserList'

const fetchUsers = async (page: number) => {
  return await fetch(`https://randomuser.me/api?results=10&seed=lucas&page=${page}`)
    .then(async res => {
      if (!res.ok) throw new Error('Error al obtener usuarios')
      return  await res.json()
    })
    .then(res => res.results)
}

function App() {

  const [users, setUsers] = useState<User[]>([])
  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const originalUsers = useRef<User[]>([])
  const [filterCountry, setFilterCountry] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
 
  const toggleColors = () => setShowColors(!showColors)
  
  const toggleSortByCountry = () => {
    const newSortingValue =  sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE
    setSorting(newSortingValue)
  }

  const handleDelete = (email: string) => {
    const filteredUsers = users.filter(user => user.email !== email)
    setUsers(filteredUsers)
  }

  const handleReset = () => {
    setUsers(originalUsers.current)
  }

  const handleChangeSort = (sort: SortBy) => {
    setSorting(sort)
  }

  useEffect(() => {
    setLoading(true)
    setError(null)
    fetchUsers(currentPage)
      .then(users => {
        console.log(users)
        setUsers(prevUsers => {
          const newUsers = prevUsers.concat(users)
          originalUsers.current = newUsers
          return newUsers
        })
      })
      .catch(err =>{
        setError(err) 
        console.error(err)})
      .finally(() => {
        setLoading(false)
      })
  }, [currentPage])

  const filteredUsers = useMemo(() => {
    return typeof filterCountry === 'string' && filterCountry.length > 0 ? users.filter(user => {
      return user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
    }): users 
  }, [users, filterCountry])

  const sortedUsers = useMemo(() => {
    if(sorting === SortBy.NONE) return filteredUsers

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const compareProperties: Record<string, (user: User) => any> = {
      [SortBy.COUNTRY]: user => user.location.country,
      [SortBy.NAME]: user => user.name.first,
      [SortBy.LAST]: user => user.name.last,
    }

    return filteredUsers.toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])
  
  return (
    <>
      <div className='App'>
        <h1>Prueba técnica</h1>
        <header>
          <button onClick={toggleColors}>
            Cambiar colores
          </button>

          <button onClick={toggleSortByCountry}>
            {sorting === SortBy.COUNTRY ? 'No ordernar por país' : 'Ordenar por país'}
          </button>

          <button onClick={handleReset}>
            Resetear
          </button>

          <input placeholder='Filtrar por país'
            onChange={(e) => {
              setFilterCountry(e.target.value)
            }}
          />

        </header>
        <main>
          {users.length > 0 && 
          <UserList changeSorting={handleChangeSort} deleteUser={handleDelete} users={sortedUsers} showColors={showColors} />}
          {loading && <strong>Cargando...</strong>}
          {error && <p>Error: {error}</p>}
          {!error && users.length === 0 && <p>No hay usuarios</p>}

          {!loading && !error && <button onClick={() => setCurrentPage(currentPage + 1)}>Cargar mas resultados</button>}
        </main>
      </div>
    </>
  )
}

export default App
