import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Cart() {
  const { cart, dispatch, itemCount, totalPrice } = useCart()
  const navigate = useNavigate()
  const tax   = Math.round(totalPrice * 0.18)
  const total = totalPrice + tax

  if (itemCount === 0) return (
    <div className="page center-page">
      <div className="empty-box">
        <div style={{ fontSize: 64 }}>🛒</div>
        <h2>Your cart is empty</h2>
        <p>Browse our products and add something!</p>
        <button className="buy-btn" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    </div>
  )

  return (
    <div className="page">
      <h1 className="page-title">Your Cart ({itemCount} items)</h1>
      <div className="cart-layout">

        <div className="cart-items">
          {cart.map(item => (
            <div key={item.id} className="cart-row">
              <div className="cart-img">{item.image || '📦'}</div>
              <div className="cart-meta">
                <h3>{item.name}</h3>
                <p className="card-cat">{item.category}</p>
                <p className="cart-unit">₹{Number(item.price).toLocaleString('en-IN')} each</p>
              </div>
              <div className="qty-ctrl">
                <button className="qty-btn" onClick={() => dispatch({ type: 'DEC', id: item.id })}>−</button>
                <span className="qty-val">{item.qty}</span>
                <button className="qty-btn" onClick={() => dispatch({ type: 'INC', id: item.id })}>+</button>
                <button className="rm-btn" onClick={() => dispatch({ type: 'REMOVE', id: item.id })}>✕</button>
              </div>
              <div className="cart-subtotal">₹{Number(item.price * item.qty).toLocaleString('en-IN')}</div>
            </div>
          ))}
        </div>

        <div className="summary-box">
          <h2>Order Summary</h2>
          <div className="sum-row"><span>Subtotal</span><span>₹{totalPrice.toLocaleString('en-IN')}</span></div>
          <div className="sum-row"><span>GST (18%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
          <div className="sum-row"><span>Shipping</span><span className="free-tag">FREE</span></div>
          <div className="sum-divider" />
          <div className="sum-row total-row"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
          <button className="buy-btn full" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          <button className="back-btn full-w" onClick={() => navigate('/')}>← Continue Shopping</button>
        </div>

      </div>
    </div>
  )
}
