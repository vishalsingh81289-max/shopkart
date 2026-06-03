import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { productAPI } from '../api.js'
import ProductCard from '../components/ProductCard.jsx'

const CATEGORIES = ['All', 'Electronics', 'Footwear', 'Clothing', 'Home', 'Sports', 'Accessories']

export default function Home() {
  const [products, setProducts] = useState([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState(null)
  const [category, setCategory] = useState('All')
  const [sort, setSort]         = useState('default')
  const [searchParams]          = useSearchParams()
  const searchQuery             = searchParams.get('search') || ''

  useEffect(() => {
    setLoading(true)
    setError(null)
    const req = searchQuery
      ? productAPI.search(searchQuery)
      : category !== 'All'
        ? productAPI.getByCategory(category)
        : productAPI.getAll()
    req
      .then(res => setProducts(res.data))
      .catch(() => setError('Could not load products. Make sure Spring Boot is running on port 8080.'))
      .finally(() => setLoading(false))
  }, [category, searchQuery])

  let list = [...products]
  if (sort === 'price-asc')  list.sort((a, b) => a.price - b.price)
  if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
  if (sort === 'rating')     list.sort((a, b) => (b.rating || 0) - (a.rating || 0))

  return (
    <div className="page">
      <div className="hero">
        <h1>Discover Amazing Products</h1>
        <p>Free shipping · Easy returns · Secure checkout</p>
      </div>

      <div className="toolbar">
        <div className="pills">
          {CATEGORIES.map(c => (
            <button
              key={c}
              className={`pill${category === c && !searchQuery ? ' active' : ''}`}
              onClick={() => setCategory(c)}
            >{c}</button>
          ))}
        </div>
        <select className="sort-sel" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="default">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <p className="result-info">
        {searchQuery && `Results for "${searchQuery}" — `}
        {list.length} product{list.length !== 1 ? 's' : ''}
      </p>

      {loading && <p className="state-txt">Loading products…</p>}
      {error   && <p className="state-txt error">{error}</p>}
      {!loading && !error && list.length === 0 && <p className="state-txt">No products found.</p>}
      {!loading && !error && (
        <div className="grid">
          {list.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  )
}
