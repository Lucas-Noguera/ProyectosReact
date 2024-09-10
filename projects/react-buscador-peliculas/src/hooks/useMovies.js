import responseMovies from '../mocks/with-results.json'

export function useMovies () {
  const movies = responseMovies.Search
  const mappedMovies = movies?.map(moovie => ({
    id: moovie.imdbID,
    title: moovie.Title,
    year: moovie.Year,
    poster: moovie.Poster
  }))

  return { movies: mappedMovies }
}
