import StaticPage from '@/components/StaticPage'

export default function TermsPage() {
    return (
        <StaticPage title="Terms of Service">
            <p>By using our marketplace, you agree to the following terms and conditions.</p>
            <div className="mt-6 space-y-4">
                <h4 className="font-bold">1. Use of Service</h4>
                <p>You must be at least 18 years old to use this service.</p>
                <h4 className="font-bold">2. User Accounts</h4>
                <p>You are responsible for maintaining the confidentiality of your account password.</p>
            </div>
        </StaticPage>
    )
}
