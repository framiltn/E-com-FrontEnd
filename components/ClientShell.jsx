'use client'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import FlipNav from '@/components/FlipNav'
import FlipSubNav from '@/components/FlipSubNav'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

export default function ClientShell({ children }) {
    const pathname = usePathname()

    // Check if the current route is a dashboard route
    const isDashboard = pathname.startsWith('/admin') || pathname.startsWith('/seller')

    // Auth pages should not show categories
    const isAuthPage = pathname === '/login' || pathname === '/register' || pathname === '/forgot-password'

    // Check if specific pages need to hide nav (e.g., login/register might want clean layout?)
    // For now, we follow the requirement to show it "in all pages" except dashboards.

    const [userRole, setUserRole] = useState('')

    useEffect(() => {
        // Initial check
        const role = localStorage.getItem('role')
        setUserRole(role)

        // Listen for storage changes
        const handleStorageChange = () => {
            const role = localStorage.getItem('role')
            setUserRole(role)
        }
        window.addEventListener('storage', handleStorageChange)

        // Custom event for immediate updates within the same window
        const handleRoleUpdate = () => {
            const role = localStorage.getItem('role')
            setUserRole(role)
        }
        window.addEventListener('roleUpdated', handleRoleUpdate)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('roleUpdated', handleRoleUpdate)
        }
    }, [])

    const shouldShowCategories = !isDashboard && !isAuthPage
    const shouldShowFooter = !isDashboard && !(pathname === '/profile' && (userRole === 'seller' || userRole === 'admin'))

    return (
        <>
            {/* Global Navigation - Hidden on Dashboards */}
            {!isDashboard && (
                <>
                    <FlipNav />
                    {shouldShowCategories && <FlipSubNav />}
                </>
            )}

            <Toaster position="top-center" reverseOrder={false} />

            {children}

            {shouldShowFooter && <Footer />}
        </>
    )
}
