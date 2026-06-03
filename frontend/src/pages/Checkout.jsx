import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'
import { orderAPI } from '../api.js'

export default function Checkout() {
  const { cart, totalPrice, dispatch } = useCart()
  const navigate = useNavigate()
  const [form, setForm]       = useState({ name: '', email: '', phone: '', address: '' })
  const [payment, setPayment] = useState('card')
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState('')

  const tax   = Math.round(totalPrice * 0.18)
  const total = totalPrice + tax

  if (cart.length === 0) { navigate('/'); return null }

  const change = e => setForm({ ...form, [e.target.name]: e.target.value })

  const submit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.address) {
      setError('Please fill in all required fields.')
      return
    }
    setLoading(true)
    setError('')
    try {
      const res = await orderAPI.place({
        customerName:  form.name,
        customerEmail: form.email,
        phone:         form.phone,
        address:       form.address,
        paymentMethod: payment,
        items: cart.map(i => ({
          productId:   i.id,
          productName: i.name,
          price:       i.price,
          quantity:    i.qty,
        })),
      })
      dispatch({ type: 'CLEAR' })
      navigate('/order-success', { state: { order: res.data } })
    } catch {
      setError('Failed to place order. Make sure Spring Boot is running on port 8080.')
    } finally {
      setLoading(false)
    }
  }

  const paymentOptions = [
    ['card', '💳 Credit / Debit Card'],
    ['upi',  '📱 UPI'],
    ['cod',  '📦 Cash on Delivery'],
  ]

  return (
    <div className="page">
      <h1 className="page-title">Checkout</h1>
      <div className="checkout-layout">

        <form className="checkout-form" onSubmit={submit}>
          <h2>Shipping Details</h2>
          {error && <div className="form-error">{error}</div>}
          <div className="form-row">
            <label>Full Name *
              <input name="name" value={form.name} onChange={change} placeholder="Ravi Kumar" required />
            </label>
            <label>Email Address *
              <input name="email" type="email" value={form.email} onChange={change} placeholder="ravi@example.com" required />
            </label>
          </div>
          <label>Phone Number
            <input name="phone" value={form.phone} onChange={change} placeholder="+91 98765 43210" />
          </label>
          <label>Delivery Address *
            <textarea name="address" value={form.address} onChange={change} rows={3} placeholder="123, Main Street, Kolkata, WB 700001" required />
          </label>

          <h2>Payment Method</h2>
          <div className="payment-group">
            {paymentOptions.map(([val, label]) => (
              <label key={val} className={`pay-opt${payment === val ? ' selected' : ''}`}>
                <input type="radio" name="payment" value={val} checked={payment === val} onChange={() => setPayment(val)} />
                {label}
              </label>
            ))}
          </div>

          <button type="submit" className="buy-btn full" disabled={loading}>
            {loading ? 'Placing Order…' : `Place Order  ·  ₹${total.toLocaleString('en-IN')}`}
          </button>
        </form>

        <div className="summary-box">
          <h2>Order ({cart.length} item{cart.length > 1 ? 's' : ''})</h2>
          {cart.map(i => (
            <div key={i.id} className="sum-row small">
              <span>{i.image} {i.name} × {i.qty}</span>
              <span>₹{(i.price * i.qty).toLocaleString('en-IN')}</span>
            </div>
          ))}
          <div className="sum-divider" />
          <div className="sum-row"><span>Subtotal</span><span>₹{totalPrice.toLocaleString('en-IN')}</span></div>
          <div className="sum-row"><span>GST (18%)</span><span>₹{tax.toLocaleString('en-IN')}</span></div>
          <div className="sum-row"><span>Shipping</span><span className="free-tag">FREE</span></div>
          <div className="sum-divider" />
          <div className="sum-row total-row"><span>Total</span><span>₹{total.toLocaleString('en-IN')}</span></div>
        </div>

      </div>
    </div>
  )
}
