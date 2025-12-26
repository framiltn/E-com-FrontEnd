'use client'
import { useState, useEffect, useCallback } from 'react'
import { productAPI, getAssetUrl } from '@/lib/api'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import Footer from '@/components/Footer'

export default function ProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [filters, setFilters] = useState({
    min_price: '',
    max_price: '',
    sort: 'newest'
  })

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      const response = await productAPI.getAll({ ...filters, q: search })
      setProducts(response.data.data || [])
    } catch (error) {
      console.error('Error:', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [filters, search])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  const handleSearch = (e) => {
    e.preventDefault()
    fetchProducts()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">All Products</h1>

        {/* Search and Filters */}
        <div className="card mb-8">
          <form onSubmit={handleSearch} className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <input
              type="text"
              placeholder="Search products..."
              className="input-field"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <input
              type="number"
              placeholder="Min Price"
              className="input-field"
              value={filters.min_price}
              onChange={(e) => setFilters({ ...filters, min_price: e.target.value })}
            />

            <input
              type="number"
              placeholder="Max Price"
              className="input-field"
              value={filters.max_price}
              onChange={(e) => setFilters({ ...filters, max_price: e.target.value })}
            />

            <select
              className="input-field"
              value={filters.sort}
              onChange={(e) => setFilters({ ...filters, sort: e.target.value })}
            >
              <option value="newest">Newest</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </form>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : !Array.isArray(products) || products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No products found</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
