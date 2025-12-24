import './globals.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Multi-Vendor Marketplace - Shop from Multiple Sellers',
  description: 'Discover products from verified sellers with secure payments, fast shipping, and affiliate rewards. Join our multi-vendor marketplace today!',
  keywords: 'marketplace, multi-vendor, e-commerce, online shopping, affiliate marketing',
  authors: [{ name: 'Your Company Name' }],
  openGraph: {
    title: 'Multi-Vendor Marketplace',
    description: 'Shop from multiple sellers with secure payments and fast shipping',
    type: 'website',
    locale: 'en_US',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>{children}</body>
    </html>
  )
}
