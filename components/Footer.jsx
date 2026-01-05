import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-header-bg pt-12 pb-8 text-white text-xs border-t border-gray-700">
            <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
                    {/* About */}
                    <div>
                        <h4 className="font-bold text-gray-400 mb-4 text-xs uppercase tracking-wide">About</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:underline">Contact Us</Link></li>
                            <li><Link href="#" className="hover:underline">About Us</Link></li>
                            <li><Link href="#" className="hover:underline">Careers</Link></li>
                            <li><Link href="#" className="hover:underline">Press</Link></li>
                            <li><Link href="#" className="hover:underline">Corporate Information</Link></li>
                        </ul>
                    </div>

                    {/* Help */}
                    <div>
                        <h4 className="font-bold text-gray-400 mb-4 text-xs uppercase tracking-wide">Help</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:underline">Payments</Link></li>
                            <li><Link href="#" className="hover:underline">Shipping</Link></li>
                            <li><Link href="#" className="hover:underline">Cancellation & Returns</Link></li>
                            <li><Link href="#" className="hover:underline">FAQ</Link></li>
                            <li><Link href="#" className="hover:underline">Report Infringement</Link></li>
                        </ul>
                    </div>

                    {/* Policy */}
                    <div>
                        <h4 className="font-bold text-gray-400 mb-4 text-xs uppercase tracking-wide">Consumer Policy</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:underline">Cancellation & Returns</Link></li>
                            <li><Link href="#" className="hover:underline">Terms Of Use</Link></li>
                            <li><Link href="#" className="hover:underline">Security</Link></li>
                            <li><Link href="#" className="hover:underline">Privacy</Link></li>
                            <li><Link href="#" className="hover:underline">Sitemap</Link></li>
                            <li><Link href="#" className="hover:underline">Grievance Redressal</Link></li>
                        </ul>
                    </div>

                    {/* Social */}
                    <div>
                        <h4 className="font-bold text-gray-400 mb-4 text-xs uppercase tracking-wide">Social</h4>
                        <ul className="space-y-2">
                            <li><Link href="#" className="hover:underline">Facebook</Link></li>
                            <li><Link href="#" className="hover:underline">Twitter</Link></li>
                            <li><Link href="#" className="hover:underline">YouTube</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Section */}
                <div className="pt-8 border-t border-gray-600 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="flex gap-2 items-center">
                        <span className="font-bold italic">Marketplace</span>
                    </div>
                    <p>© 2024 Marketplace.com. All rights reserved.</p>
                    <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/payment-method_69e7ec.svg" alt="Payments" className="h-4" />
                </div>
            </div>
        </footer>
    )
}
