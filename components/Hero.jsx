/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    setUserRole(localStorage.getItem('role') || '')
  }, [])

  return (
    <div className="relative bg-gray-900 text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="/hero-bg.png"
          alt="Marketplace Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/80 to-secondary/80 mix-blend-multiply" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight leading-tight">
            Discover the Best <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
              Marketplace Deals
            </span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-gray-200 font-light">
            Shop from top vendors, find exclusive products, and earn rewards with every purchase.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/products" className="bg-white text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Start Shopping
            </Link>
            {userRole !== 'seller' && userRole !== 'admin' && (
              <Link href="/seller/apply" className="bg-transparent border-2 border-white/80 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white/10 transition backdrop-blur-sm">
                Become a Seller
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
