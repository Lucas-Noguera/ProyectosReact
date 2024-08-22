  import './App.css'
  import {useState} from "react"
  import confetti from 'canvas-confetti'
  import { Square } from './Componentes/Square'
  import { TURNS } from './constantes'
  import {checkWinnerFrom, checkGameisOver} from './logic/board.js'
  import { WinnerModal } from './Componentes/WinnerModal.jsx'
  import { BoardComponent } from './Componentes/BoardComponent.jsx'


  function App() {
    const [board, setBoard] =  useState(() => {
      const boardFromStorage = window.localStorage.getItem('board')
      return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null)
    });
    const [turn, setTurn] = useState(() => {
      const turnFromLocalStorage = window.localStorage.getItem('turn')
      return turnFromLocalStorage ?? TURNS.X
    })
    const [winner, setWinner] = useState(null)  

    const updateBoard = (index) => { 
      if(board[index] || winner) return
      const newBoard = [...board]
      newBoard[index] = turn
      setBoard(newBoard)
      const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
      setTurn(newTurn)
      window.localStorage.setItem('board', JSON.stringify(newBoard))
      window.localStorage.setItem('turn', newTurn)
      const newWinner = checkWinnerFrom(newBoard)
      if(newWinner){
        setWinner(newWinner);
        confetti()
      } else if(checkGameisOver(newBoard)){
        setWinner(false);
      }
    }
    const resetGame = () => {
      setBoard(Array(9).fill(null))
      setTurn(TURNS.X)
      setWinner(null)
      window.localStorage.removeItem('board')
      window.localStorage.removeItem('turn')
    }

  return (
    <main className="board">
      <h1>Tic tac toe</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <BoardComponent board={board} updateBoard={updateBoard}></BoardComponent>
      <section className='turn'>
        <Square isSelected={turn === TURNS.O}>{TURNS.O}</Square>
        <Square isSelected={turn === TURNS.X}>{TURNS.X}</Square>
      </section>
          <WinnerModal resetGame={resetGame} winner={winner}/>
    </main>
  )
  }

  export default App
