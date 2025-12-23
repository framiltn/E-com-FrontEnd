'use client'
import { useState } from 'react'
import { orderAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function TrackingPage() {
  const [orderId, setOrderId] = useState('')
  const [tracking, setTracking] = useState(null)

  const track = async (e) => {
    e.preventDefault()
    try {
      const res = await orderAPI.track(orderId)
      setTracking(res.data)
    } catch (error) {
      alert('Order not found')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Track Order</h1>
        <form onSubmit={track} className="card mb-6">
          <div className="flex gap-4">
            <input type="text" placeholder="Enter Order ID" className="input-field flex-1" value={orderId} onChange={e => setOrderId(e.target.value)} required />
            <button type="submit" className="btn-primary">Track</button>
          </div>
        </form>
        {tracking && (
          <div className="card">
            <h2 className="text-xl font-bold mb-4">Order #{tracking.id}</h2>
            <p className="mb-2">Status: <span className="font-bold">{tracking.status}</span></p>
            <p className="mb-4">Tracking: {tracking.tracking_number || 'N/A'}</p>
            <div className="space-y-2">
              {tracking.tracking_history?.map((h, i) => (
                <div key={i} className="border-l-4 border-blue-500 pl-4 py-2">
                  <p className="font-bold">{h.status}</p>
                  <p className="text-sm text-gray-600">{h.timestamp}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
