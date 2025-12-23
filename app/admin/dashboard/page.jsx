'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import api from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function AdminDashboard() {
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await api.get('/admin/dashboard')
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
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <h3 className="text-gray-600 text-sm mb-2">Total Users</h3>
            <p className="text-3xl font-bold">{stats?.total_users || 0}</p>
          </div>
          <div className="card">
            <h3 className="text-gray-600 text-sm mb-2">Total Sellers</h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.total_sellers || 0}</p>
          </div>
          <div className="card">
            <h3 className="text-gray-600 text-sm mb-2">Pending Applications</h3>
            <p className="text-3xl font-bold text-yellow-600">{stats?.pending_applications || 0}</p>
          </div>
          <div className="card">
            <h3 className="text-gray-600 text-sm mb-2">Pending Products</h3>
            <p className="text-3xl font-bold text-orange-600">{stats?.pending_products || 0}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/admin/sellers" className="card hover:shadow-xl transition text-center">
            <div className="text-5xl mb-4">👥</div>
            <h3 className="font-semibold text-lg">Manage Sellers</h3>
            <p className="text-gray-600 text-sm mt-2">Approve or reject seller applications</p>
          </Link>

          <Link href="/admin/products" className="card hover:shadow-xl transition text-center">
            <div className="text-5xl mb-4">📦</div>
            <h3 className="font-semibold text-lg">Manage Products</h3>
            <p className="text-gray-600 text-sm mt-2">Approve or reject products</p>
          </Link>

          <Link href="/admin/disputes" className="card hover:shadow-xl transition text-center">
            <div className="text-5xl mb-4">⚖️</div>
            <h3 className="font-semibold text-lg">Manage Disputes</h3>
            <p className="text-gray-600 text-sm mt-2">Resolve customer disputes</p>
          </Link>
        </div>
      </div>
    </div>
  )
}
