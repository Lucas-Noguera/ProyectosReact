import { useState } from 'react'
import { Products } from './components/Products'
import { useProducts } from './hooks/useProducts.jsx'
import { Header } from './components/Header.jsx'

function App () {
  const { products } = useProducts()
  const [filters, setFilters] = useState({
    category: 'all',
    minPrice: 0
  })

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        (
          filters.category === 'all' ||
          product.category === filters.category
        )
      )
    })
  }

  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header changeFilters={setFilters} />
      <Products products={filteredProducts} />
    </>

  )
}

export default App
