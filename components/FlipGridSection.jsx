'use client'
import Link from 'next/link'

export default function FlipGridSection({ items = [] }) {
    // Items structure: [ { title: 'Best of Audio', link: '/audio', products: [ { name, img, offer } ] } ]

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-4">
            {items.map((section, idx) => (
                <div key={idx} className="bg-white shadow-sm rounded-[2px] p-4 flex flex-col">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">{section.title}</h3>
                        <Link href={section.link} className="bg-primary text-white rounded-full p-1 shadow-sm hover:shadow-md transition-shadow">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </Link>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-2 gap-4 flex-1">
                        {section.products.slice(0, 4).map((prod, pIdx) => (
                            <Link key={pIdx} href={prod.link || `/products?search=${encodeURIComponent(prod.name)}`} className="group cursor-pointer">
                                <div className="bg-gray-50 h-32 flex items-center justify-center p-2 rounded-[2px] mb-2 overflow-hidden border border-transparent group-hover:border-gray-200 transition-all">
                                    <img src={prod.img} alt={prod.name} className="max-h-full max-w-full object-contain group-hover:scale-110 transition-transform duration-300" />
                                </div>
                                <div className="text-sm font-medium text-gray-700 truncate">{prod.name}</div>
                                <p className="text-primary text-sm mt-1">{prod.offer}</p>
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}
