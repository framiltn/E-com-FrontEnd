'use client'
import { useState, useEffect } from 'react'
import { productAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'

export default function CategoryPage({ params }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [categoryName, setCategoryName] = useState('')

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const response = await productAPI.getAll({ category: params.slug })
        setProducts(response.data.data || [])
        if (response.data.data.length > 0) {
          setCategoryName(response.data.data[0].category?.name || 'Category')
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchCategoryProducts()
  }, [params.slug])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">{categoryName}</h1>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : products.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No products found in this category</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  )
}