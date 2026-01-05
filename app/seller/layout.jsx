'use client'
import { usePathname } from 'next/navigation'
import FlipNav from '@/components/FlipNav'
import SellerSidebar from '@/components/SellerSidebar'

export default function SellerLayout({ children }) {
    const pathname = usePathname()
    const isApplyPage = pathname === '/seller/apply'

    return (
        <div className="min-h-screen bg-[#f1f3f6]">
            <FlipNav />

            <div className="flex max-w-[100%] mx-auto">
                {!isApplyPage && <SellerSidebar />}

                <main className={`flex-1 p-4 overflow-x-hidden ${isApplyPage ? 'max-w-[1200px] mx-auto' : ''}`}>
                    {children}
                </main>
            </div>
        </div>
    )
}
