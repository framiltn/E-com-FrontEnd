'use client'
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { authAPI } from '@/lib/api'

export default function AdminLoginPage() {
    const router = useRouter()
    const [formData, setFormData] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            // Force 'admin' role assumption for validation logic
            // API will validate credentials, and we check the returned role
            const response = await authAPI.login(formData)
            const apiRole = response.data.role || 'buyer'

            if (apiRole !== 'admin') {
                setError('Access Denied: You do not have Administrator privileges.')
                setLoading(false)
                return
            }

            localStorage.setItem('token', response.data.token)
            localStorage.setItem('role', apiRole)

            router.push('/admin/dashboard')
        } catch (err) {
            console.error(err)
            setError(err.response?.data?.message || 'Login failed')
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
            <div className="max-w-md w-full bg-white p-8 rounded shadow-md border-t-4 border-primary">
                <h1 className="text-2xl font-bold text-center mb-2 text-gray-800">Admin Panel</h1>
                <p className="text-center text-gray-500 mb-8 text-sm">Secure Login</p>

                {error && (
                    <div className="bg-red-50 text-red-600 p-3 rounded text-sm mb-6 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                        <input
                            type="email"
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            placeholder="admin@example.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            required
                            className="w-full p-2 border border-gray-300 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            placeholder="••••••••"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-primary text-white py-2.5 rounded font-bold hover:bg-gray-800 transition-colors disabled:opacity-70"
                    >
                        {loading ? 'Authenticating...' : 'Login to Dashboard'}
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
                        ← Back to Marketplace
                    </Link>
                </div>
            </div>
        </div>
    )
}
