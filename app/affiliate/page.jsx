'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { affiliateAPI } from '@/lib/api'

export default function AffiliatePage() {
  const router = useRouter()
  const [affiliate, setAffiliate] = useState(null)
  const [referrals, setReferrals] = useState([])
  const [loading, setLoading] = useState(true)
  const [isJoined, setIsJoined] = useState(false)
  const [joinLoading, setJoinLoading] = useState(false)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    if (!token) {
      // Redirect to login if not authenticated
      router.push('/login?redirect=/affiliate')
      return
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const affResponse = await affiliateAPI.getProfile().catch(() => null)

      if (affResponse) {
        setAffiliate(affResponse.data)
        setIsJoined(true)
        const refResponse = await affiliateAPI.getReferrals()
        setReferrals(refResponse.data.data || [])
      } else {
        setIsJoined(false)
      }
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleJoin = async () => {
    try {
      setJoinLoading(true)
      const res = await affiliateAPI.join()
      alert(res.data.message)
      fetchData() // Refresh to show dashboard
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to join affiliate program.')
    } finally {
      setJoinLoading(false)
    }
  }

  const copyReferralLink = () => {
    const link = `${window.location.origin}/register?ref=${affiliate?.referral_code}`
    navigator.clipboard.writeText(link)
    alert('Referral link copied!')
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">Loading...</div>
    </div>
  )

  if (!isJoined) return (
    <div className="min-h-screen bg-gray-50">

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[60vh]">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <h1 className="text-3xl font-bold mb-4 text-gray-900">Join the Affiliate Program</h1>
          <p className="text-gray-600 mb-4">
            Earn commissions by referring friends and family!
            Get up to 9% commission on every sale.
          </p>

          <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded mb-6">
            <strong>Note:</strong> You must have placed at least one order to be eligible for the affiliate program.
          </div>

          <button
            onClick={handleJoin}
            disabled={joinLoading}
            className="w-full bg-primary text-white py-3 rounded-md hover:bg-opacity-90 transition-all font-semibold text-lg disabled:opacity-50"
          >
            {joinLoading ? 'Joining...' : 'Activate Affiliate Account'}
          </button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">



      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">Affiliate Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card">
            <h3 className="text-gray-600 text-sm mb-2">Total Earnings</h3>
            <p className="text-3xl font-bold text-primary">₹{affiliate?.earnings || 0}</p>
          </div>
          <div className="card">
            <h3 className="text-gray-600 text-sm mb-2">Total Referrals</h3>
            <p className="text-3xl font-bold">{referrals.length}</p>
          </div>
          <div className="card">
            <h3 className="text-gray-600 text-sm mb-2">Commission Scheme</h3>
            <p className="text-2xl font-bold">{affiliate?.commission_scheme || '9-6-3'}</p>
          </div>
        </div>

        <div className="card mb-8">
          <h2 className="text-xl font-bold mb-4">Your Referral Link</h2>
          <div className="flex gap-2">
            <input
              type="text"
              readOnly
              value={`${typeof window !== 'undefined' ? window.location.origin : ''}/register?ref=${affiliate?.referral_code || ''}`}
              className="input-field flex-1"
            />
            <button onClick={copyReferralLink} className="btn-primary">
              Copy Link
            </button>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            Share this link to earn commissions on sales from your referrals!
          </p>
        </div>

        <div className="card">
          <h2 className="text-xl font-bold mb-4">My Referrals</h2>
          {referrals.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No referrals yet. Start sharing your link!</p>
          ) : (
            <div className="space-y-3">
              {referrals.map((ref) => (
                <div key={ref.id} className="flex justify-between items-center border-b pb-3">
                  <div>
                    <p className="font-semibold">{ref.referred?.name}</p>
                    <p className="text-sm text-gray-600">Level {ref.level}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">₹{ref.total_commission || 0}</p>
                    <p className="text-sm text-gray-600">Total Commission</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}
