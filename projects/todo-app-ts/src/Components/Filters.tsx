import { FILTERS_BUTTONS } from '../const'
import { type FiltersValue } from '../types'

interface Props {
  FiltersSelected: FiltersValue
  onFilterChange: (filter: FiltersValue) => void
}

export const Filters: React.FC<Props> = ({
  FiltersSelected,
  onFilterChange,
}) => {

  return (
    <ul className='filters'>
      {Object.entries(FILTERS_BUTTONS).map(([key, { href, literal }]) => {
        const isSelected = key === FiltersSelected
        const className = isSelected ? 'selected' : ''
        return (
          <li key={key}>
            <a
              className={className}
              href={href}
              onClick={(event) => {
                event.preventDefault()
                onFilterChange(key as FiltersValue)
              }}
            >
              {literal}
            </a>
          </li>
        )
      })}
    </ul>
  )
}
