import { useContext } from 'react'
import { CartContext } from '../components/cartcontext'

export const useCart = () => {
  const cart = useContext(CartContext)

  if (cart === undefined) {
    throw new Error('useCart debe ser usado con un Provider')
  }

  return cart
}
