'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
    const pathname = usePathname()

    const menuItems = [
        { id: 'dashboard', label: 'Overview', icon: '📊', href: '/admin/dashboard' },
        { id: 'users', label: 'User Management', icon: '👥', href: '/admin/users' },
        { id: 'sellers', label: 'Seller Approvals', icon: '🏪', href: '/admin/sellers' },
        { id: 'products', label: 'Product Catalog', icon: '📦', href: '/admin/products' },
        { id: 'disputes', label: 'Dispute Resolution', icon: '⚖️', href: '/admin/disputes' },
        { id: 'cms', label: 'CMS / Content', icon: '📝', href: '/admin/cms' },
        { id: 'profile', label: 'My Profile', icon: '👤', href: '/profile' },
        { id: 'settings', label: 'System Settings', icon: '⚙️', href: '/admin/settings' },
    ]

    return (
        <div className="w-[280px] flex-shrink-0 bg-[#172337] text-white shadow-sm self-start hidden lg:flex flex-col min-h-[calc(100vh-100px)] rounded-[2px] overflow-hidden ml-4 my-4">
            <div className="p-4 border-b border-gray-700 flex items-center gap-3 bg-header-bg">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                    A
                </div>
                <div>
                    <div className="text-xs text-blue-100 uppercase">Administrator</div>
                    <div className="font-bold">Control Panel</div>
                </div>
            </div>

            <div className="flex-1 py-2">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.href}
                        className={`flex items-center gap-3 px-6 py-4 transition-colors border-l-4 ${pathname === item.href
                            ? 'bg-gray-800 text-white border-blue-500'
                            : 'text-gray-300 hover:bg-gray-700 hover:text-white border-transparent hover:border-blue-500'
                            }`}
                    >
                        <span className="text-lg">{item.icon}</span>
                        <span className="font-medium">{item.label}</span>
                    </Link>
                ))}
            </div>

            <div className="p-4 border-t border-gray-700">
                <button
                    onClick={() => {
                        localStorage.removeItem('token');
                        localStorage.removeItem('role');
                        window.location.href = '/login';
                    }}
                    className="flex items-center gap-3 px-2 py-2 text-red-400 hover:text-red-300 transition-colors w-full"
                >
                    <span className="text-lg">🚪</span>
                    <span className="font-medium">Logout</span>
                </button>
            </div>
        </div>
    )
}
