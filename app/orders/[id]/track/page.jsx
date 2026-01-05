'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { orderAPI } from '@/lib/api'
import Link from 'next/link'

export default function OrderTrackingPage() {
    const { id } = useParams()
    const router = useRouter()
    const [tracking, setTracking] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const fetchTracking = async () => {
            try {
                const response = await orderAPI.track(id)
                setTracking(response.data)
            } catch (err) {
                setError('Failed to load tracking details')
                console.error(err)
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchTracking()
        }
    }, [id])

    if (loading) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
    )

    if (error) return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
            <div className="text-center">
                <h2 className="text-xl font-bold text-red-600 mb-2">Error</h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Link href="/orders" className="text-primary hover:underline">
                    Back to Orders
                </Link>
            </div>
        </div>
    )

    const steps = [
        { status: 'pending', label: 'Order Placed', icon: '📝' },
        { status: 'processing', label: 'Processing', icon: '⚙️' },
        { status: 'shipped', label: 'Shipped', icon: '🚚' },
        { status: 'delivered', label: 'Delivered', icon: '✅' },
    ]

    // Find current step index
    const currentStatus = tracking?.status || 'pending'
    const currentStepIndex = steps.findIndex(s => s.status === currentStatus)
    // If cancelled, show special state? For now, handle basic flow.
    const isCancelled = currentStatus === 'cancelled'

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    {/* Header */}
                    <div className="bg-primary px-6 py-4">
                        <h1 className="text-xl font-bold text-white flex justify-between items-center">
                            <span>Track Order #{tracking?.order_number}</span>
                            <span className="text-sm font-normal bg-white/20 px-3 py-1 rounded-full">
                                {isCancelled ? 'Cancelled' : steps[Math.max(0, currentStepIndex)]?.label}
                            </span>
                        </h1>
                    </div>

                    <div className="p-6 md:p-10">
                        {isCancelled ? (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-center">
                                This order has been cancelled.
                            </div>
                        ) : (
                            <div className="relative">
                                {/* Progress Bar Line */}
                                <div className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full h-1 bg-gray-200 -z-0"></div>
                                <div
                                    className="absolute left-0 top-1/2 transform -translate-y-1/2 h-1 bg-green-500 -z-0 transition-all duration-500"
                                    style={{ width: `${(currentStepIndex / (steps.length - 1)) * 100}%` }}
                                ></div>

                                {/* Steps */}
                                <div className="flex justify-between relative z-10">
                                    {steps.map((step, index) => {
                                        const isCompleted = index <= currentStepIndex
                                        const isCurrent = index === currentStepIndex

                                        return (
                                            <div key={step.status} className="flex flex-col items-center">
                                                <div
                                                    className={`w-10 h-10 rounded-full flex items-center justify-center border-2 
                            ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-300 text-gray-400'}
                            ${isCurrent ? 'ring-4 ring-green-100' : ''}
                            transition-all duration-300
                          `}
                                                >
                                                    <span className="text-lg">{isCompleted ? '✓' : step.icon}</span>
                                                </div>
                                                <span className={`mt-2 text-sm font-medium ${isCompleted ? 'text-gray-900' : 'text-gray-500'}`}>
                                                    {step.label}
                                                </span>
                                                {/* Optional: Add timestamps if available in tracking data */}
                                                {tracking?.history?.find(h => h.status === step.status) && (
                                                    <span className="text-xs text-gray-400 mt-1">
                                                        {new Date(tracking.history.find(h => h.status === step.status).created_at).toLocaleDateString()}
                                                    </span>
                                                )}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Order Items Preview */}
                        <div className="mt-12 border-t pt-8">
                            <h3 className="text-lg font-semibold mb-4">Order Details</h3>
                            <div className="space-y-4">
                                {tracking?.items?.map((item) => (
                                    <div key={item.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                        <div>
                                            <p className="font-medium">{item.product_name}</p>
                                            <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                        </div>
                                        <p className="font-semibold">₹{item.price}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 flex justify-between items-center text-sm text-gray-500">
                                <p>Expected Delivery: {tracking?.expected_delivery || 'Calculating...'}</p>
                                <Link href={`/orders/${id}`} className="text-primary hover:underline font-medium">
                                    View Full Invoice
                                </Link>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
