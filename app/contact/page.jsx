import StaticPage from '@/components/StaticPage'

export default function ContactPage() {
    return (
        <StaticPage title="Contact Us">
            <p className="mb-8">Have questions? We're here to help. Reach out to us through any of the channels below.</p>
            <div className="space-y-6 text-gray-700">
                <div>
                    <h4 className="font-bold text-gray-900">Email</h4>
                    <p>support@marketplace.com</p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">Phone</h4>
                    <p>+1 (555) 123-4567</p>
                </div>
                <div>
                    <h4 className="font-bold text-gray-900">Address</h4>
                    <p>123 Marketplace Ave, E-commerce City, EC 12345</p>
                </div>
            </div>
        </StaticPage>
    )
}
