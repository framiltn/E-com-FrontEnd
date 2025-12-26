import StaticPage from '@/components/StaticPage'

export default function ShippingPage() {
    return (
        <StaticPage title="Shipping Information">
            <p>We offer reliable shipping options to get your products to you quickly.</p>
            <div className="mt-6 space-y-4">
                <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-bold">Standard Shipping</h4>
                    <p>3-5 business days. Free for orders over $50.</p>
                </div>
                <div className="bg-gray-50 p-4 rounded">
                    <h4 className="font-bold">Express Shipping</h4>
                    <p>1-2 business days. Flat rate of $15.</p>
                </div>
            </div>
        </StaticPage>
    )
}
