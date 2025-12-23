'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import api from '@/lib/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function SellerApplyPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    store_name: '',
    business_name: '',
    business_type: '',
    gst_number: '',
    pan_number: '',
    address: '',
    mobile: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/seller/apply', formData)
      alert('Application submitted! Wait for admin approval.')
      router.push('/')
    } catch (error) {
      const msg = error.response?.data?.message || 'Error submitting application'
      alert(msg)
      console.error(error.response?.data)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Become a Seller</h1>

        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block font-medium mb-2">Store Name</label>
            <input type="text" required className="input-field" value={formData.store_name} onChange={(e) => setFormData({...formData, store_name: e.target.value})} />
          </div>

          <div>
            <label className="block font-medium mb-2">Business Name</label>
            <input type="text" required className="input-field" value={formData.business_name} onChange={(e) => setFormData({...formData, business_name: e.target.value})} />
          </div>

          <div>
            <label className="block font-medium mb-2">Business Type</label>
            <select required className="input-field" value={formData.business_type} onChange={(e) => setFormData({...formData, business_type: e.target.value})}>
              <option value="">Select</option>
              <option value="individual">Individual</option>
              <option value="company">Company</option>
              <option value="partnership">Partnership</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2">GST Number</label>
            <input type="text" className="input-field" value={formData.gst_number} onChange={(e) => setFormData({...formData, gst_number: e.target.value})} />
          </div>

          <div>
            <label className="block font-medium mb-2">PAN Number</label>
            <input type="text" required className="input-field" value={formData.pan_number} onChange={(e) => setFormData({...formData, pan_number: e.target.value})} />
          </div>

          <div>
            <label className="block font-medium mb-2">Address</label>
            <textarea required className="input-field" rows="3" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} />
          </div>

          <div>
            <label className="block font-medium mb-2">Mobile</label>
            <input type="tel" required className="input-field" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
          </div>

          <button type="submit" disabled={loading} className="w-full btn-primary disabled:opacity-50">
            {loading ? 'Submitting...' : 'Submit Application'}
          </button>
        </form>
      </div>

      <Footer />
    </div>
  )
}
