import { useEffect, useState } from 'react'
import './App.css'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)
      })
  }, [])

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
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`imagen creada a partir  de las primeras tres palabras de "${fact}"`} />}
    </main>
  )
}
