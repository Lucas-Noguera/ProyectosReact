import { useState, useRef, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const previousSearch = useRef(search)

  const getMovie = useCallback(async ({ search }) => {
    if (search === previousSearch.current) return
    try {
      setLoading(true)
      setError(null)
      previousSearch.current = search
      const newMovie = await searchMovies({ search })
      setMovies(newMovie)
      setLoading(false)
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }, [search])

  const sortedMovies = useMemo(() => {
    console.log('papeada')
    return sort
      ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
      : movies
  }, [sort, movies])

  return { movies: sortedMovies, getMovie, loading, error }
}
