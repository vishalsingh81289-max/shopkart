import { createContext, useContext, useReducer } from 'react'

const CartContext = createContext(null)

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const found = state.find(i => i.id === action.item.id)
      if (found) return state.map(i => i.id === action.item.id ? { ...i, qty: i.qty + 1 } : i)
      return [...state, { ...action.item, qty: 1 }]
    }
    case 'REMOVE': return state.filter(i => i.id !== action.id)
    case 'INC':    return state.map(i => i.id === action.id ? { ...i, qty: i.qty + 1 } : i)
    case 'DEC':    return state.map(i => i.id === action.id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0)
    case 'CLEAR':  return []
    default:       return state
  }
}

export function CartProvider({ children }) {
  const [cart, dispatch] = useReducer(cartReducer, [])
  const itemCount  = cart.reduce((s, i) => s + i.qty, 0)
  const totalPrice = cart.reduce((s, i) => s + i.price * i.qty, 0)
  return (
    <CartContext.Provider value={{ cart, dispatch, itemCount, totalPrice }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
