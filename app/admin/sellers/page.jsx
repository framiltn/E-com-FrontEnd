'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Navbar from '@/components/Navbar'
import { adminAPI } from '@/lib/api'

export default function AdminSellersPage() {
  const router = useRouter()
  const [sellers, setSellers] = useState([])
  const [pendingSellers, setPendingSellers] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('active') // 'active' or 'pending'

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [sellersRes, pendingRes] = await Promise.all([
        adminAPI.getSellers(),
        adminAPI.getPendingApplications()
      ])
      setSellers(sellersRes.data.data || [])
      setPendingSellers(pendingRes.data.data || [])
    } catch (error) {
      console.error('Error fetching sellers:', error)
    } finally {
      setLoading(false)
    }
  }

  const approveSeller = async (id) => {
    if (!confirm('Approve this seller application?')) return
    try {
      await adminAPI.approveApplication(id)
      alert('Seller approved successfully')
      fetchData()
    } catch (error) {
      alert('Failed to approve seller')
    }
  }

  const rejectSeller = async (id) => {
    if (!confirm('Reject this seller application?')) return
    try {
      await adminAPI.rejectApplication(id)
      alert('Seller application rejected')
      fetchData()
    } catch (error) {
      alert('Failed to reject application')
    }
  }

  const deleteSeller = async (id) => {
    if (!confirm('Are you sure you want to remove this seller?')) return
    try {
      await adminAPI.deleteSeller(id)
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

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`px-6 py-3 font-medium text-sm transition ${activeTab === 'active'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab('active')}
          >
            Active Sellers ({sellers.length})
          </button>
          <button
            className={`px-6 py-3 font-medium text-sm transition ${activeTab === 'pending'
              ? 'border-b-2 border-primary text-primary'
              : 'text-gray-500 hover:text-gray-700'
              }`}
            onClick={() => setActiveTab('pending')}
          >
            Pending Applications ({pendingSellers.length})
          </button>
        </div>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : (
          <div className="card overflow-hidden">
            {activeTab === 'active' ? (
              sellers.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No active sellers found</div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {sellers.map((seller) => (
                      <tr key={seller.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{seller.name}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{seller.email}</td>
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
              )
            ) : (
              pendingSellers.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No pending applications</div>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applicant</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Applied Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {pendingSellers.map((app) => (
                      <tr key={app.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-medium text-gray-900">{app.user?.name || app.name || 'N/A'}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{app.user?.email || app.email}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                          {new Date(app.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap space-x-4">
                          <button
                            onClick={() => approveSeller(app.id)}
                            className="text-green-600 hover:text-green-900 font-medium"
                          >
                            Approve
                          </button>
                          <button
                            onClick={() => rejectSeller(app.id)}
                            className="text-red-600 hover:text-red-900 font-medium"
                          >
                            Reject
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )
            )}
          </div>
        )}
      </div>
    </div>
  )
}