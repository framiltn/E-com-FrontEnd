'use client'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function AdminProductsPage() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await api.get('/admin/products/pending')
      setProducts(response.data.data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (id) => {
    try {
      await api.post(`/admin/products/${id}/approve`)
      fetchProducts()
    } catch (error) {
      alert('Failed to approve')
    }
  }

  const handleReject = async (id) => {
    const reason = prompt('Rejection reason:')
    if (!reason) return

    try {
      await api.post(`/admin/products/${id}/reject`, { reason })
      fetchProducts()
    } catch (error) {
      alert('Failed to reject')
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
        <h1 className="text-3xl font-bold mb-8">Pending Products</h1>

        {products.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500">No pending products</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {products.map((product) => (
              <div key={product.id} className="card flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-gray-600">₹{product.price} | Stock: {product.stock}</p>
                  <p className="text-sm text-gray-500">Seller: {product.seller?.name}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleApprove(product.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleReject(product.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
