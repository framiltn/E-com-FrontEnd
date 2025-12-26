/* eslint-disable @next/next/no-img-element */
import Link from 'next/link'
import { getAssetUrl } from '@/lib/api'

export default function ProductCard({ product }) {
  return (
    <Link href={`/products/${product.id}`}>
      <div className="card hover:shadow-xl transition cursor-pointer">
        {/* Product Image */}
        <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
          {product.images && product.images.length > 0 ? (
            <img
              src={getAssetUrl(product.images[0])}
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

        {/* Product Info */}
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">
          {product.name}
        </h3>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <span className="text-2xl font-bold text-primary">
            ₹{product.price}
          </span>
        </div>

        {/* Seller Info */}
        {product.seller && (
          <div className="mt-3 pt-3 border-t text-sm text-gray-500">
            by {product.seller.name}
          </div>
        )}
      </div>
    </Link>
  )
}
