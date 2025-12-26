'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '' })

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authAPI.getUser()
        setUser(response.data)
        setFormData({ name: response.data.name, email: response.data.email })
      } catch (error) {
        console.error('Error:', error)
        router.push('/login')
      } finally {
        setLoading(false)
      }
    }
    fetchUser()
  }, [router])

  const handleLogout = async () => {
    try {
      await authAPI.logout()
      localStorage.removeItem('token')
      router.push('/login')
    } catch (error) {
      localStorage.removeItem('token')
      router.push('/login')
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await authAPI.updateProfile(formData)
      setUser(response.data.user)
      setEditing(false)
      alert('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      alert('Failed to update profile: ' + (error.response?.data?.message || error.message))
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Profile</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sidebar */}
          <div className="space-y-2">
            <button className="w-full text-left px-4 py-2 bg-primary text-white rounded-lg">
              Profile
            </button>
            {user?.role !== 'admin' && user?.role !== 'seller' && (
              <>
                <button
                  onClick={() => router.push('/orders')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Orders
                </button>
                <button
                  onClick={() => router.push('/wishlist')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Wishlist
                </button>
                <button
                  onClick={() => router.push('/affiliate')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 rounded-lg"
                >
                  Affiliate
                </button>
              </>
            )}
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
            >
              Logout
            </button>
          </div>

          {/* Profile Info */}
          <div className="md:col-span-2">
            <div className="card">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Profile Information</h2>
                <button
                  onClick={() => setEditing(!editing)}
                  className="btn-secondary"
                >
                  {editing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {editing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <input
                      type="text"
                      className="input-field"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <input
                      type="email"
                      className="input-field"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">Name</label>
                    <p className="text-lg">{user?.name}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">Email</label>
                    <p className="text-lg">{user?.email}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">Role</label>
                    <p className="text-lg capitalize">{user?.role || 'Buyer'}</p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">Member Since</label>
                    <p className="text-lg">{new Date(user?.created_at).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
