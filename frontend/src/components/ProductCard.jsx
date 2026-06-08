import { useState, useMemo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function ProductCard({ product }) {
  const { dispatch, cart } = useCart()
  const [flash, setFlash] = useState(false)
  const navigate = useNavigate()
  const inCart = cart.some(item => item.id === product.id)

  const isLowStock = useMemo(() => product.stock > 0 && product.stock < 5, [product.stock])
  const isOutOfStock = useMemo(() => product.stock === 0, [product.stock])

  const handleAddToCart = useCallback((e) => {
    e.stopPropagation()
    dispatch({ type: 'ADD', item: product })
    setFlash(true)
    const timer = setTimeout(() => setFlash(false), 1200)
    return () => clearTimeout(timer)
  }, [product, dispatch])

  const renderStarRating = useMemo(() => {
    const fullStars = Math.floor(product.rating || 4)
    const emptyStars = 5 - fullStars
    return '★'.repeat(fullStars) + '☆'.repeat(emptyStars)
  }, [product.rating])

  const getButtonText = useCallback(() => {
    if (isOutOfStock) return 'Out of Stock'
    if (flash) return '✓ Added'
    if (inCart) return 'Add Again'
    return 'Add to Cart'
  }, [isOutOfStock, flash, inCart])

  const getStockDisplay = useCallback(() => {
    return product.stock === 0 ? 'Out of stock' : `${product.stock} in stock`
  }, [product.stock])

  return (
    <div className="card" onClick={() => navigate(`/product/${product.id}`)}>
      {product.badge && <span className="card-badge">{product.badge}</span>}
      <div className="card-img">{product.image || '📦'}</div>
      <div className="card-body">
        <p className="card-cat">{product.category}</p>
        <h3 className="card-name">{product.name}</h3>
        <div className="card-stars">
          <span className="stars">{renderStarRating}</span>
          <span className="review-count">({product.reviewCount || 0})</span>
        </div>
        <div className="card-footer">
          <span className="card-price">₹{Number(product.price).toLocaleString('en-IN')}</span>
          <button
            className={`add-btn${flash ? ' flash' : inCart ? ' in-cart' : ''}`}
            onClick={handleAddToCart}
            disabled={isOutOfStock}
          >
            {getButtonText()}
          </button>
        </div>
        <p className={`card-stock ${isLowStock ? 'low-stock' : ''}`}>
          {getStockDisplay()}
          {isLowStock && <span className="low-stock-badge">⚠️ Hurry, low stock!</span>}
        </p>
      </div>
    </div>
  )
}
