'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import api from '@/lib/api'


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
    <div className="flex justify-center items-center h-[50vh]">
      <div className="w-10 h-10 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
    </div>
  )

  return (
    <div className="font-sans text-sm">
      <div className="space-y-4">

        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-4 shadow-sm border-l-4 border-blue-500 rounded-[2px]">
            <div className="text-gray-500 text-xs font-bold uppercase mb-1">Total Sales</div>
            <div className="text-2xl font-bold text-gray-800">₹{stats?.total_revenue || 0}</div>
            <div className="text-xs text-green-600 mt-2">↑ 12% vs last month</div>
          </div>
          <div className="bg-white p-4 shadow-sm border-l-4 border-green-500 rounded-[2px]">
            <div className="text-gray-500 text-xs font-bold uppercase mb-1">Total Orders</div>
            <div className="text-2xl font-bold text-gray-800">{stats?.total_orders || 0}</div>
            <div className="text-xs text-green-600 mt-2">5 new today</div>
          </div>
          <div className="bg-white p-4 shadow-sm border-l-4 border-yellow-500 rounded-[2px]">
            <div className="text-gray-500 text-xs font-bold uppercase mb-1">Pending Orders</div>
            <div className="text-2xl font-bold text-gray-800">{stats?.pending_orders || 0}</div>
            <div className="text-xs text-yellow-600 mt-2">Action required</div>
          </div>
          <div className="bg-white p-4 shadow-sm border-l-4 border-purple-500 rounded-[2px]">
            <div className="text-gray-500 text-xs font-bold uppercase mb-1">Active Listings</div>
            <div className="text-2xl font-bold text-gray-800">{stats?.total_products || 0}</div>
            <div className="text-xs text-gray-500 mt-2">In stock</div>
          </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-white p-6 shadow-sm rounded-[2px]">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Listing Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span>Active Listings</span>
                <span className="font-bold text-green-600">{stats?.total_products || 0}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Out of Stock</span>
                <span className="font-bold text-red-600">0</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span>Low Stock</span>
                <span className="font-bold text-yellow-600">2</span>
              </div>
            </div>
            <Link href="/seller/products" className="block text-center mt-6 text-primary font-bold text-sm uppercase hover:underline">View All Inventory</Link>
          </div>

          <div className="bg-white p-6 shadow-sm rounded-[2px] col-span-1 md:col-span-2">
            <h3 className="font-bold text-lg mb-4 border-b pb-2">Recent Notifications</h3>
            <div className="space-y-3">
              <div className="flex gap-3 items-start p-3 bg-blue-50 rounded">
                <span className="text-blue-500 mt-0.5">ℹ️</span>
                <div>
                  <div className="font-bold text-sm text-gray-800">Listing Policy Update</div>
                  <div className="text-xs text-gray-600">Please review the updated listing guidelines effective from Jan 1st.</div>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 bg-green-50 rounded">
                <span className="text-green-500 mt-0.5">🎉</span>
                <div>
                  <div className="font-bold text-sm text-gray-800">You reached 100 Orders!</div>
                  <div className="text-xs text-gray-600">Congratulations on processing your 100th order.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

