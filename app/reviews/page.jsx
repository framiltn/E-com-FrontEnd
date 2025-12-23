'use client'
import { useState, useEffect } from 'react'
import api from '@/lib/api'
import Navbar from '@/components/Navbar'

export default function ReviewsPage() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    api.get('/reviews/my').then(res => setReviews(res.data.data || [])).catch(console.error)
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Reviews</h1>
        <div className="space-y-4">
          {reviews.map(review => (
            <div key={review.id} className="card">
              <div className="flex justify-between mb-2">
                <h3 className="font-bold">{review.product?.name}</h3>
                <span className="text-yellow-500">{'⭐'.repeat(review.rating)}</span>
              </div>
              <p className="text-gray-600">{review.comment}</p>
              <p className="text-sm text-gray-500 mt-2">{new Date(review.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
