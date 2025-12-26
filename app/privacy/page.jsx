import StaticPage from '@/components/StaticPage'

export default function PrivacyPage() {
    return (
        <StaticPage title="Privacy Policy">
            <p>Your privacy is important to us. This policy outlines how we handle your personal data.</p>
            <div className="mt-6 space-y-4">
                <h4 className="font-bold">Data Collection</h4>
                <p>We collect information you provide when creating an account or making a purchase.</p>
                <h4 className="font-bold">Data Usage</h4>
                <p>Your data is used to process orders and improve your shopping experience.</p>
            </div>
        </StaticPage>
    )
}
