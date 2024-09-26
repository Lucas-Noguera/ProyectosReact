import { Products } from './components/Products'
import { useProducts } from './hooks/useProducts.jsx'
import { Header } from './components/Header.jsx'
import { Footer } from './components/Footer.jsx'
import { IS_DEVELOPMENT } from './config.js'
import { useFilters } from './hooks/useFilters.jsx'
import { Cart } from './components/Cart.jsx'
import { CartProvider } from './components/cartcontext.jsx'

function App () {
  const { filterProducts } = useFilters()
  const { products } = useProducts()
  const filteredProducts = filterProducts(products)

  return (
    <CartProvider>
      <Header />
      <Cart />
      <Products products={filteredProducts} />
      {IS_DEVELOPMENT && <Footer />}
    </CartProvider>

  )
}

export default App
