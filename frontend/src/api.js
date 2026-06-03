import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

export const productAPI = {
  getAll:        ()        => api.get('/products'),
  getById:       (id)      => api.get(`/products/${id}`),
  getByCategory: (cat)     => api.get(`/products/category/${cat}`),
  search:        (keyword) => api.get(`/products/search?keyword=${encodeURIComponent(keyword)}`),
}

export const orderAPI = {
  place:        (order)   => api.post('/orders', order),
  getByOrderId: (orderId) => api.get(`/orders/${orderId}`),
}

export default api
