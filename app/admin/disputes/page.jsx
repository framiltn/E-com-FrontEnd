'use client'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function AdminDisputes() {
  const [disputes, setDisputes] = useState([])

  useEffect(() => {
    api.get('/admin/disputes').then(res => setDisputes(res.data.data || [])).catch(console.error)
  }, [])

  const resolve = async (id) => {
    const resolution = prompt('Enter resolution:')
    if (!resolution) return
    try {
      await api.post(`/admin/disputes/${id}/resolve`, { resolution })
      setDisputes(disputes.filter(d => d.id !== id))
      alert('Dispute resolved')
    } catch (error) {
      alert('Error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Disputes</h1>
        <div className="space-y-4">
          {disputes.map(dispute => (
            <div key={dispute.id} className="card">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold">Order #{dispute.order_id}</h3>
                <span className="text-sm text-gray-500">{dispute.status}</span>
              </div>
              <p className="text-sm mb-2">{dispute.reason}</p>
              <p className="text-gray-600 mb-4">{dispute.description}</p>
              {dispute.status === 'open' && (
                <button onClick={() => resolve(dispute.id)} className="btn-primary">Resolve</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
