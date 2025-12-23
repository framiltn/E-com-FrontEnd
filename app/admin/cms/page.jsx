'use client'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function AdminCMS() {
  const [banners, setBanners] = useState([])
  const [showForm, setShowForm] = useState(false)
  const [formData, setFormData] = useState({ title: '', image_url: '', link: '' })

  useEffect(() => {
    api.get('/banners').then(res => setBanners(res.data.data || [])).catch(console.error)
  }, [])

  const createBanner = async (e) => {
    e.preventDefault()
    try {
      await api.post('/admin/banners', formData)
      alert('Banner created')
      setShowForm(false)
      api.get('/banners').then(res => setBanners(res.data.data || []))
    } catch (error) {
      alert('Error')
    }
  }

  const deleteBanner = async (id) => {
    try {
      await api.delete(`/admin/banners/${id}`)
      setBanners(banners.filter(b => b.id !== id))
    } catch (error) {
      alert('Error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">CMS Management</h1>
          <button onClick={() => setShowForm(!showForm)} className="btn-primary">Add Banner</button>
        </div>

        {showForm && (
          <form onSubmit={createBanner} className="card mb-6 space-y-4">
            <input type="text" placeholder="Title" className="input-field" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
            <input type="text" placeholder="Image URL" className="input-field" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} required />
            <input type="text" placeholder="Link" className="input-field" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
            <button type="submit" className="btn-primary">Create</button>
          </form>
        )}

        <div className="space-y-4">
          {banners.map(banner => (
            <div key={banner.id} className="card flex justify-between items-center">
              <div>
                <h3 className="font-bold">{banner.title}</h3>
                <p className="text-sm text-gray-600">{banner.image_url}</p>
              </div>
              <button onClick={() => deleteBanner(banner.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
