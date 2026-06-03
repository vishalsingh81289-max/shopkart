import { useLocation, useNavigate } from 'react-router-dom'

export default function OrderSuccess() {
  const { state } = useLocation()
  const navigate  = useNavigate()
  const order     = state?.order

  if (!order) { navigate('/'); return null }

  const total = Math.round((order.totalAmount || 0) * 1.18)

  return (
    <div className="page center-page">
      <div className="success-card">
        <div style={{ fontSize: 64 }}>🎉</div>
        <h1>Order Confirmed!</h1>
        <p className="success-sub">
          Thank you, <strong>{order.customerName}</strong>!<br />
          Confirmation sent to <strong>{order.customerEmail}</strong>
        </p>
        <div className="order-id-chip">
          <span>Order ID</span>
          <strong>{order.orderId}</strong>
        </div>
        <div className="success-items">
          {(order.items || []).map((i, idx) => (
            <div key={idx} className="sum-row small">
              <span>{i.productName} × {i.quantity}</span>
              <span>₹{(i.price * i.quantity).toLocaleString('en-IN')}</span>
            </div>
          ))}
          <div className="sum-divider" />
          <div className="sum-row total-row">
            <span>Total Paid (incl. GST)</span>
            <span>₹{total.toLocaleString('en-IN')}</span>
          </div>
        </div>
        <p className="delivery-note">📦 Expected delivery: 3–5 business days</p>
        <button className="buy-btn" onClick={() => navigate('/')}>Continue Shopping</button>
      </div>
    </div>
  )
}
