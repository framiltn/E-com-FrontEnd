'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { authAPI, cartAPI } from '@/lib/api'

export default function FlipNav({ isAdmin = false }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [cartCount, setCartCount] = useState(0)
    const [userRole, setUserRole] = useState('')
    const [searchQuery, setSearchQuery] = useState('')

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('token')
            if (token) {
                setIsLoggedIn(true)
                const role = localStorage.getItem('role') || 'buyer'
                setUserRole(role)
                if (role === 'buyer') {
                    fetchCartCount()
                }
            } else {
                setIsLoggedIn(false)
                setUserRole('')
                setCartCount(0)
            }
        }

        checkAuth()
        checkAuth()
        window.addEventListener('authChange', checkAuth)
        window.addEventListener('cartUpdated', fetchCartCount)

        return () => {
            window.removeEventListener('authChange', checkAuth)
            window.removeEventListener('cartUpdated', fetchCartCount)
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

    return (
        <nav className="bg-header-bg sticky top-0 z-50">
            <div className="max-w-[1200px] mx-auto px-4 h-16 flex items-center justify-between gap-8">
                {/* Logo */}
                <div className="flex-shrink-0 flex flex-col items-end">
                    <Link href="/">
                        <div className="text-white font-bold text-xl italic tracking-wide">
                            Marketplace
                            <span className="text-yellow-400 text-2xl">.</span>
                        </div>
                    </Link>
                    <span className="text-xs text-slate-200 italic -mt-1">
                        Explore <span className="text-yellow-400 font-bold">Plus</span>
                        <span className="text-yellow-400 text-xs ml-0.5">✦</span>
                    </span>
                </div>

                {/* Search Bar */}
                {
                    !isAdmin && (
                        <div className="flex-1 max-w-2xl relative">
                            <div className="bg-white rounded-[2px] shadow-sm flex items-center h-9">
                                <input
                                    type="text"
                                    name="q"
                                    id="search-input"
                                    placeholder="Search for products, brands and more"
                                    className="w-full h-full px-4 outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                                <button className="px-4 text-primary font-bold">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    )
                }

                {/* Right Actions */}
                <div className="flex items-center space-x-8">
                    {isLoggedIn ? (
                        <div className="relative group cursor-pointer">
                            <button className="bg-white text-primary px-8 py-[5px] font-bold text-sm shadow-sm rounded-[2px] hover:bg-white/90 transition-colors">
                                {userRole === 'admin' ? 'Admin' : userRole === 'seller' ? 'Seller' : 'My Account'}
                            </button>
                            {/* Dropdown Menu */}
                            {!isAdmin && (
                                <div className="absolute top-full left-0 w-60 pt-2 hidden group-hover:block">
                                    <div className="bg-white shadow-lg rounded-[2px] overflow-hidden">
                                        <div className="py-2">
                                            {(userRole === 'buyer' || userRole === 'seller') && (
                                                <>
                                                    <Link href="/profile" className="block px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 flex items-center gap-2">
                                                        <span className="text-primary">👤</span> My Profile
                                                    </Link>
                                                    <Link href="/orders" className="block px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 flex items-center gap-2">
                                                        <span className="text-primary">📦</span> Orders
                                                    </Link>
                                                    <Link href="/wishlist" className="block px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 flex items-center gap-2">
                                                        <span className="text-primary">❤️</span> Wishlist
                                                    </Link>
                                                    <Link href="/affiliate" className="block px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100 flex items-center gap-2">
                                                        <span className="text-primary">🤝</span> Affiliate Program
                                                    </Link>
                                                </>
                                            )}
                                            {userRole === 'admin' && (
                                                <Link href="/admin/dashboard" className="block px-4 py-3 hover:bg-gray-50 text-sm border-b border-gray-100">
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            <div className="px-4 py-3 hover:bg-gray-50 text-sm cursor-pointer" onClick={() => {
                                                localStorage.removeItem('token');
                                                localStorage.removeItem('role');
                                                window.location.href = '/login';
                                            }}>
                                                Logout
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <Link href="/login" className="bg-white text-primary px-10 py-[5px] font-bold text-sm shadow-sm rounded-[2px] hover:bg-white/90 transition-colors">
                            Login
                        </Link>
                    )}

                    {!isAdmin && (
                        <>
                            {userRole === 'buyer' ? (
                                <Link href="/seller/apply" className="text-white font-bold text-sm flex items-center gap-2">
                                    Become a Seller
                                </Link>
                            ) : userRole === 'seller' ? (
                                <Link href="/seller/dashboard" className="text-white font-bold text-sm flex items-center gap-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                                    </svg>
                                    Seller Dashboard
                                </Link>
                            ) : null}

                            <div className="relative group">
                                <span className="text-white font-bold text-sm cursor-pointer flex items-center gap-1">
                                    More
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mt-1 transition-transform group-hover:-rotate-180" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                    </svg>
                                </span>
                                <div className="absolute top-full right-0 w-48 pt-2 hidden group-hover:block">
                                    <div className="bg-white shadow-lg rounded-[2px] overflow-hidden py-2">
                                        <Link href="/notifications" className="block px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-100">
                                            Notification Preferences
                                        </Link>
                                        <Link href="/help" className="block px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 border-b border-gray-100">
                                            24x7 Customer Care
                                        </Link>
                                        <Link href="/app" className="block px-4 py-3 hover:bg-gray-50 text-sm text-gray-700">
                                            Download App
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {userRole === 'buyer' && (
                                <Link href="/cart" className="text-white font-bold text-sm flex items-center gap-2">
                                    <span className="relative">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                        </svg>
                                        {cartCount > 0 && (
                                            <span className="absolute -top-2 -right-2 bg-yellow-400 text-primary text-[10px] rounded-full w-4 h-4 flex items-center justify-center font-bold">
                                                {cartCount}
                                            </span>
                                        )}
                                    </span>
                                    Cart
                                </Link>
                            )}
                        </>
                    )}
                </div>
            </div >
        </nav >
    )
}
