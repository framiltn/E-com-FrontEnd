export default function StaticPage({ title, children }) {
    return (
        <div className="max-w-4xl mx-auto px-4 py-16">
            <h1 className="text-4xl font-bold mb-8 text-gray-900">{title}</h1>
            <div className="prose prose-lg max-w-none text-gray-600">
                {children || (
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
                        <p className="text-blue-700 italic">
                            This page is currently under implementation. Content will be available soon.
                        </p>
                    </div>
                )}
            </div>
        </div>
    )
}
