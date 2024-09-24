import { useState } from 'react'
import './Filters.css'

export function Filters ({ onChange }) {
  const [minPrice, setMinPrice] = useState(0)

  const handleOnChangeMinPrice = (event) => {
    setMinPrice(event.target.value)
    onChange(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  const handleOnChangeCategory = (event) => {
    onChange(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Precio a partir de:</label>
        <input
          type='range'
          id='price'
          min='0'
          max='1000'
          onChange={handleOnChangeMinPrice}
        />
        <span>${minPrice}</span>
      </div>

      <div>
        <label htmlFor='category'>Categoria</label>
        <select id='category' onChange={handleOnChangeCategory}>
          <option value='all'>Todas</option>
          <option value='beauty'>beauty</option>
          <option value='furniture'>Furniture</option>
          <option value='groceries'>Groceries</option>
        </select>
      </div>
    </section>
  )
}
