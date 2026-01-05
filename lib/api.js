import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
})

// Request interceptor to add token
api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
  }
  return config
})

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/register', data),
  login: (data) => api.post('/login', data),
  logout: () => api.post('/logout'),
  getUser: () => api.get('/user'),
  updateProfile: (data) => api.put('/user/profile', data),
  deleteAccount: () => api.delete('/user/account'),
}

// Product APIs
export const productAPI = {
  getAll: (params) => api.get('/products', { params }),
  getById: (id) => api.get(`/products/${id}`),
  search: (query) => api.get('/products', { params: { q: query } }),
}

// Cart APIs
export const cartAPI = {
  get: () => api.get('/cart'),
  add: (data) => api.post('/cart/add', data),
  update: (data) => api.post('/cart/update', data),
  remove: (data) => api.post('/cart/remove', data),
}

// Order APIs
export const orderAPI = {
  getAll: () => api.get('/orders'),
  getById: (id) => api.get(`/orders/${id}`),
  track: (id) => api.get(`/orders/${id}/track`),
  cancel: (id) => api.post(`/orders/${id}/cancel`),
}

// Checkout APIs
export const checkoutAPI = {
  process: (data) => api.post('/checkout', data),
  createPayment: (data) => api.post('/payment/create-order', data),
  verifyPayment: (data) => api.post('/payment/verify', data),
}

// Wishlist APIs
export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  add: (data) => api.post('/wishlist', data),
  remove: (productId) => api.delete(`/wishlist/${productId}`),
}

// Category APIs
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
}

// Affiliate APIs
export const affiliateAPI = {
  getProfile: () => api.get('/affiliate'),
  getReferrals: () => api.get('/affiliate/referrals'),
  join: () => api.post('/affiliate/join'),
  getTree: () => api.get('/affiliate/tree'),
  getOffers: () => api.get('/affiliate/offers'),
}

// Seller APIs
export const sellerAPI = {
  getDashboard: () => api.get('/seller/dashboard'),
  getOrders: () => api.get('/seller/orders'),
  getProducts: () => api.get('/seller/products'),
}

// Admin APIs
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getSellers: () => api.get('/admin/sellers'),
  deleteSeller: (id) => api.delete(`/admin/sellers/${id}`),
  getPendingApplications: () => api.get('/admin/applications'),
  approveApplication: (id) => api.post(`/admin/applications/${id}/approve`),
  rejectApplication: (id, data) => api.post(`/admin/applications/${id}/reject`, data),
  getPendingProducts: () => api.get('/admin/products/pending'),
  approveProduct: (id) => api.post(`/admin/products/${id}/approve`),
  rejectProduct: (id) => api.post(`/admin/products/${id}/reject`),
  getDisputes: () => api.get('/admin/disputes'),
  resolveDispute: (id, data) => api.post(`/admin/disputes/${id}/resolve`, data),
  getUsers: () => api.get('/admin/users'),
  getUserById: (id) => api.get(`/admin/users/${id}`),
  toggleBlockUser: (id) => api.post(`/admin/users/${id}/block`),
  deleteUser: (id) => api.delete(`/admin/users/${id}`),
  getAllProducts: () => api.get('/admin/products'),
}

// Review APIs
export const reviewAPI = {
  getProductReviews: (id) => api.get(`/products/${id}/reviews`),
  addReview: (data) => api.post('/reviews', data),
}

// Helper to get full asset URL (images, etc.)
export const getAssetUrl = (path) => {
  if (!path) return null;
  if (typeof path === 'object') path = path.url;
  if (!path) return null;
  if (path.startsWith('http')) return path;

  // Get backend origin from API URL (strip /api)
  const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';
  const origin = backendUrl.replace(/\/api$/, '');
  return `${origin}${path.startsWith('/') ? '' : '/'}${path}`;
};

export default api;

