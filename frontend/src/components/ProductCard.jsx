import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { dispatch, cart } = useCart()
  const [flash, setFlash]  = useState(false)
  const navigate           = useNavigate()
  const inCart             = cart.some(i => i.id === product.id)

  const addToCart = (e) => {
    e.stopPropagation()
    dispatch({ type: 'ADD', item: product })
    setFlash(true)
    setTimeout(() => setFlash(false), 1200)
  }

  const stars = '★'.repeat(Math.floor(product.rating || 4)) + '☆'.repeat(5 - Math.floor(product.rating || 4))

  return (
    <div className="card" onClick={() => navigate(`/product/${product.id}`)}>
      {product.badge && <span className="card-badge">{product.badge}</span>}
      <div className="card-img">{product.image || '📦'}</div>
      <div className="card-body">
        <p className="card-cat">{product.category}</p>
        <h3 className="card-name">{product.name}</h3>
        <div className="card-stars">
          <span className="stars">{stars}</span>
          <span className="review-count">({product.reviewCount || 0})</span>
        </div>
        <div className="card-footer">
          <span className="card-price">₹{Number(product.price).toLocaleString('en-IN')}</span>
          <button
            className={`add-btn${flash ? ' flash' : inCart ? ' in-cart' : ''}`}
            onClick={addToCart}
            disabled={product.stock === 0}
          >
            {product.stock === 0 ? 'Out of Stock' : flash ? '✓ Added' : inCart ? 'Add Again' : 'Add to Cart'}
          </button>
        </div>
        <p className="card-stock">{product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}</p>
      </div>
    </div>
  )
}
