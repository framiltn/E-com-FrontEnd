'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Footer() {
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    setUserRole(localStorage.getItem('role') || '')
  }, [])

  return (
    <footer className="bg-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="text-xl font-bold mb-4">Marketplace</h3>
            <p className="text-gray-400">
              Your trusted multi-vendor marketplace with affiliate rewards
            </p>
          </div>

          {/* Quick Links */}
          {userRole !== 'admin' && userRole !== 'seller' && (
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/products" className="hover:text-white">Products</Link></li>
                <li><Link href="/categories" className="hover:text-white">Categories</Link></li>
                <li><Link href="/seller/apply" className="hover:text-white">Become a Seller</Link></li>
                <li><Link href="/affiliate" className="hover:text-white">Affiliate Program</Link></li>
              </ul>
            </div>
          )}

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
              <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/refund" className="hover:text-white">Refund Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2025 Marketplace. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
