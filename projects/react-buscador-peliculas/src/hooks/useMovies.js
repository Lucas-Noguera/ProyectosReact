import { useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const getMovie = async () => {
    try {
      setLoading(true)
      setError(null)
      const newMovie = await searchMovies({ search })
      setMovies(newMovie)
      setLoading(false)
    } catch (e) {
      setError(e.message)
      setLoading(false)
    }
  }

  return { movies, getMovie, loading }
}
