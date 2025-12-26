/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { productAPI, cartAPI, wishlistAPI, getAssetUrl } from '@/lib/api'
import Navbar from '@/components/Navbar'
import Navbar from '@/components/Navbar'

export default function ProductDetailsPage({ params }) {
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const [isAdding, setIsAdding] = useState(false)
  const [isInCart, setIsInCart] = useState(false)
  const [isInWishlist, setIsInWishlist] = useState(false)
  const [isAddingToWishlist, setIsAddingToWishlist] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getById(params.id)
        setProduct(response.data.data)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  const addToCart = async () => {
    setIsAdding(true)
    try {
      await cartAPI.add({ product_id: product.id, quantity })
      setMessage('Added to cart!')
      setIsInCart(true)
      window.dispatchEvent(new Event('cartUpdated'))
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Failed to add to cart')
    } finally {
      setIsAdding(false)
    }
  }

  const toggleWishlist = async () => {
    setIsAddingToWishlist(true)
    try {
      if (isInWishlist) {
        await wishlistAPI.remove(product.id)
        setMessage('Removed from wishlist!')
        setIsInWishlist(false)
      } else {
        await wishlistAPI.add({ product_id: product.id })
        setMessage('Added to wishlist!')
        setIsInWishlist(true)
      }
      setTimeout(() => setMessage(''), 3000)
    } catch (error) {
      setMessage('Failed to update wishlist')
    } finally {
      setIsAddingToWishlist(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">Loading...</div>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">Product not found</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <div className="bg-green-100 text-green-700 p-3 rounded-lg mb-4">
            {message}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Images */}
          <div>
            <div className="w-full h-96 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
              {product.images && product.images.length > 0 ? (
                <img
                  src={getAssetUrl(product.images.find(i => i.is_primary) || product.images[0])}
                  alt={product.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentNode.querySelector('.fallback-text').style.display = 'flex';
                  }}
                />
              ) : null}
              <span className={`text-gray-400 fallback-text ${product.images && product.images.length > 0 ? 'hidden' : 'flex'}`}>No Image</span>
            </div>
            {product.images && product.images.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {product.images.slice(0, 4).map((img, idx) => (
                  <div key={idx} className="aspect-square bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-75 transition">
                    <img
                      src={getAssetUrl(img)}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.style.display = 'none'}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

            <div className="flex items-center gap-4 mb-4">
              <span className="text-4xl font-bold text-primary">₹{product.price}</span>
            </div>

            {product.seller && (
              <div className="mb-4 pb-4 border-b">
                <span className="text-gray-600">Sold by: </span>
                <span className="font-semibold">{product.seller.name}</span>
              </div>
            )}

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Description</h3>
              <p className="text-gray-700">{product.description}</p>
            </div>

            {product.category && (
              <div className="mb-6">
                <span className="text-gray-600">Category: </span>
                <span className="font-semibold">{product.category.name}</span>
              </div>
            )}

            {product.brand && (
              <div className="mb-6">
                <span className="text-gray-600">Brand: </span>
                <span className="font-semibold">{product.brand}</span>
              </div>
            )}

            {product.stock > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Quantity</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    -
                  </button>
                  <span className="px-6">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-4 py-2 bg-gray-200 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="flex gap-4">
              <button
                onClick={addToCart}
                disabled={product.stock === 0 || isAdding}
                className="flex-1 btn-primary disabled:opacity-50"
              >
                {isAdding ? 'Adding...' : isInCart ? 'Item Added' : 'Add to Cart'}
              </button>
              <button
                onClick={toggleWishlist}
                disabled={isAddingToWishlist}
                className="px-6 py-2 border-2 border-primary text-primary rounded-lg hover:bg-primary hover:text-white transition disabled:opacity-50"
              >
                <span className="transition-all duration-300">
                  {isInWishlist ? '❤️' : '🤍'} {isAddingToWishlist ? 'Processing...' : 'Wishlist'}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}
