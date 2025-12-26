import StaticPage from '@/components/StaticPage'

export default function RefundPage() {
    return (
        <StaticPage title="Refund Policy">
            <p>Our refund policy is designed to be fair and transparent.</p>
            <div className="mt-6 space-y-4 text-gray-700">
                <p>Refunds will be processed within 5-7 business days of an approved return.</p>
                <p>Original shipping costs are non-refundable unless the item was defective.</p>
            </div>
        </StaticPage>
    )
}
