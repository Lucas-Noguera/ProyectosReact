import { Products } from './components/Products'
import { useProducts } from './hooks/useProducts.jsx'

function App () {
  const { products } = useProducts()
  return (
    <Products products={products} />
  )
}

export default App
