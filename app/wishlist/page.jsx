'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { wishlistAPI, cartAPI } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function WishlistPage() {
  const router = useRouter()
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  // Helper to get full image URL
  const getImageUrl = (image) => {
    if (!image) return null
    const url = typeof image === 'object' ? image.url : image
    if (!url) return null
    if (url.startsWith('http')) return url
    return `http://localhost:8000${url}`
  }

  useEffect(() => {
    fetchWishlist()
  }, [])

  const fetchWishlist = async () => {
    try {
      const response = await wishlistAPI.get()
      setWishlist(response.data.data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (productId) => {
    try {
      await wishlistAPI.remove(productId)
      fetchWishlist()
    } catch (error) {
      alert('Failed to remove item')
    }
  }

  const addToCart = async (productId) => {
    try {
      await cartAPI.add({ product_id: productId, quantity: 1 })
      alert('Added to cart!')
    } catch (error) {
      alert('Failed to add to cart')
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
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="card text-center py-12">
            <p className="text-gray-500 mb-4">Your wishlist is empty</p>
            <button onClick={() => router.push('/products')} className="btn-primary">
              Browse Products
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlist.map((item) => (
              <div key={item.id} className="card">
                <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                  {item.product?.images?.[0] ? (
                    <img
                      src={getImageUrl(item.product.images[0])}
                      alt={item.product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span className={`text-gray-400 ${item.product?.images?.[0] ? 'hidden' : 'flex'}`}>No Image</span>
                </div>

                <h3 className="font-semibold text-lg mb-2 line-clamp-2">
                  {item.product?.name}
                </h3>
                
                <p className="text-2xl font-bold text-primary mb-4">
                  ₹{item.product?.price}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart(item.product_id)}
                    className="flex-1 btn-primary text-sm"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => removeItem(item.product_id)}
                    className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  )
}
