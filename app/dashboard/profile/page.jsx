'use client'

import { useState, useEffect } from 'react'
import { authAPI } from '@/lib/api'

export default function ProfilePage() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await authAPI.getUser()
                setUser(response.data)
            } catch (error) {
                console.error('Failed to fetch user:', error)
            } finally {
                setLoading(false)
            }
        }
        fetchUser()
    }, [])

    if (loading) return <div>Loading...</div>

    return (
        <div className="bg-white rounded-xl shadow-sm p-6">
            <h1 className="text-2xl font-bold mb-6">My Profile</h1>

            {user ? (
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Name</label>
                        <p className="text-lg font-medium text-gray-900">{user.name}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Email</label>
                        <p className="text-lg font-medium text-gray-900">{user.email}</p>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-500">Role</label>
                        <p className="text-lg font-medium text-gray-900 capitalize">{user.role}</p>
                    </div>
                </div>
            ) : (
                <p>Failed to load profile.</p>
            )}
        </div>
    )
}
