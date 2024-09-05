import { useState, useEffect } from 'react'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

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

  return { imageUrl }
}
