'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import api from '@/lib/api'


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
    <div className="min-h-screen bg-[#f1f3f6]">
      <div className="flex justify-center items-center h-[80vh]">
        <div className="w-10 h-10 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans text-sm">

      <div className="w-full pt-4 pb-12 px-2 lg:px-4 gap-4">

        {/* MAIN CONTENT */}
        <div className="flex-1 space-y-4">


          {/* Stats Overview */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white p-4 shadow-sm border-t-4 border-blue-600 rounded-[2px] flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-xs font-bold uppercase mb-1">Total Users</div>
                <div className="text-3xl font-bold text-gray-800">{stats?.total_users || 0}</div>
              </div>
              <div className="text-4xl opacity-10">👥</div>
            </div>
            <div className="bg-white p-4 shadow-sm border-t-4 border-indigo-600 rounded-[2px] flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-xs font-bold uppercase mb-1">Total Sellers</div>
                <div className="text-3xl font-bold text-gray-800">{stats?.total_sellers || 0}</div>
              </div>
              <div className="text-4xl opacity-10">🏪</div>
            </div>
            <div className="bg-white p-4 shadow-sm border-t-4 border-yellow-500 rounded-[2px] flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-xs font-bold uppercase mb-1">Pending Sellers</div>
                <div className="text-3xl font-bold text-yellow-600">{stats?.pending_applications || 0}</div>
              </div>
              <div className="text-4xl opacity-10">⏳</div>
            </div>
            <div className="bg-white p-4 shadow-sm border-t-4 border-red-500 rounded-[2px] flex items-center justify-between">
              <div>
                <div className="text-gray-500 text-xs font-bold uppercase mb-1">Pending Products</div>
                <div className="text-3xl font-bold text-red-600">{stats?.pending_products || 0}</div>
              </div>
              <div className="text-4xl opacity-10">📦</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Pending Actions */}
            <div className="bg-white shadow-sm rounded-[2px]">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="font-bold text-gray-800">Pending Approvals</h3>
                <Link href="/admin/sellers" className="text-primary text-xs font-bold uppercase hover:underline">View All</Link>
              </div>
              <div className="p-4">
                {stats?.pending_applications > 0 ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-100 rounded-[2px]">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                        <span className="text-sm font-medium text-gray-700">New Seller Registration: <span className="font-bold">TechStore Pvt Ltd</span></span>
                      </div>
                      <button className="text-xs bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">Review</button>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-100 rounded-[2px]">
                      <div className="flex items-center gap-3">
                        <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                        <span className="text-sm font-medium text-gray-700">Product Approval: <span className="font-bold">iPhone 15 Pro Max</span></span>
                      </div>
                      <button className="text-xs bg-white border border-gray-300 px-3 py-1 rounded hover:bg-gray-50">Review</button>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-400 text-sm">
                    No pending actions required. System is up to date.
                  </div>
                )}
              </div>
            </div>

            {/* System Health / Quick Links */}
            <div className="bg-white shadow-sm rounded-[2px]">
              <div className="p-4 border-b border-gray-100">
                <h3 className="font-bold text-gray-800">System Status</h3>
              </div>
              <div className="p-6 grid grid-cols-2 gap-4">
                <div className="p-4 bg-green-50 rounded text-center">
                  <div className="text-green-600 font-bold mb-1">Database</div>
                  <div className="text-xs text-gray-600">Operational</div>
                </div>
                <div className="p-4 bg-green-50 rounded text-center">
                  <div className="text-green-600 font-bold mb-1">Payment Gateway</div>
                  <div className="text-xs text-gray-600">Connected</div>
                </div>
                <div className="p-4 bg-green-50 rounded text-center">
                  <div className="text-green-600 font-bold mb-1">Email Service</div>
                  <div className="text-xs text-gray-600">Active</div>
                </div>
                <div className="p-4 bg-red-50 rounded text-center">
                  <div className="text-red-600 font-bold mb-1">Storage</div>
                  <div className="text-xs text-gray-600">85% Full</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
