import { WINNER_COMBOS } from '../constantes'

export const checkWinnerFrom = (boardToCheck) => {
  for (const combo of WINNER_COMBOS) {
    const [a, b, c] = combo
    if (boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
      boardToCheck[a] === boardToCheck[c]) {
      return boardToCheck[a]
    }
  }
  return null
}

export const checkGameisOver = (newBoard) => {
  return newBoard.every((square) => square !== null)
}
