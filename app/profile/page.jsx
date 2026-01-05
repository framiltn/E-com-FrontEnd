'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { authAPI } from '@/lib/api'
import FlipNav from '@/components/FlipNav'


export default function ProfilePage() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' })

  // Fetch role from local storage or API
  const [userRole, setUserRole] = useState('buyer')

  useEffect(() => {
    const role = localStorage.getItem('role') || 'buyer'
    setUserRole(role)
    const fetchUser = async () => {
      try {
        const response = await authAPI.getUser()
        setUser(response.data)
        setFormData({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone || ''
        })
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
      localStorage.removeItem('role')
      router.push('/login')
    } catch (error) {
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      router.push('/login')
    }
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    try {
      await authAPI.updateProfile(formData)
      setIsEditing(false)
      setUser({ ...user, ...formData })
      alert("Profile Updated")
    } catch (err) {
      alert("Update Failed")
    }
  }

  const renderSidebar = () => {
    if (userRole === 'admin') {
      return (
        <div className="bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center gap-4 text-primary font-medium uppercase text-xs mb-4">
              <span className="text-xl">🛡️</span> Admin Controls
            </div>
            <div onClick={() => router.push('/admin/dashboard')} className="pl-9 cursor-pointer hover:text-primary flex justify-between">
              <span>Dashboard</span>
              <span>›</span>
            </div>
          </div>
          <div className="p-4 border-b">
            <div className="flex items-center gap-4 text-primary font-medium uppercase text-xs mb-4">
              <span className="text-xl">⚙️</span> Settings
            </div>
            <div className="space-y-3 pl-9 text-sm text-gray-600">
              <div className="text-primary font-medium bg-blue-50 -ml-9 pl-9 py-2 cursor-pointer">Profile Settings</div>
              <div className="cursor-pointer hover:text-primary">Security Logs</div>
              <div className="cursor-pointer hover:text-primary">System Preferences</div>
            </div>
          </div>
          <div className="p-4 border-t">
            <button onClick={handleLogout} className="flex items-center gap-4 text-gray-600 hover:text-primary font-medium text-sm w-full">
              Logout
            </button>
          </div>
        </div>
      )
    } else if (userRole === 'seller') {
      return (
        <div className="bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center gap-4 text-primary font-medium uppercase text-xs mb-4">
              <span className="text-xl">🏪</span> Business
            </div>
            <div onClick={() => router.push('/seller/dashboard')} className="pl-9 cursor-pointer hover:text-primary flex justify-between">
              <span>Seller Dashboard</span>
              <span>›</span>
            </div>
          </div>
          <div className="p-4 border-b">
            <div className="flex items-center gap-4 text-primary font-medium uppercase text-xs mb-4">
              <span className="text-xl">💼</span> Account Details
            </div>
            <div className="space-y-3 pl-9 text-sm text-gray-600">
              <div className="text-primary font-medium bg-blue-50 -ml-9 pl-9 py-2 cursor-pointer">Personal Information</div>
              <div className="cursor-pointer hover:text-primary">Business Profile</div>
              <div className="cursor-pointer hover:text-primary">Bank Details</div>
              <div className="cursor-pointer hover:text-primary">Tax Information (GST)</div>
            </div>
          </div>
          <div className="p-4 border-t">
            <button onClick={handleLogout} className="flex items-center gap-4 text-gray-600 hover:text-primary font-medium text-sm w-full">
              Logout
            </button>
          </div>
        </div>
      )
    } else {
      // Buyer Sidebar (Original)
      return (
        <div className="bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b">
            <div className="flex items-center gap-4 text-primary font-medium uppercase text-xs mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              My Orders
            </div>
            <div onClick={() => router.push('/orders')} className="pl-9 cursor-pointer hover:text-primary flex justify-between">
              <span>View All Orders</span>
              <span>›</span>
            </div>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center gap-4 text-primary font-medium uppercase text-xs mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account Settings
            </div>
            <div className="space-y-3 pl-9 text-sm text-gray-600">
              <div className="text-primary font-medium bg-blue-50 -ml-9 pl-9 py-2 cursor-pointer">Profile Information</div>
              <div className="cursor-pointer hover:text-primary">Manage Addresses</div>
              <div className="cursor-pointer hover:text-primary">PAN Card Information</div>
            </div>
          </div>

          <div className="p-4 border-b">
            <div className="flex items-center gap-4 text-primary font-medium uppercase text-xs mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Payments
            </div>
            <div className="space-y-3 pl-9 text-sm text-gray-600">
              <div className="cursor-pointer hover:text-primary">Gift Cards</div>
              <div className="cursor-pointer hover:text-primary">Saved UPI</div>
              <div className="cursor-pointer hover:text-primary">Saved Cards</div>
            </div>
          </div>

          <div className="p-4">
            <div className="flex items-center gap-4 text-primary font-medium uppercase text-xs mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              My Stuff
            </div>
            <div className="space-y-3 pl-9 text-sm text-gray-600">
              <div className="cursor-pointer hover:text-primary">My Coupons</div>
              <div className="cursor-pointer hover:text-primary">My Reviews & Ratings</div>
              <div className="cursor-pointer hover:text-primary">All Notifications</div>
              <div onClick={() => router.push('/wishlist')} className="cursor-pointer hover:text-primary">My Wishlist</div>
              <div onClick={() => router.push('/affiliate')} className="cursor-pointer hover:text-primary font-medium text-orange-600">Affiliate Program</div>
            </div>
          </div>

          <div className="p-4 border-t">
            <button onClick={handleLogout} className="flex items-center gap-4 text-gray-600 hover:text-primary font-medium text-sm w-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Logout
            </button>
          </div>
        </div>
      )
    }
  }

  if (loading) return <div className="min-h-screen bg-[#f1f3f6] flex items-center justify-center">Loading...</div>

  return (
    <div className="min-h-screen bg-[#f1f3f6] font-sans text-sm">
      <div className="max-w-[1200px] mx-auto py-4 px-2 lg:px-0 flex flex-col lg:flex-row gap-4">

        {/* SIDEBAR */}
        <div className="w-full lg:w-[300px] flex-shrink-0 space-y-4">

          {/* Hello User */}
          <div className="bg-white p-4 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <div>
              <div className="text-xs text-gray-500">Hello,</div>
              <div className="font-bold">{user?.name}</div>
              <div className="text-xs text-primary capitalize">({userRole})</div>
            </div>
          </div>

          {/* Menu */}
          {renderSidebar()}
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 bg-white shadow-sm p-6">
          <h2 className="text-lg font-bold mb-6 flex items-center gap-2">
            Personal Information
            <span
              onClick={() => setIsEditing(!isEditing)}
              className="text-primary text-sm font-medium cursor-pointer ml-4 hover:underline"
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </span>
          </h2>

          <form onSubmit={handleUpdate} className="space-y-6 max-w-lg">
            <div className="flex gap-4">
              <div className="flex-1">
                <label className="block text-gray-500 text-xs uppercase font-bold mb-2">First Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.name.split(' ')[0]}
                  onChange={(e) => setFormData({ ...formData, name: `${e.target.value} ${formData.name.split(' ')[1] || ''}` })}
                  className={`w-full p-2 border ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent'} rounded-[2px]`}
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-500 text-xs uppercase font-bold mb-2">Last Name</label>
                <input
                  type="text"
                  disabled={!isEditing}
                  value={formData.name.split(' ')[1] || ''}
                  onChange={(e) => setFormData({ ...formData, name: `${formData.name.split(' ')[0]} ${e.target.value}` })}
                  className={`w-full p-2 border ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent'} rounded-[2px]`}
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-500 text-xs uppercase font-bold mb-2">Gender</label>
              <div className="flex gap-6">
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" disabled={!isEditing} className="w-4 h-4 text-primary" defaultChecked />
                  <span className="text-sm">Male</span>
                </label>
                <label className="flex items-center gap-2">
                  <input type="radio" name="gender" disabled={!isEditing} className="w-4 h-4 text-primary" />
                  <span className="text-sm">Female</span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 mt-8">Email Address</h3>
              <div className="flex gap-4 items-center">
                <input
                  type="email"
                  disabled={!isEditing}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={`flex-1 p-2 border ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent'} rounded-[2px] max-w-xs`}
                />
                {isEditing && <span className="text-primary text-sm font-medium cursor-pointer">Save</span>}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4 mt-8">Mobile Number</h3>
              <div className="flex gap-4 items-center">
                <input
                  type="tel"
                  disabled={!isEditing}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91"
                  className={`flex-1 p-2 border ${isEditing ? 'bg-white border-gray-300' : 'bg-gray-50 border-transparent'} rounded-[2px] max-w-xs`}
                />
                {isEditing && <span className="text-primary text-sm font-medium cursor-pointer">Save</span>}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-bold mb-4">FAQs</h3>
              <div className="space-y-4 text-sm">
                <div>
                  <h4 className="font-bold text-gray-800">What happens when I update my email address (or mobile number)?</h4>
                  <p className="text-gray-600 mt-1">Your login email id (or mobile number) changes, likewise. You&apos;ll receive all your account related communication on your updated email address (or mobile number).</p>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">When will my Flipkart account be updated with the new email address (or mobile number)?</h4>
                  <p className="text-gray-600 mt-1">It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.</p>
                </div>
              </div>
            </div>

            {isEditing && (
              <button type="submit" className="bg-primary text-white px-8 py-3 rounded-[2px] font-bold uppercase shadow-sm mt-8">
                Save Changes
              </button>
            )}
          </form>
        </div>
      </div>

    </div>
  )
}
