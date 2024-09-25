import { useId } from 'react'
import './Filters.css'
import { useFilters } from '../hooks/useFilters.jsx'

export function Filters () {
  const { filters, setFilters } = useFilters()
  const minPriceFilterId = useId()
  const categoryFilterId = useId()

  const handleOnChangeMinPrice = (event) => {
    setFilters(prevState => ({
      ...prevState,
      minPrice: event.target.value
    }))
  }

  const handleOnChangeCategory = (event) => {
    setFilters(prevState => ({
      ...prevState,
      category: event.target.value
    }))
  }

  return (
    <section className='filters'>
      <div>
        <label htmlFor={minPriceFilterId}>Precio a partir de:</label>
        <input
          type='range'
          id={minPriceFilterId}
          min='0'
          max='1000'
          onChange={handleOnChangeMinPrice}
          value={filters.minPrice}
        />
        <span>${filters.minPrice}</span>
      </div>

      <div>
        <label htmlFor={categoryFilterId}>Categoria</label>
        <select id={categoryFilterId} onChange={handleOnChangeCategory}>
          <option value='all'>Todas</option>
          <option value='beauty'>beauty</option>
          <option value='furniture'>Furniture</option>
          <option value='groceries'>Groceries</option>
        </select>
      </div>
    </section>
  )
}
