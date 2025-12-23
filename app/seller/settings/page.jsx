'use client'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function SellerSettings() {
  const [settings, setSettings] = useState({
    store_name: '',
    brand_story: '',
    shipping_method: 'self',
    free_shipping_threshold: '',
    flat_shipping_rate: '',
    tax_rate: ''
  })

  useEffect(() => {
    api.get('/seller/settings').then(res => setSettings(res.data)).catch(console.error)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await api.put('/seller/settings', settings)
      alert('Settings updated')
    } catch (error) {
      alert('Error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Store Settings</h1>
        <form onSubmit={handleSubmit} className="card space-y-4">
          <div>
            <label className="block font-medium mb-2">Store Name</label>
            <input type="text" className="input-field" value={settings.store_name} onChange={e => setSettings({...settings, store_name: e.target.value})} />
          </div>
          <div>
            <label className="block font-medium mb-2">Brand Story</label>
            <textarea className="input-field" rows="4" value={settings.brand_story} onChange={e => setSettings({...settings, brand_story: e.target.value})} />
          </div>
          <div>
            <label className="block font-medium mb-2">Shipping Method</label>
            <select className="input-field" value={settings.shipping_method} onChange={e => setSettings({...settings, shipping_method: e.target.value})}>
              <option value="self">Self Managed</option>
              <option value="shiprocket">Shiprocket</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-2">Free Shipping Threshold (₹)</label>
              <input type="number" className="input-field" value={settings.free_shipping_threshold} onChange={e => setSettings({...settings, free_shipping_threshold: e.target.value})} />
            </div>
            <div>
              <label className="block font-medium mb-2">Flat Shipping Rate (₹)</label>
              <input type="number" className="input-field" value={settings.flat_shipping_rate} onChange={e => setSettings({...settings, flat_shipping_rate: e.target.value})} />
            </div>
          </div>
          <div>
            <label className="block font-medium mb-2">Tax Rate (%)</label>
            <input type="number" step="0.01" className="input-field" value={settings.tax_rate} onChange={e => setSettings({...settings, tax_rate: e.target.value})} />
          </div>
          <button type="submit" className="btn-primary">Save Settings</button>
        </form>
      </div>
    </div>
  )
}
