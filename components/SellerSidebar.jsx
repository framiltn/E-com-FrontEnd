'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function SellerSidebar() {
    const pathname = usePathname()

    const menuItems = [
        { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/seller/dashboard' },
        { id: 'orders', label: 'Orders', icon: '📦', href: '/seller/orders' },
        { id: 'listings', label: 'My Listings', icon: '📝', href: '/seller/products' },
        { id: 'addData', label: 'Add New listing', icon: '➕', href: '/seller/products/create' },
        { id: 'payments', label: 'Payments', icon: '💰', href: '/seller/payments' },
        { id: 'analytics', label: 'Growth', icon: '📈', href: '/seller/analytics' },

        // { id: 'settings', label: 'Settings', icon: '⚙️', href: '/seller/settings' },
    ]

    return (
        <div className="w-[280px] flex-shrink-0 bg-white shadow-sm self-start hidden lg:flex flex-col min-h-[calc(100vh-100px)] rounded-[2px] overflow-hidden ml-4 my-4">
            <div className="p-4 border-b flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl">
                    S
                </div>
                <div>
                    <div className="text-xs text-gray-500 uppercase">Seller Hub</div>
                    <div className="font-bold">My Store</div>
                </div>
            </div>

            <div className="flex-1 py-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={`flex items-center gap-3 px-6 py-3 transition-colors border-l-4 ${pathname === item.href
                            ? 'bg-blue-50 text-primary border-primary'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-primary border-transparent'
                            }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>


        </div>
    )
}
