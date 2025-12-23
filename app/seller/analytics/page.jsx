'use client'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function SellerAnalytics() {
  const [analytics, setAnalytics] = useState(null)

  useEffect(() => {
    api.get('/seller/analytics').then(res => setAnalytics(res.data)).catch(console.error)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Sales Analytics</h1>
        <div className="grid grid-cols-4 gap-6 mb-8">
          <div className="card"><h3 className="text-gray-500 text-sm">Total Revenue</h3><p className="text-3xl font-bold">₹{analytics?.total_revenue || 0}</p></div>
          <div className="card"><h3 className="text-gray-500 text-sm">Total Orders</h3><p className="text-3xl font-bold">{analytics?.total_orders || 0}</p></div>
          <div className="card"><h3 className="text-gray-500 text-sm">Products Sold</h3><p className="text-3xl font-bold">{analytics?.products_sold || 0}</p></div>
          <div className="card"><h3 className="text-gray-500 text-sm">Avg Order Value</h3><p className="text-3xl font-bold">₹{analytics?.avg_order_value || 0}</p></div>
        </div>
        <div className="card">
          <h2 className="text-xl font-bold mb-4">Top Products</h2>
          <div className="space-y-2">
            {analytics?.top_products?.map(p => (
              <div key={p.id} className="flex justify-between py-2 border-b">
                <span>{p.name}</span>
                <span className="font-bold">{p.sales_count} sold</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
