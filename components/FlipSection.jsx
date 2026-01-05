'use client'
import Link from 'next/link'

export default function FlipSection({ title, products = [], linkText = 'VIEW ALL' }) {
    // Generate dummy products if none provided for mockup
    const displayProducts = products.length > 0 ? products : []

    return (
        <div className="bg-white shadow-sm my-4">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                <Link href="#" className="bg-primary text-white text-sm font-bold px-4 py-2 rounded-[2px] shadow-sm hover:shadow-md transition-shadow">
                    {linkText}
                </Link>
            </div>

            <div className="flex overflow-x-auto no-scrollbar p-4 space-x-6">
                {displayProducts.map((prod, idx) => (
                    <Link key={idx} href={`/products?search=${encodeURIComponent(prod.name)}`} className="min-w-[180px] text-center cursor-pointer group hover:scale-105 transition-transform duration-300 block">
                        <div className="h-40 flex items-center justify-center mb-2">
                            <img src={prod.img} alt={prod.name} className="max-h-full max-w-full object-contain" />
                        </div>
                        <p className="font-medium text-gray-900 text-sm mt-3">{prod.name}</p>
                        <p className="text-green-600 text-sm mt-1">{prod.price}</p>
                        <p className="text-gray-500 text-sm opacity-80 mt-1 truncate">{prod.brand}</p>
                    </Link>
                ))}
            </div>
        </div>
    )
}
