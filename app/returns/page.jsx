import StaticPage from '@/components/StaticPage'

export default function ReturnsPage() {
    return (
        <StaticPage title="Returns & Exchanges">
            <p>We want you to be completely satisfied with your purchase.</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
                <li>Returns are accepted within 30 days of purchase.</li>
                <li>Items must be in original condition and packaging.</li>
                <li>Certain items like personal care and digital products are non-returnable.</li>
            </ul>
        </StaticPage>
    )
}
