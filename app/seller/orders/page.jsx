'use client'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function SellerOrdersPage() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const response = await api.get('/seller/orders')
      setOrders(response.data.data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateStatus = async (id, status) => {
    try {
      await api.post(`/seller/orders/${id}/status`, { status })
      fetchOrders()
    } catch (error) {
      alert('Failed to update status')
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
        <h1 className="text-3xl font-bold mb-8">My Orders</h1>

        {orders.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">No orders yet</p>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order.id} className="card">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold text-lg">Order #{order.id}</h3>
                    <p className="text-sm text-gray-600">{new Date(order.created_at).toLocaleDateString()}</p>
                    <p className="text-sm text-gray-600">Customer: {order.order?.user?.name}</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-primary">₹{order.total_amount}</p>
                    <p className="text-sm text-gray-600 capitalize">Status: {order.status}</p>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <label className="block text-sm font-medium mb-2">Update Status</label>
                  <select
                    className="input-field max-w-xs"
                    value={order.status}
                    onChange={(e) => updateStatus(order.id, e.target.value)}
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
