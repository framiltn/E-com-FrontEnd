export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
            <div className="max-w-md w-full text-center">
                <div className="mb-8">
                    <div className="text-6xl mb-4">🔍</div>
                    <h1 className="text-6xl font-bold text-gray-900 mb-2">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700 mb-4">
                        Page Not Found
                    </h2>
                    <p className="text-gray-600">
                        The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    </p>
                </div>

                <div className="space-y-4">
                    <a href="/" className="block w-full btn-primary">
                        Go Home
                    </a>

                    <a href="/products" className="block w-full btn-secondary">
                        Browse Products
                    </a>
                </div>
            </div>
        </div>
    )
}
