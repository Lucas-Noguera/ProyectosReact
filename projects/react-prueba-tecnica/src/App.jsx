import { useEffect, useState } from 'react'

const CAT_ENDPOINT_RANDOM_FACT = 'https://catfact.ninja/fact'
const CAT_PREFIX_IMAGE_URL = 'https://cataas.com'

export function App () {
  const [fact, setFact] = useState()
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then(res => res.json())
      .then(data => {
        const { fact } = data
        setFact(fact)

        const primerasTresPalabras = fact.split(' ', 3).join(' ')
        console.log(primerasTresPalabras)

        fetch(`https://cataas.com/cat/says/${primerasTresPalabras}?size=50&color=red&json=true`)
          .then(res => res.json())
          .then(response => {
            const { url } = response
            console.log(`${url}`)

            setImageUrl(`${CAT_PREFIX_IMAGE_URL}${url}`)
          })
      })
  }, [])

  return (
    <main>
      <h1>App de gatitos</h1>
      {fact && <p>{fact}</p>}
      {imageUrl && <img src={imageUrl} alt={`imagen creada a partir  de las primeras tres palabras de "${fact}"`} />}
    </main>
  )
}
