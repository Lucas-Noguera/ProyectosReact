export const Square = ({ children, updateBoard, isSelected, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handleClick = () => {
    updateBoard(index)
  }

  return (

    <div onClick={handleClick} className={className}>
      {children}
    </div>
  )
}
