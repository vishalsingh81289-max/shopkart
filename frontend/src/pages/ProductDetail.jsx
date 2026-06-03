import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { productAPI } from '../api.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetail() {
  const { id }                = useParams()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [flash, setFlash]     = useState(false)
  const { dispatch, cart }    = useCart()
  const navigate              = useNavigate()
  const inCart                = cart.some(i => i.id === product?.id)

  useEffect(() => {
    productAPI.getById(id)
      .then(res => setProduct(res.data))
      .catch(() => setProduct(null))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <div className="page"><p className="state-txt">Loading…</p></div>
  if (!product) return <div className="page"><p className="state-txt error">Product not found.</p></div>

  const stars = '★'.repeat(Math.floor(product.rating || 4)) + '☆'.repeat(5 - Math.floor(product.rating || 4))

  const handleAdd = () => {
    dispatch({ type: 'ADD', item: product })
    setFlash(true)
    setTimeout(() => setFlash(false), 1200)
  }

  return (
    <div className="page">
      <button className="back-btn" onClick={() => navigate(-1)}>← Back</button>
      <div className="detail-card">
        <div className="detail-img">{product.image || '📦'}</div>
        <div className="detail-info">
          {product.badge && <span className="card-badge">{product.badge}</span>}
          <p className="card-cat">{product.category}</p>
          <h1 className="detail-name">{product.name}</h1>
          <div className="card-stars">
            <span className="stars">{stars}</span>
            <span className="review-count">{(product.rating || 0).toFixed(1)} · {product.reviewCount || 0} reviews</span>
          </div>
          <p className="detail-desc">{product.description}</p>
          <p className="detail-price">₹{Number(product.price).toLocaleString('en-IN')}</p>
          <p className="card-stock">{product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ Out of stock'}</p>
          <div className="detail-actions">
            <button
              className={`add-btn large${flash ? ' flash' : inCart ? ' in-cart' : ''}`}
              onClick={handleAdd}
              disabled={product.stock === 0}
            >
              {product.stock === 0 ? 'Out of Stock' : flash ? '✓ Added to Cart' : 'Add to Cart'}
            </button>
            <button
              className="buy-btn"
              onClick={() => { dispatch({ type: 'ADD', item: product }); navigate('/cart') }}
              disabled={product.stock === 0}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
