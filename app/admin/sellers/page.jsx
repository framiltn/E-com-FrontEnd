'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import api from '@/lib/api'

export default function AdminSellersPage() {
  const router = useRouter()
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchSellers()
  }, [])

  const fetchSellers = async () => {
    try {
      const response = await api.get('/admin/sellers')
      setSellers(response.data.data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const deleteSeller = async (id) => {
    if (!confirm('Are you sure you want to remove this seller?')) return
    
    try {
      await api.delete(`/admin/sellers/${id}`)
      setSellers(sellers.filter(seller => seller.id !== id))
      alert('Seller removed successfully')
    } catch (error) {
      alert('Failed to remove seller')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Manage Sellers</h1>
          <button 
            onClick={() => router.push('/admin/dashboard')}
            className="btn-secondary"
          >
            Back to Dashboard
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : sellers.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No sellers found</div>
        ) : (
          <div className="card overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Seller
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Joined
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sellers.map((seller) => (
                  <tr key={seller.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{seller.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {seller.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(seller.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => deleteSeller(seller.id)}
                        className="text-red-600 hover:text-red-900 font-medium"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}