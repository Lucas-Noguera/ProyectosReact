import { useState } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies ({ search }) {
  const [movies, setMovies] = useState([])

  const getMovie = async () => {
    const newMovie = await searchMovies({ search })
    setMovies(newMovie)
  }

  return { movies, getMovie }
}
