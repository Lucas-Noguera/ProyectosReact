import { useCart } from '../hooks/useCart.jsx'
import './Products.css'
import { AddToCartIcon, RemoveFromCartIcon } from './icons'

export function Products ({ products }) {
  console.log(products)
  const { addToCart, removeFromCart, cart } = useCart()
  const checkProductInCart = product => {
    return cart.some(item => item.id === product.id)
  }

  return (
    <main className='products'>
      <ul>
        {products.slice(0, 10).map(product => {
          const isProductInCart = checkProductInCart(product)
          return (
            <li key={product.id}>
              <img src={product.thumbnail} alt={product.title} />
              <div>
                <strong>{product.title}</strong> - ${product.price}
              </div>
              <div>
                <button
                  style={{ background: isProductInCart ? 'red' : '#09f' }} onClick={() => {
                    isProductInCart
                      ? removeFromCart(product)
                      : addToCart(product)
                  }}
                >
                  {
                isProductInCart
                  ? <RemoveFromCartIcon />
                  : <AddToCartIcon />
                  }
                </button>
              </div>
            </li>
          )
        })}
      </ul>

    </main>
  )
}
