const API_KEY = 'b519f0d7'

export const searchMovies = async ({ search }) => {
  if (search === '') return null

  try {
    const response = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${search}`)
    const json = await response.json()

    const movies = json.Search

    return movies?.map(moovie => ({
      id: moovie.imdbID,
      title: moovie.Title,
      year: moovie.Year,
      poster: moovie.Poster
    }))
  } catch (e) {
    throw new Error('Falla en la busqueda')
  }
}
