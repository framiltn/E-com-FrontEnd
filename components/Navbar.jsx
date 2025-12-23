'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

import { authAPI, cartAPI } from '@/lib/api'

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      setIsLoggedIn(true)
      // Fetch latest user data to sync role
      authAPI.getUser()
        .then(res => {
          const role = res.data.role || 'buyer'
          setUserRole(role)
          localStorage.setItem('role', role)
          if (role === 'buyer') {
            fetchCartCount()
          }
        })
        .catch(() => {
          // If token is invalid
          localStorage.removeItem('token')
          setIsLoggedIn(false)
        })
    } else {
      setIsLoggedIn(false)
      setUserRole('')
    }
  }, [])

  const fetchCartCount = async () => {
    try {
      const response = await cartAPI.get()
      setCartCount(response.data.count || 0)
    } catch (error) {
      console.error('Error fetching cart count:', error)
    }
  }

  // Listen for cart updates
  useEffect(() => {
    const handleCartUpdate = () => {
      if (userRole === 'buyer') {
        fetchCartCount()
      }
    }
    window.addEventListener('cartUpdated', handleCartUpdate)
    return () => window.removeEventListener('cartUpdated', handleCartUpdate)
  }, [userRole])

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-primary">
            Marketplace
          </Link>

          {/* Search Bar - Hidden for Admins and Sellers */}
          {userRole !== 'admin' && userRole !== 'seller' && (
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <input
                type="text"
                placeholder="Search products..."
                className="input-field"
              />
            </div>
          )}

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">


            {isLoggedIn ? (
              <>
                {userRole === 'admin' && (
                  <Link href="/admin/dashboard" className="text-gray-700 hover:text-primary">
                    Admin
                  </Link>
                )}
                {userRole === 'seller' && (
                  <Link href="/seller" className="text-gray-700 hover:text-primary">
                    Seller
                  </Link>
                )}
                {userRole === 'buyer' && (
                  <>
                    <Link href="/wishlist" className="text-gray-700 hover:text-primary">
                      Wishlist
                    </Link>
                    <Link href="/cart" className="relative text-gray-700 hover:text-primary">
                      🛒 Cart
                      {cartCount > 0 && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                          {cartCount}
                        </span>
                      )}
                    </Link>
                    <Link href="/orders" className="text-gray-700 hover:text-primary">
                      Orders
                    </Link>
                    <Link href="/affiliate" className="text-gray-700 hover:text-primary">
                      Affiliate
                    </Link>
                    <Link href="/seller/apply" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                      Become a Seller
                    </Link>
                  </>
                )}
                <Link href="/profile" className="text-gray-700 hover:text-primary">
                  Profile
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign Up
                </Link>
                <Link href="/seller/apply" className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">
                  Become a Seller
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
