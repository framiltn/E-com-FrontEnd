/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { getAssetUrl } from '@/lib/api'

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="bg-white hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden p-4 relative group rounded-[2px]">
        {/* Wishlist Heart */}
        <div className="absolute top-4 right-4 z-10 text-gray-300 group-hover:block hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" stroke="none">
            <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </div>

        {/* Product Image */}
        <div className="w-full h-40 relative flex items-center justify-center mb-2">
          {product.images && product.images.length > 0 ? (
            <img
              src={getAssetUrl(product.images[0])}
              alt={product.name}
              className="max-h-full max-w-full object-contain transform group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentNode.querySelector('.fallback-text').style.display = 'flex';
              }}
            />
          ) : null}
          <span className={`text-gray-400 fallback-text text-xs ${product.images && product.images.length > 0 ? 'hidden' : 'flex'}`}>No Image</span>
        </div>

        {/* Product Info */}
        <div className="space-y-1">
          <h3 className="font-medium text-sm text-gray-900 truncate group-hover:text-primary">
            {product.name}
          </h3>

          {/* Rating Badge */}
          <div className="flex items-center space-x-2">
            <span className="bg-green-600 text-white text-[12px] font-bold px-1.5 py-0.5 rounded-[2px] flex items-center gap-0.5">
              4.4 <span className="text-[10px]">★</span>
            </span>
            <span className="text-gray-500 text-xs font-medium">
              (1,234)
            </span>
          </div>

          <div className="flex items-center gap-2 mt-1">
            <span className="text-base font-bold text-gray-900">
              ₹{product.price}
            </span>
            <span className="text-sm text-gray-500 line-through">
              ₹{Math.round(product.price * 1.2)}
            </span>
            <span className="text-xs font-bold text-green-600">
              20% off
            </span>
          </div>

          {product.seller && (
            <p className="text-xs text-gray-500">Free delivery</p>
          )}
        </div>
      </div>
    </Link>
  )
}
