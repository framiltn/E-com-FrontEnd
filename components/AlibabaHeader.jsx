'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function AlibabaHeader() {
    const [categoryOpen, setCategoryOpen] = useState(false)

    return (
        <header className="font-sans">
            {/* Top Bar */}
            <div className="bg-white border-b border-gray-100 hidden md:block">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 h-8 flex justify-between items-center text-xs text-text-light">
                    <div className="flex space-x-4">
                        <span className="hover:text-primary cursor-pointer">English-USD</span>
                        <span className="hover:text-primary cursor-pointer">Help Center</span>
                    </div>
                    <div className="flex space-x-6">
                        <Link href="/seller/apply" className="hover:text-primary">Sell on Alibaba</Link>
                        <Link href="/help" className="hover:text-primary">Help</Link>
                        <Link href="/messages" className="hover:text-primary">Messages</Link>
                        <Link href="/orders" className="hover:text-primary">Orders</Link>
                        <Link href="/cart" className="hover:text-primary font-bold">Cart</Link>
                    </div>
                </div>
            </div>

            {/* Main Bar */}
            <div className="bg-white py-4 md:py-6 shadow-sm sticky top-0 z-50">
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
                    {/* Logo */}
                    <Link href="/" className="text-3xl font-bold text-black tracking-tight shrink-0">
                        Alibaba<span className="text-text-light font-normal text-sm ml-1">.com</span>
                    </Link>

                    {/* Search Bar */}
                    <div className="flex-1 max-w-3xl">
                        <div className="flex h-10 md:h-12 border-2 border-primary rounded-full overflow-hidden hover:shadow-md transition-shadow">
                            <div className="hidden md:flex items-center px-4 border-r border-gray-200 bg-gray-50 text-sm text-text cursor-pointer hover:bg-gray-100 min-w-[100px] justify-between">
                                <span>Products</span>
                                <svg className="w-3 h-3 ml-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                            </div>
                            <input
                                type="text"
                                placeholder="What are you looking for..."
                                className="flex-1 px-4 text-sm focus:outline-none"
                            />
                            <div className="px-3 flex items-center cursor-pointer border-l border-gray-100 hover:bg-gray-50">
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                            </div>
                            <button className="bg-primary text-white px-8 md:px-10 font-medium text-base md:text-lg hover:bg-primary-dark transition-colors flex items-center">
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
                                Search
                            </button>
                        </div>
                    </div>

                    {/* User Actions */}
                    <div className="hidden md:flex items-center space-x-6 shrink-0">
                        <div className="flex items-center cursor-pointer group">
                            <div className="w-8 h-8 text-gray-400">
                                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
                            </div>
                            <div className="ml-2 text-xs text-text-light group-hover:text-primary">
                                <p>Sign In</p>
                                <p className="font-bold">Join Free</p>
                            </div>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer text-text-light hover:text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                            <span className="text-[10px]">Messages</span>
                        </div>
                        <div className="flex flex-col items-center cursor-pointer text-text-light hover:text-primary">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                            <span className="text-[10px]">Cart</span>
                        </div>
                    </div>
                </div>

                {/* Categories Bar */}
                <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 mt-4 hidden md:flex items-center space-x-6 text-sm text-text font-medium overflow-x-auto">
                    <div className="flex items-center space-x-2 hover:text-primary cursor-pointer shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        <span>All Categories</span>
                    </div>
                    <Link href="/featured" className="hover:text-primary whitespace-nowrap">Featured Selections</Link>
                    <Link href="/trade-assurance" className="hover:text-primary whitespace-nowrap">Trade Assurance</Link>
                    <Link href="/ready-to-ship" className="hover:text-primary whitespace-nowrap">Ready to Ship</Link>
                    <Link href="/buyer-central" className="hover:text-primary whitespace-nowrap">Buyer Central</Link>
                    <Link href="/sell" className="hover:text-primary whitespace-nowrap">Sell on Alibaba</Link>
                    <Link href="/help" className="hover:text-primary whitespace-nowrap">Help Center</Link>
                </div>
            </div>
        </header>
    )
}
