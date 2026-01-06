'use client'
import { useState, useEffect, useCallback } from 'react'
import { productAPI, categoryAPI } from '@/lib/api'
import FlipNav from '@/components/FlipNav'
import FlipSubNav from '@/components/FlipSubNav'
import ProductCard from '@/components/ProductCard'

import { useSearchParams } from 'next/navigation'



export default function ProductsPage() {
  const searchParams = useSearchParams()
  const initialSearch = searchParams.get('search') || searchParams.get('q') || ''
  const initialCategory = searchParams.get('category') || ''

  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [availableBrands, setAvailableBrands] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState(initialSearch)
  const [filters, setFilters] = useState({
    min_price: '',
    max_price: '',
    sort: 'newest',
    category: initialCategory,
    brand: [], // Array of selected brands
    availability: false // true = exclude out of stock
  })

  const fetchProducts = useCallback(async () => {
    setLoading(true)
    try {
      // Merge state filters with URL params
      const queryParams = {
        ...filters,
        q: search,
        category: filters.category || initialCategory,
        brand: filters.brand.join(','), // Server expects comma-separated string
        availability: filters.availability
      }

      let data = []
      try {
        const response = await productAPI.getAll(queryParams)

        // Extract brands from meta if available
        if (response.data?.meta?.brands) {
          setAvailableBrands(response.data.meta.brands)
        }

        // Check if response.data has a 'data' property (pagination) or is the array itself
        const responseData = response.data
        if (responseData?.data?.data && Array.isArray(responseData.data.data)) {
          data = responseData.data.data
        } else if (responseData?.data && Array.isArray(responseData.data)) {
          data = responseData.data
        } else if (Array.isArray(responseData)) {
          data = responseData
        } else {
          console.warn('Unexpected API response structure:', responseData)
          data = []
        }
      } catch (e) {
        console.warn('API parsing failed', e)
      }

      // De-duplicate products based on Clean Name to handle database pollution
      const uniqueProducts = Array.from(new Map(data.map(item => [item.name?.toLowerCase().trim(), item])).values())

      setProducts(uniqueProducts)
    } catch (error) {
      console.warn('API Request Failed', error)
      setProducts([])
    } finally {
      setLoading(false)
    }
  }, [filters, search, initialCategory])

  useEffect(() => {
    // Update state if URL changes (e.g. navigation)
    setProducts([])
    setLoading(true)
    setSearch(initialSearch)
    setFilters(prev => ({ ...prev, category: initialCategory }))
  }, [initialSearch, initialCategory])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await categoryAPI.getAll()
        setCategories(res.data.data || res.data || [])
      } catch (err) {
        console.error('Failed to fetch categories:', err)
      }
    }
    fetchCategories()
  }, [])

  return (
    <div className="min-h-screen bg-secondary font-sans text-sm">

      <div className="max-w-[1400px] mx-auto px-2 lg:px-4 py-4 flex flex-col lg:flex-row gap-2">
        {/* LEFT SIDEBAR - FILTERS */}
        <div className="w-full lg:w-[270px] bg-white shadow-sm flex-shrink-0 self-start p-4 hidden lg:block">
          <h2 className="text-lg font-bold border-b pb-3 mb-3">Filters</h2>

          {/* Price Filter */}
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xs font-bold uppercase text-gray-800 mb-2">Price</h3>
            <div className="flex flex-col gap-4 px-2">
              <div className="flex items-center justify-between text-xs text-gray-600">
                <span>₹{filters.min_price || 0}</span>
                <span>₹{filters.max_price || 100000}</span>
              </div>
              <div className="relative h-2 bg-gray-200 rounded">
                {/* This is a simple implementation. For a robust one, we'd use a library like rc-slider, 
                     but here we will use two native inputs for simplicity/no-deps */}
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="500"
                  value={filters.max_price || 100000}
                  onChange={(e) => setFilters(prev => ({ ...prev, max_price: e.target.value }))}
                  className="absolute w-full h-full opacity-50 cursor-pointer z-20"
                />
                <input
                  type="range"
                  min="0"
                  max="100000"
                  step="500"
                  value={filters.min_price || 0}
                  onChange={(e) => setFilters(prev => ({ ...prev, min_price: e.target.value }))}
                  className="absolute w-full h-full opacity-50 cursor-pointer z-10"
                />
              </div>
              <div className="flex gap-2 mt-2">
                <select
                  className="flex-1 text-xs border p-1 rounded"
                  value={filters.min_price}
                  onChange={(e) => setFilters(prev => ({ ...prev, min_price: e.target.value }))}
                >
                  <option value="">Min</option>
                  <option value="500">₹500</option>
                  <option value="1000">₹1000</option>
                  <option value="5000">₹5000</option>
                  <option value="10000">₹10000</option>
                </select>
                <span className="text-gray-400 self-center">to</span>
                <select
                  className="flex-1 text-xs border p-1 rounded"
                  value={filters.max_price}
                  onChange={(e) => setFilters(prev => ({ ...prev, max_price: e.target.value }))}
                >
                  <option value="">Max</option>
                  <option value="2000">₹2000</option>
                  <option value="5000">₹5000</option>
                  <option value="10000">₹10000</option>
                  <option value="50000">₹50000</option>
                  <option value="100000">₹100000+</option>
                </select>
              </div>
            </div>
          </div>



          {/* Brand Filter */}
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xs font-bold uppercase text-gray-800 mb-2">Brand</h3>
            <div className="space-y-1 pl-2 max-h-40 overflow-y-auto">
              {availableBrands.map((brand, i) => (
                <label key={i} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="h-3 w-3"
                    checked={filters.brand.includes(brand)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters(prev => ({ ...prev, brand: [...prev.brand, brand] }))
                      } else {
                        setFilters(prev => ({ ...prev, brand: prev.brand.filter(b => b !== brand) }))
                      }
                    }}
                  />
                  <span className="text-sm text-gray-700 hover:text-primary">{brand}</span>
                </label>
              ))}
              {availableBrands.length === 0 && <span className="text-xs text-gray-400">No brands available</span>}
            </div>
          </div>

          {/* Availability Filter */}
          <div className="border-b pb-4 mb-4">
            <h3 className="text-xs font-bold uppercase text-gray-800 mb-2">Availability</h3>
            <div className="space-y-1 pl-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="h-3 w-3"
                  checked={filters.availability}
                  onChange={(e) => setFilters(prev => ({ ...prev, availability: e.target.checked }))}
                />
                <span className="text-sm text-gray-700">Exclude Out of Stock</span>
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT CONTENT - PRODUCTS */}
        <div className="flex-1 bg-white shadow-sm">
          {/* Header / Sort */}
          <div className="border-b px-4 py-3">
            <div className="flex flex-col sm:flex-row items-baseline gap-4">
              <h1 className="font-bold text-lg">All Products</h1>
              <div className="text-xs text-gray-500">
                (Showing {products.length} items)
              </div>
              <div className="sm:ml-auto flex items-center gap-4 text-sm">
                <span className="font-bold">Sort By</span>
                <span
                  className={`cursor-pointer ${filters.sort === 'price_asc' ? 'text-primary font-bold border-b-2 border-primary' : 'hover:text-primary'}`}
                  onClick={() => setFilters({ ...filters, sort: 'price_asc' })}
                >
                  Price -- Low to High
                </span>
                <span
                  className={`cursor-pointer ${filters.sort === 'price_desc' ? 'text-primary font-bold border-b-2 border-primary' : 'hover:text-primary'}`}
                  onClick={() => setFilters({ ...filters, sort: 'price_desc' })}
                >
                  Price -- High to Low
                </span>
                <span
                  className={`cursor-pointer ${filters.sort === 'newest' ? 'text-primary font-bold border-b-2 border-primary' : 'hover:text-primary'}`}
                  onClick={() => setFilters({ ...filters, sort: 'newest' })}
                >
                  Newest First
                </span>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="p-4" key={`products-${filters.category}-${search}`}>
            {loading ? (
              <div className="flex justify-center py-20">
                <div className="w-8 h-8 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
              </div>
            ) : !Array.isArray(products) || products.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="No Found" className="w-[300px]" />
                <span className="text-lg font-bold mt-4">Sorry, no results found!</span>
                <span className="text-sm text-gray-500">Please check the spelling or try searching for something else</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
