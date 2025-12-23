'use client'
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable @next/next/no-img-element */

import { useState, useEffect } from 'react'
import { orderAPI } from '@/lib/api'
import Link from 'next/link'

export default function OrdersPage() {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        fetchOrders()
    }, [])

    const fetchOrders = async () => {
        try {
            const response = await orderAPI.getAll()
            setOrders(response.data)
        } catch (err) {
            console.error('Failed to fetch orders:', err)
            setError('Failed to load orders.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="flex justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
                {error}
                <button
                    onClick={fetchOrders}
                    className="block mx-auto mt-2 text-sm font-medium hover:underline"
                >
                    Try Again
                </button>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                    📦
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No orders yet</h3>
                <p className="text-gray-500 mb-6">Looks like you haven't placed any orders yet.</p>
                <Link href="/products" className="btn-primary inline-block">
                    Start Shopping
                </Link>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-gray-900">My Orders</h1>

            <div className="space-y-4">
                {orders.map((order) => (
                    <div key={order.id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100">
                        <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex flex-wrap justify-between items-center gap-4">
                            <div className="flex gap-6 text-sm">
                                <div>
                                    <p className="text-gray-500 mb-1">Order Placed</p>
                                    <p className="font-medium text-gray-900">
                                        {new Date(order.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-gray-500 mb-1">Total</p>
                                    <p className="font-medium text-gray-900">₹{order.total_amount}</p>
                                </div>
                                <div>
                                    <p className="text-gray-500 mb-1">Order #</p>
                                    <p className="font-medium text-gray-900">{order.order_number || order.id}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === 'completed' ? 'bg-green-100 text-green-800' :
                                        order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                            order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                                'bg-gray-100 text-gray-800'
                                    }`}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </span>
                                {/* Link to details if we implement it later */}
                                {/* <Link href={`/dashboard/orders/${order.id}`} className="text-primary text-sm hover:underline">
                    View Details
                  </Link> */}
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="space-y-4">
                                {order.items && order.items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex-shrink-0 overflow-hidden">
                                            {item.product?.images?.[0] && (
                                                <img src={item.product.images[0]} alt="" className="w-full h-full object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-medium text-gray-900">{item.product_name || item.product?.name}</h4>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <div className="text-sm font-medium text-gray-900">
                                            ₹{item.price}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
