'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import api from '@/lib/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SellerDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/seller/analytics')
      setStats(response.data.data)
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
        <h1 className="text-3xl font-bold mb-8">Seller Dashboard</h1>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <h3 className="text-gray-600 text-sm mb-2">Total Products</h3>
            <p className="text-3xl font-bold">{stats?.total_products || 0}</p>
          </div>
          <div className="card">
            <h3 className="text-gray-600 text-sm mb-2">Total Orders</h3>
            <p className="text-3xl font-bold">{stats?.total_orders || 0}</p>
          </div>
          <div className="card">
            <h3 className="text-gray-600 text-sm mb-2">Pending Orders</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats?.pending_orders || 0}</p>
          </div>
          <div className="card">
            <h3 className="text-gray-600 text-sm mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-primary">₹{stats?.total_revenue || 0}</p>
          </div>
        </div>

        {/* Management Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Link href="/seller/products/create" className="card hover:shadow-xl transition text-center">
            <div className="text-5xl mb-4">➕</div>
            <h3 className="font-semibold text-lg">Add New Product</h3>
            <p className="text-gray-600 text-sm mt-2">Create and list new products</p>
          </Link>

          <Link href="/seller/products" className="card hover:shadow-xl transition text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="font-semibold text-lg">Manage Products</h3>
            <p className="text-gray-600 text-sm mt-2">Add, edit, remove products & manage inventory</p>
          </Link>

          <Link href="/seller/orders" className="card hover:shadow-xl transition text-center">
            <div className="text-5xl mb-4">📋</div>
            <h3 className="font-semibold text-lg">Manage Orders</h3>
            <p className="text-gray-600 text-sm mt-2">View and process orders</p>
          </Link>

          <Link href="/seller/settings" className="card hover:shadow-xl transition text-center">
            <div className="text-5xl mb-4">⚙️</div>
            <h3 className="font-semibold text-lg">Store Settings</h3>
            <p className="text-gray-600 text-sm mt-2">Configure your store</p>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  )
}
