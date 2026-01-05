/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { productAPI, cartAPI, wishlistAPI, reviewAPI, getAssetUrl } from '@/lib/api'

export default function ProductDetailsPage({ params }) {
  const router = useRouter()
  const [product, setProduct] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedImage, setSelectedImage] = useState(null)
  const [reviews, setReviews] = useState([])

  // States for interactive elements
  const [pincode, setPincode] = useState('')
  const [isAddingCart, setIsAddingCart] = useState(false)
  const [cartAdded, setCartAdded] = useState(false)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productAPI.getById(params.id)
        setProduct(response.data.data)
        if (response.data.data.images?.length > 0) {
          setSelectedImage(response.data.data.images.find(i => i.is_primary) || response.data.data.images[0])
        }

        // Fetch Reviews
        try {
          const reviewRes = await reviewAPI.getProductReviews(params.id)
          setReviews(reviewRes.data.data || reviewRes.data || [])
        } catch (e) {
          console.warn('Failed to load reviews', e)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [params.id])

  const handleAddToCart = async () => {
    setIsAddingCart(true)
    try {
      await cartAPI.add({ product_id: product.id, quantity: 1 })
      setCartAdded(true)
      window.dispatchEvent(new Event('cartUpdated'))
      // Optional: Redirect to cart or show toast
    } catch (err) {
      console.error(err)
    } finally {
      setIsAddingCart(false)
    }
  }

  const handleBuyNow = async () => {
    await handleAddToCart();
    router.push('/checkout');
  }

  if (loading) return (
    <div className="min-h-screen bg-secondary">
      <div className="flex justify-center items-center h-[60vh]">
        <div className="w-10 h-10 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
      </div>
    </div>
  )

  if (!product) return (
    <div className="min-h-screen bg-secondary">
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-gray-500">Product not found</div>
    </div>
  )

  return (
    <div className="min-h-screen bg-secondary font-sans text-sm">

      <div className="max-w-[1400px] mx-auto px-2 lg:px-4 py-4">
        <div className="bg-white shadow-sm flex flex-col lg:flex-row min-h-[800px]">

          {/* LEFT COLUMN - Images & Action Buttons */}
          <div className="w-full lg:w-[40%] p-4 lg:sticky lg:top-16 self-start flex flex-col relative border-r border-gray-100">
            {/* Main Image Area */}
            <div className="flex flex-col-reverse lg:flex-row gap-4 h-full relative">
              {/* Thumbnails List */}
              <div className="flex lg:flex-col gap-2 overflow-auto no-scrollbar lg:h-[450px] lg:w-16 flex-shrink-0">
                {product.images?.map((img, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setSelectedImage(img)}
                    className={`w-16 h-16 border-2 rounded-[2px] cursor-pointer overflow-hidden p-1 flex items-center justify-center ${selectedImage?.id === img.id ? 'border-primary' : 'border-transparent hover:border-primary/50'}`}
                  >
                    <img src={getAssetUrl(img)} className="max-h-full max-w-full object-contain" alt={`Thumbnail ${idx + 1}`} />
                  </div>
                ))}
              </div>

              {/* Main Image Display */}
              <div className="flex-1 h-[300px] lg:h-[450px] relative flex items-center justify-center p-4">
                {/* Wishlist Heart */}
                <button className="absolute top-0 right-0 p-2 shadow rounded-full bg-white z-10 text-gray-300 hover:text-red-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="none">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <img
                  src={getAssetUrl(selectedImage || product.images?.[0])}
                  className="max-h-full max-w-full object-contain transition-transform hover:scale-105 duration-300"
                  alt={product.name}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-8 lg:px-4">
              <button
                onClick={handleAddToCart}
                disabled={isAddingCart || cartAdded}
                className={`flex-1 overflow-hidden py-3.5 rounded-[2px] font-bold text-base lg:text-lg flex items-center justify-center gap-2 shadow-sm transition-colors ${cartAdded ? 'bg-green-600 text-white' : 'bg-header-bg text-white hover:bg-gray-800'}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                {cartAdded ? 'GO TO CART' : 'ADD TO CART'}
              </button>
              <button
                onClick={handleBuyNow}
                className="flex-1 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-[2px] font-bold text-base lg:text-lg flex items-center justify-center gap-2 shadow-sm transition-colors"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
                BUY NOW
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN - Details */}
          <div className="flex-1 p-6 lg:pl-8">
            {/* Breadcrumbs (Mock) */}
            <div className="text-xs text-gray-500 mb-2 flex items-center gap-1">
              <span>Home</span> › <span>{product.category?.name || 'Category'}</span> › <span className="text-gray-400">product.name</span>
            </div>

            <h1 className="text-xl font-medium text-gray-900 mb-2">{product.name}</h1>

            {/* Ratings */}
            <div className="flex items-center gap-2 mb-3">
              <span className="bg-green-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-[3px] flex items-center gap-1">
                4.4 <span className="text-[10px]">★</span>
              </span>
              <span className="text-gray-500 font-medium text-sm">
                1,234 Ratings & 100 Reviews
              </span>
              <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/fa_62673a.png" className="h-5 ml-2" alt="Assured" />
            </div>

            {/* Price */}
            <div className="flex items-end gap-3 mb-4">
              <span className="text-3xl font-medium text-gray-900">₹{product.price}</span>
              <span className="text-gray-500 line-through text-base">₹{Math.round(product.price * 1.2)}</span>
              <span className="text-green-600 font-bold text-sm">20% off</span>
            </div>

            {/* Available Offers */}
            <div className="mb-6">
              <h3 className="text-sm font-bold text-gray-800 mb-2">Available offers</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" className="h-4 w-4 mt-0.5" alt="Offer Icon" />
                  <span><span className="font-medium">Bank Offer</span> 5% Cashback on Axis Bank Card</span>
                </li>
                <li className="flex items-start gap-2">
                  <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" className="h-4 w-4 mt-0.5" alt="Offer Icon" />
                  <span><span className="font-medium">Special Price</span> Get extra 10% off (price inclusive of cashback/coupon)</span>
                </li>
                <li className="flex items-start gap-2">
                  <img src="https://rukminim1.flixcart.com/www/36/36/promos/06/09/2016/c22c9fc4-0555-4460-8401-bf5c28d7ba29.png?q=90" className="h-4 w-4 mt-0.5" alt="Offer Icon" />
                  <span><span className="font-medium">Partner Offer</span> Sign up for Pay Later and get ₹500 Gift Card</span>
                </li>
              </ul>
            </div>

            {/* Delivery */}
            <div className="flex gap-16 mb-6">
              <span className="text-gray-500 font-medium w-24 flex-shrink-0">Delivery</span>
              <div className="flex flex-col gap-2">
                <div className="border-b-2 border-primary pb-1 inline-flex items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Enter Pincode"
                    className="outline-none text-sm font-medium w-32"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                  />
                  <button className="text-primary font-bold text-sm">Check</button>
                </div>
                <span className="text-xs text-gray-500">Delivery by 11 PM, Tomorrow | <span className="text-green-600">Free</span> <span className="line-through">₹40</span></span>
              </div>
            </div>

            {/* Warranty (Mock) */}
            <div className="flex gap-16 mb-6">
              <span className="text-gray-500 font-medium w-24 flex-shrink-0">Warranty</span>
              <span className="text-sm">1 Year On Site Warranty</span>
            </div>

            {/* Seller */}
            <div className="flex gap-16 mb-8">
              <span className="text-gray-500 font-medium w-24 flex-shrink-0">Seller</span>
              <div className="text-sm">
                <div className="font-medium text-primary flex items-center gap-2">
                  {product.seller?.name || 'RetailNet'}
                  <span className="bg-primary text-white text-[10px] px-1.5 rounded-full">4.9 ★</span>
                </div>
                <ul className="list-disc pl-4 mt-2 text-gray-600 space-y-1">
                  <li>7 Days Replacement Policy</li>
                  <li>GST invoice available</li>
                </ul>
              </div>
            </div>

            {/* Product Description */}
            <div className="border border-gray-100 rounded-[2px] mb-8">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-medium">Product Description</h2>
              </div>
              <div className="p-4 text-sm text-gray-700 leading-relaxed">
                {product.description}
                <p className="mt-4 text-gray-500 text-xs">Product Code: {product.sku || 'N/A'}</p>
              </div>
            </div>

            {/* Specifications (Mock) */}
            <div className="border border-gray-100 rounded-[2px]">
              <div className="p-4 border-b border-gray-100">
                <h2 className="text-xl font-medium">Specifications</h2>
              </div>
              <div className="p-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="flex py-2 border-b border-gray-50">
                    <div className="w-1/3 text-gray-500">General</div>
                    <div className="w-2/3">{product.name}</div>
                  </div>
                  <div className="flex py-2 border-b border-gray-50">
                    <div className="w-1/3 text-gray-500">In The Box</div>
                    <div className="w-2/3">1 x {product.name}, Warranty Card, User Manual</div>
                  </div>
                  {/* Dynamic specs if available */}
                </div>
              </div>
            </div>

            {/* Reviews Section */}
            <div className="border border-gray-100 rounded-[2px] mt-8">
              <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h2 className="text-xl font-medium">Ratings & Reviews</h2>
                <button className="bg-white border border-gray-300 shadow-sm px-4 py-2 font-medium text-sm rounded-[2px] hover:shadow-md">Rate Product</button>
              </div>
              <div className="p-4">
                {reviews.length === 0 ? (
                  <div className="text-gray-500 text-center py-4">No reviews yet. Be the first to review this product!</div>
                ) : (
                  <div className="space-y-6">
                    {reviews.map((review, idx) => (
                      <div key={idx} className="border-b border-gray-50 pb-4 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className={`text-white text-xs px-1.5 py-0.5 rounded-[2px] flex items-center ${review.rating >= 3 ? 'bg-green-600' : 'bg-red-500'}`}>
                            {review.rating} ★
                          </div>
                          <span className="font-medium text-sm">{review.title || 'Nice Product'}</span>
                        </div>
                        <p className="text-sm text-gray-700 mb-3 ml-0">{review.comment}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <span className="font-medium text-gray-500">{review.user?.name || 'Flipkart Customer'}</span>
                          <span>•</span>
                          <span>{new Date(review.created_at || Date.now()).toLocaleDateString()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  )
}
