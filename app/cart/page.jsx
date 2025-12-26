/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { cartAPI, getAssetUrl } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Navbar from '@/components/Navbar'

export default function CartPage() {
  const router = useRouter()
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      const response = await cartAPI.get()
      setCart(response.data)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      await cartAPI.update({ product_id: productId, quantity })
      fetchCart()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const removeItem = async (productId) => {
    try {
      await cartAPI.remove({ product_id: productId })
      fetchCart()
    } catch (error) {
      console.error('Error:', error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">Loading...</div>
      </div>
    )
  }

  const isEmpty = !cart?.items || cart.items.length === 0

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        {isEmpty ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <button onClick={() => router.push('/')} className="btn-primary">
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item) => (
                <div key={item.id} className="card flex gap-4">
                  <div className="w-24 h-24 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                    {item.product?.images?.[0] ? (
                      <img
                        src={getAssetUrl(item.product.images[0])}
                        alt={item.product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <span className={`text-gray-400 text-xs ${item.product?.images?.[0] ? 'hidden' : 'flex'}`}>No Image</span>
                  </div>

                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product?.name}</h3>
                    <p className="text-gray-600">₹{item.price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity - 1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      <span className="px-4">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product_id, item.quantity + 1)}
                        className="px-3 py-1 bg-gray-200 rounded"
                      >
                        +
                      </button>
                      <button
                        onClick={() => removeItem(item.product_id)}
                        className="ml-auto text-red-600 hover:text-red-800"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="card sticky top-20">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{cart.total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total</span>
                    <span>₹{cart.total}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full btn-primary"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
