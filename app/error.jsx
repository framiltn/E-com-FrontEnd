'use client'
import { useEffect } from 'react'

export default function Error({ error, reset }) {
    useEffect(() => {
        // Log error to error reporting service
        console.error('Application error:', error)
    }, [error])

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <div className="text-6xl mb-4">⚠️</div>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Oops! Something went wrong
                    </h1>
                    <p className="text-gray-600">
                        We're sorry for the inconvenience. Please try again.
                    </p>
                </div>

                <div className="space-y-4">
                    <button
                        onClick={reset}
                        className="w-full btn-primary"
                    >
                        Try Again
                    </button>

                    <button
                        onClick={() => window.location.href = '/'}
                        className="w-full btn-secondary"
                    >
                        Go Home
                    </button>
                </div>

                {process.env.NODE_ENV === 'development' && (
                    <div className="mt-8 p-4 bg-red-50 rounded-lg text-left">
                        <p className="text-sm font-mono text-red-800 break-all">
                            {error.message}
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
