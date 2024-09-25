import { Products } from './components/Products'
import { useProducts } from './hooks/useProducts.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'
import { useFilters } from './hooks/useFilters.jsx'

function App () {
  const { filterProducts, filters } = useFilters()
  const { products } = useProducts()
  const filteredProducts = filterProducts(products)

  return (
    <>
      <Header />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer filters={filters} />}
    </>

  )
}

export default App
