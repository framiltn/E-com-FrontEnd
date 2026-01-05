'use client'
import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { adminAPI } from '@/lib/api'

export default function UserDetailsPage({ params }) {
    const router = useRouter()
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const fetchUser = useCallback(async () => {
        try {
            const res = await adminAPI.getUserById(params.id)
            setUser(res.data.data)
        } catch (error) {
            console.error('Error fetching user:', error)
            alert('User not found')
            router.push('/admin/users')
        } finally {
            setLoading(false)
        }
    }, [params.id, router])

    useEffect(() => {
        fetchUser()
    }, [fetchUser])

    const toggleBlock = async () => {
        const action = user.is_blocked ? 'unblock' : 'block'
        if (!confirm(`Are you sure you want to ${action} this user?`)) return

        try {
            const res = await adminAPI.toggleBlockUser(user.id)
            setUser(res.data.data)
            alert(res.data.message)
        } catch (error) {
            console.error('Error blocking user:', error)
            alert('Failed to update user status')
        }
    }

    const deleteUser = async () => {
        if (!confirm('Are you sure you want to DELETE this user? This action cannot be undone.')) return

        try {
            await adminAPI.deleteUser(user.id)
            alert('User deleted successfully')
            router.push('/admin/users')
        } catch (error) {
            console.error('Error deleting user:', error)
            alert('Failed to delete user')
        }
    }

    if (loading) return <div className="p-8 text-center">Loading...</div>
    if (!user) return null

    return (
        <div className="w-full max-w-4xl mx-auto p-6">
            <button
                onClick={() => router.back()}
                className="mb-6 text-gray-500 hover:text-gray-700 flex items-center gap-2"
            >
                ← Back to Users
            </button>

            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                    <h1 className="text-2xl font-bold text-gray-800">User Details</h1>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${user.is_blocked ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                        }`}>
                        {user.is_blocked ? 'Blocked' : 'Active'}
                    </span>
                </div>

                <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* User Info */}
                    <div className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Full Name</label>
                            <div className="mt-1 text-lg font-medium text-gray-900">{user.name}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Email Address</label>
                            <div className="mt-1 text-lg text-gray-900">{user.email}</div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Role</label>
                            <div className="mt-1 capitalize bg-gray-100 inline-block px-3 py-1 rounded text-gray-700">
                                {user.roles?.map(r => r.name).join(', ') || 'Buyer'}
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-500">Joined On</label>
                            <div className="mt-1 text-gray-900">
                                {new Date(user.created_at).toLocaleDateString()}
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                        <h2 className="text-lg font-semibold mb-4 text-gray-800">Actions</h2>

                        <div className="space-y-4">
                            <div className="p-4 bg-orange-50 rounded-lg border border-orange-100">
                                <h3 className="font-medium text-orange-800 mb-2">Account Status</h3>
                                <p className="text-sm text-orange-600 mb-4">
                                    {user.is_blocked
                                        ? "User is currently blocked. They cannot log in."
                                        : "User has full access to their account."}
                                </p>
                                <button
                                    onClick={toggleBlock}
                                    className={`w-full py-2 px-4 rounded font-medium transition-colors ${user.is_blocked
                                            ? 'bg-green-600 hover:bg-green-700 text-white'
                                            : 'bg-orange-500 hover:bg-orange-600 text-white'
                                        }`}
                                >
                                    {user.is_blocked ? 'Unblock User' : 'Block Temporary'}
                                </button>
                            </div>

                            <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                                <h3 className="font-medium text-red-800 mb-2">Danger Zone</h3>
                                <p className="text-sm text-red-600 mb-4">
                                    Permanently remove this user and all associated data. This action cannot be undone.
                                </p>
                                <button
                                    onClick={deleteUser}
                                    className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded font-medium transition-colors"
                                >
                                    Remove Account
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
