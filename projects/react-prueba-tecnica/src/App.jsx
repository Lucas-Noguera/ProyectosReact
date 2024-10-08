import './App.css'
import { useCatImage } from './hooks/useCatimage'
import { useCatFact } from './hooks/useCatFact'

export function App () {
  const { fact, getRamdonFactandUpdateState } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleClick = async () => {
    getRamdonFactandUpdateState()
  }

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && (
        <div className='contenedor-p'><p>{fact}</p></div>
      )}
      <div className='contenedor-img'>
        {imageUrl && <img src={imageUrl} alt={`imagen creada a partir de las primeras tres palabras de "${fact}"`} />}
      </div>
    </main>
  )
}
