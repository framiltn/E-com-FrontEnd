'use client'
import { useState, useEffect } from 'react'
import { productAPI } from '@/lib/api'
import ProductCard from '@/components/ProductCard'


export default function OffersPage() {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchOffers()
    }, [])

    const fetchOffers = async () => {
        try {
            // Fetching products.Ideally backend should have an /offers endpoint or support ?type=offer
            // For now, we fetch all products and we can filter client side or just show them as "Top Picks"
            const res = await productAPI.getAll()
            let data = []
            if (res.data?.data?.data && Array.isArray(res.data.data.data)) {
                data = res.data.data.data
            } else if (res.data?.data && Array.isArray(res.data.data)) {
                data = res.data.data
            } else if (Array.isArray(res.data)) {
                data = res.data
            }
            setProducts(data)
        } catch (error) {
            console.error('Error fetching offers:', error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-[#f1f3f6]">
            <div className="max-w-[1400px] mx-auto p-4">

                {/* Banner or Header */}
                <div className="bg-white p-6 shadow-sm mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">Top Offers</h1>
                    <p className="text-gray-500">Grab the best deals on your favorite products!</p>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="w-10 h-10 border-4 border-t-primary border-gray-200 rounded-full animate-spin"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {products.length > 0 ? (
                            products.map(product => (
                                <ProductCard key={product.id} product={product} />
                            ))
                        ) : (
                            <div className="col-span-full text-center py-20 text-gray-500">
                                No active offers at the moment.
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}
