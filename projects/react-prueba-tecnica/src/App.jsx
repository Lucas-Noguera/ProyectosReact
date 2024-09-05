import { useEffect, useState } from 'react'
import './App.css'
import { getRandomFact } from './services/facts'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    getRandomFact().then(setFact)
  }, [])

  const handleClick = async () => {
    const newFact = await getRandomFact()
    setFact(newFact)
  }

  useEffect(() => {
    if (!fact) return
    const primerasTresPalabras = fact.split(' ', 3).join(' ')
    console.log(primerasTresPalabras)

    fetch(`https://cataas.com/cat/says/${primerasTresPalabras}?size=50&color=red`)
      .then(response => {
        const { url } = response
        console.log(url)

        setImageUrl(url)
      })
  }, [fact])

  return (
    <main>
      <h1>App de gatitos</h1>
      <button onClick={handleClick}>Get new fact</button>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`imagen creada a partir  de las primeras tres palabras de "${fact}"`} />}
    </main>
  )
}
