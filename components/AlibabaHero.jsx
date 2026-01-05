'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

export default function AlibabaHero() {
    const categories = [
        "Consumer Electronics", "Apparel & Accessories", "Vehicle Parts & Accessories",
        "Sports & Entertainment", "Machinery", "Home & Garden", "Beauty & Personal Care",
        "All Categories"
    ]

    return (
        <div className="bg-white border-b border-gray-200">
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="grid grid-cols-12 gap-4 h-[400px]">

                    {/* Left Sidebar - Categories */}
                    <div className="hidden lg:block col-span-2 relative">
                        <div className="h-full py-2">
                            <ul className="space-y-1">
                                {categories.map((cat, idx) => (
                                    <li key={idx} className="px-2 py-2 text-sm text-text hover:bg-gray-100 cursor-pointer rounded-md flex justify-between items-center group">
                                        <span>{cat}</span>
                                        <svg className="w-3 h-3 text-gray-400 group-hover:text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* Center - Main Slider (Placeholder) */}
                    <div className="col-span-12 lg:col-span-7 h-full relative rounded-lg overflow-hidden bg-gray-900 group">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent z-10 p-12 flex flex-col justify-center text-white">
                            <h2 className="text-4xl font-bold mb-4">Global Trading <br /> Made Easy</h2>
                            <p className="text-lg mb-8 opacity-90">Source from verified suppliers worldwide</p>
                            <button className="bg-primary text-white w-fit px-8 py-3 rounded-full font-medium hover:bg-primary-dark transition-colors">
                                View Options
                            </button>
                        </div>
                        {/* Abstract Background for Slider */}
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-60 group-hover:scale-105 transition-transform duration-700"
                            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070&auto=format&fit=crop')" }}
                        ></div>
                    </div>

                    {/* Right Widget - User & Actions */}
                    <div className="hidden lg:grid col-span-3 grid-rows-3 gap-4 h-full">

                        {/* User Welcome Card */}
                        <div className="bg-secondary/50 p-4 rounded-lg row-span-1 flex flex-col justify-between">
                            <div className="flex items-center space-x-3 mb-2">
                                <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                                </div>
                                <div>
                                    <p className="text-sm font-medium">Welcome to Alibaba.com</p>
                                    <div className="flex space-x-2 mt-1">
                                        <Link href="/login" className="bg-primary text-white text-xs px-3 py-1 rounded-full hover:bg-primary-dark">Sign In</Link>
                                        <Link href="/register" className="bg-white border border-gray-300 text-xs px-3 py-1 rounded-full hover:bg-gray-50">Join Free</Link>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Pro Buyer Card */}
                        <div className="bg-[#FFF8F0] p-4 rounded-lg row-span-1 border border-orange-100">
                            <h3 className="font-bold text-primary mb-1">Alibaba.com Pro</h3>
                            <p className="text-xs text-text-light mb-3">Exclusive access to premium suppliers</p>
                            <div className="text-right">
                                <a href="#" className="text-xs font-bold text-primary hover:underline">Learn More &rarr;</a>
                            </div>
                        </div>

                        {/* RFQ Card */}
                        <div className="bg-white p-4 rounded-lg row-span-1 border border-gray-200">
                            <h3 className="font-bold text-text mb-2 block">Request for Quotation</h3>
                            <button className="w-full bg-primary text-white text-sm py-2 rounded-full hover:bg-primary-dark transition-colors">
                                Post Request
                            </button>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}
