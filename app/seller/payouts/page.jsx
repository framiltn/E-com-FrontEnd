'use client'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function SellerPayouts() {
  const [payouts, setPayouts] = useState([])

  useEffect(() => {
    api.get('/payouts').then(res => setPayouts(res.data.data || [])).catch(console.error)
  }, [])

  const requestPayout = async () => {
    try {
      await api.post('/payouts')
      alert('Payout requested')
      api.get('/payouts').then(res => setPayouts(res.data.data || []))
    } catch (error) {
      alert('Error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Payouts</h1>
          <button onClick={requestPayout} className="btn-primary">Request Payout</button>
        </div>
        <div className="space-y-4">
          {payouts.map(payout => (
            <div key={payout.id} className="card flex justify-between items-center">
              <div>
                <p className="font-bold">₹{payout.amount}</p>
                <p className="text-sm text-gray-600">{new Date(payout.created_at).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${payout.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {payout.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
