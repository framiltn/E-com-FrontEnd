'use client'
import { usePathname } from 'next/navigation'
import FlipNav from '@/components/FlipNav'
import AdminSidebar from '@/components/AdminSidebar'

export default function AdminLayout({ children }) {
    const pathname = usePathname()
    const isLoginPage = pathname === '/admin/login'

    if (isLoginPage) {
        return <div className="min-h-screen bg-[#f1f3f6]">{children}</div>
    }

    return (
        <div className="min-h-screen bg-[#f1f3f6]">
            <FlipNav isAdmin={true} />

            <div className="flex max-w-[100%] mx-auto">
                <AdminSidebar />

                <main className="flex-1 p-4 overflow-x-hidden">
                    {children}
                </main>
            </div>
        </div>
    )
}
