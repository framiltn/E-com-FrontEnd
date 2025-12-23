'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import ProductGrid from '@/components/ProductGrid'
import CategoryGrid from '@/components/CategoryGrid'
import Footer from '@/components/Footer'
import { authAPI } from '@/lib/api'

export default function Home() {
  const [role, setRole] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkUserRole()
  }, [])

  const checkUserRole = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
      setRole('guest')
      setLoading(false)
      return
    }

    try {
      const res = await authAPI.getUser()
      setRole(res.data.role)
    } catch (error) {
      console.error('Error fetching user role:', error)
      setRole('guest')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="flex justify-center items-center h-[calc(100vh-64px)]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {role === 'admin' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-12 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome, Admin</h1>
            <p className="text-xl text-gray-600 mb-8">
              You are logged in as an administrator. Access your dashboard to manage the marketplace.
            </p>
            <Link
              href="/admin/dashboard"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg transition-colors"
            >
              Go to Admin Dashboard
            </Link>
          </div>
        </div>
      ) : role === 'seller' ? (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="bg-white rounded-2xl shadow-sm p-12 max-w-2xl mx-auto">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Welcome, Seller</h1>
            <p className="text-xl text-gray-600 mb-8">
              You are logged in as a seller. Access your dashboard to manage your store and products.
            </p>
            <Link
              href="/seller/dashboard"
              className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark md:py-4 md:text-lg transition-colors"
            >
              Go to Seller Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <>
          <CategoryGrid />
          <ProductGrid />
        </>
      )}

      <Footer />
    </div>
  )
}
