import { useMemo, useState } from 'react'
import './App.css'
import { SortBy, type User } from './types.d'
import { UserList } from './components/UserList'
import { useUsers } from './hooks/useUsers'
import { Results } from './components/Results'

function App() {

  const { isLoading, isError,fetchNextPage, refetch, hasNextPage, users} = useUsers()

  const [showColors, setShowColors] = useState(false)
  const [sorting, setSorting] = useState<SortBy>(SortBy.NONE)
  const [filterCountry, setFilterCountry] = useState<string | null>(null)

  const filteredUsers = useMemo(() => {
    if (typeof filterCountry === 'string' && filterCountry.length > 0) {
      return users.filter((user) =>
        user.location.country.toLowerCase().includes(filterCountry.toLowerCase())
      )
    }
    return users
  }, [users, filterCountry])

  const handleNextPage = () => {
    fetchNextPage()
  }

  const sortedUsers = useMemo(() => {
    if (sorting === SortBy.NONE) return filteredUsers

    const compareProperties: Record<string, (user: User) => string> = {
      [SortBy.COUNTRY]: (user) => user.location.country,
      [SortBy.NAME]: (user) => user.name.first,
      [SortBy.LAST]: (user) => user.name.last,
    }

    return [...filteredUsers].toSorted((a, b) => {
      const extractProperty = compareProperties[sorting]
      return extractProperty(a).localeCompare(extractProperty(b))
    })
  }, [filteredUsers, sorting])

  return (
    <div className="App">
      <h1>Prueba técnica</h1>
      <Results />
      <header>
        <button onClick={() => setShowColors(!showColors)}>
          Cambiar colores
        </button>
        <button onClick={() => setSorting(sorting === SortBy.NONE ? SortBy.COUNTRY : SortBy.NONE)}>
          {sorting === SortBy.COUNTRY ? 'No ordenar por país' : 'Ordenar por país'}
        </button>
        <button onClick={async () => await refetch()}>
          Resetear
        </button>
        <input
          placeholder="Filtrar por país"
          onChange={(e) => setFilterCountry(e.target.value)}
        />
      </header>
      <main>
        {isLoading && <strong>Cargando...</strong>}
        {isError && <p>Error al cargar usuarios</p>}
        {!isLoading && !isError && users.length === 0 && <p>No hay usuarios</p>}
        {users.length > 0 && (
          <UserList
            changeSorting={setSorting}
            deleteUser={() => {}}
            users={sortedUsers}
            showColors={showColors}
          />
        )}
        {hasNextPage && (
          <button onClick={handleNextPage}>
            Cargar más resultados
          </button>
        )
        }
        {!isLoading && !isError && !hasNextPage && <p>No hay más resultados</p>}
      </main>
    </div>
  )
}

export default App
