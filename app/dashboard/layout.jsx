'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function DashboardLayout({ children }) {
    const pathname = usePathname()

    const navItems = [
        { name: 'My Orders', href: '/dashboard/orders' },
        { name: 'Profile', href: '/dashboard/profile' }, // Placeholder
    ]

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">

                    {/* Sidebar */}
                    <aside className="w-full md:w-64 flex-shrink-0">
                        <div className="bg-white rounded-xl shadow-sm p-4 sticky top-24">
                            <h2 className="font-bold text-gray-900 mb-4 px-4">My Account</h2>
                            <nav className="space-y-1">
                                {navItems.map((item) => {
                                    const isActive = pathname.startsWith(item.href)
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            className={`block px-4 py-2 rounded-lg text-sm font-medium transition ${isActive
                                                    ? 'bg-blue-50 text-primary'
                                                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                                }`}
                                        >
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </nav>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <div className="flex-1">
                        {children}
                    </div>

                </div>
            </main>

            <Footer />
        </div>
    )
}
