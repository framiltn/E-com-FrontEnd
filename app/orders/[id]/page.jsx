/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { orderAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function OrderDetailsPage({ params }) {
  const router = useRouter()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchOrder = useCallback(async () => {
    try {
      const response = await orderAPI.getById(params.id)
      setOrder(response.data.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    fetchOrder()
  }, [fetchOrder])

  const cancelOrder = async () => {
    if (!confirm('Are you sure you want to cancel this order?')) return

    try {
      await orderAPI.cancel(params.id)
      fetchOrder()
    } catch (error) {
      alert('Failed to cancel order')
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">Loading...</div>
    </div>
  )

  if (!order) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">Order not found</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Order #{order.id}</h1>
          <button onClick={() => router.back()} className="btn-secondary">
            Back
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Order Items</h2>
              {order.sellerOrders?.map((sellerOrder) => (
                <div key={sellerOrder.id} className="mb-6 last:mb-0">
                  <h3 className="font-semibold mb-3">Seller: {sellerOrder.seller?.name}</h3>
                  {sellerOrder.items?.map((item) => (
                    <div key={item.id} className="flex gap-4 mb-3 pb-3 border-b last:border-0">
                      <div className="w-20 h-20 bg-gray-200 rounded flex-shrink-0">
                        {item.product?.images?.[0] && (
                          <img src={item.product.images[0]} alt="" className="w-full h-full object-cover rounded" />
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.product?.name}</h4>
                        <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                        <p className="font-semibold">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-1 space-y-4">
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span>Status</span>
                  <span className="font-semibold capitalize">{order.order_status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Payment</span>
                  <span className="font-semibold capitalize">{order.payment_status}</span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span>{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>₹{order.total_amount}</span>
                </div>
              </div>

              {order.order_status === 'pending' && (
                <button
                  onClick={cancelOrder}
                  className="w-full mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
