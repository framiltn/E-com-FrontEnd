'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function SellerRedirect() {
  const router = useRouter()

  useEffect(() => {
    router.replace('/seller/dashboard')
  }, [router])

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p>Redirecting to dashboard...</p>
      </div>
    </div>
  )
}
