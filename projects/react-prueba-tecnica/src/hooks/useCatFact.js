import { useEffect, useState } from 'react'
import { getRandomFact } from '../services/facts'

export function useCatFact () {
  const [fact, setFact] = useState()

  const getRamdonFactandUpdateState = () => {
    getRandomFact().then(newFact => setFact(newFact))
  }

  useEffect(() => {
    getRamdonFactandUpdateState()
  }, [])

  return { fact, getRamdonFactandUpdateState }
}
