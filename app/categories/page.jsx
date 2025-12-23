'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { categoryAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function CategoriesPage() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll()
      setCategories(response.data.data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">Loading...</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Shop by Category</h1>

        {categories.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">No categories available</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/products?category=${category.id}`}
                className="card hover:shadow-xl transition text-center"
              >
                <div className="w-full h-32 bg-gradient-to-br from-primary to-secondary rounded-lg mb-4 flex items-center justify-center text-white text-4xl">
                  📦
                </div>
                <h3 className="font-semibold text-lg">{category.name}</h3>
                {category.description && (
                  <p className="text-sm text-gray-600 mt-2">{category.description}</p>
                )}
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
