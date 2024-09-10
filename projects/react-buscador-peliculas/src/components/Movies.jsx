function RenderMovies ({ movies }) {
  return (
    <ul>
      {
    movies.map(movie => (
      <li key={movie.id}>
        <h3>{movie.title}</h3>
        <p>{movie.year}</p>
        <img src={movie.poster} alt={movie.title} />
      </li>
    ))
    }
    </ul>

  )
}

function RenderNoResults () {
  return (
    <p>No se encontraron resultados para esta bússqueda</p>
  )
}

export function Movies ({ movies }) {
  const hasMovies = movies?.length > 0

  return (

    hasMovies
      ? <RenderMovies movies={movies} />
      : <RenderNoResults />

  )
}
