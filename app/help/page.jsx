import StaticPage from '@/components/StaticPage'

export default function HelpPage() {
    return (
        <StaticPage title="Help Center">
            <p>Welcome to our Help Center. How can we assist you today?</p>
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="border p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-2">Order Tracking</h3>
                    <p>Find out where your package is and when it will arrive.</p>
                </div>
                <div className="border p-6 rounded-lg">
                    <h3 className="font-bold text-xl mb-2">Account Issues</h3>
                    <p>Get help with your password, profile, or settings.</p>
                </div>
            </div>
        </StaticPage>
    )
}
