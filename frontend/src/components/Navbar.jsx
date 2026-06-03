import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext.jsx'

export default function Navbar() {
  const { itemCount } = useCart()
  const [query, setQuery] = useState('')
  const navigate = useNavigate()

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) navigate(`/?search=${encodeURIComponent(query.trim())}`)
    else navigate('/')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">🛍 ShopKart</Link>

      <form className="search-form" onSubmit={handleSearch}>
        <input
          className="search-input"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search products..."
        />
        <button className="search-btn" type="submit">Search</button>
      </form>

      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/cart" className="nav-link cart-btn">
          🛒 Cart
          {itemCount > 0 && <span className="badge">{itemCount}</span>}
        </Link>
      </div>
    </nav>
  )
}
