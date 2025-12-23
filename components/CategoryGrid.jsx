'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { categoryAPI } from '@/lib/api'

export default function CategoryGrid() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await categoryAPI.getAll()
      setCategories(response.data || [])
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const getCategoryIcon = (category) => {
    const categoryIcons = {
      'electronics': { icon: '📱', gradient: 'from-blue-500 to-cyan-500' },
      'fashion': { icon: '👗', gradient: 'from-pink-500 to-rose-500' },
      'home': { icon: '🏠', gradient: 'from-orange-500 to-amber-500' },
      'books': { icon: '📚', gradient: 'from-purple-500 to-violet-500' },
      'sports': { icon: '⚽', gradient: 'from-green-500 to-emerald-500' },
      'beauty': { icon: '💄', gradient: 'from-fuchsia-500 to-pink-500' },
      'toys': { icon: '🧸', gradient: 'from-yellow-500 to-orange-500' },
      'food': { icon: '🍔', gradient: 'from-red-500 to-orange-500' },
    }
    const slug = category.slug?.toLowerCase() || category.name?.toLowerCase() || ''
    return categoryIcons[slug] || { icon: '🛍️', gradient: 'from-gray-500 to-slate-500' }
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="text-center">Loading categories...</div>
      </div>
    )
  }

  return (
    <div className="bg-white border-b py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const { icon, gradient } = getCategoryIcon(category)
            return (
              <Link
                key={category.id}
                href={`/categories/${category.slug || category.id}`}
                className="group"
              >
                <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 p-4 text-center transform hover:-translate-y-1">
                  <div className={`w-16 h-16 mx-auto mb-3 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-3xl shadow-lg`}>
                    {icon}
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}