import { Roboto } from 'next/font/google'
import './globals.css'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto',
})

export const metadata = {
  title: 'Marketplace: Online Shopping for Electronics, Apparel, Computers, Books, DVDs & more',
  description: 'The best online shopping store for Mobiles, Fashion, Electronics, Home Appliances and more.',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

import ClientShell from '@/components/ClientShell'

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${roboto.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="font-sans text-text bg-secondary">
        <ClientShell>
          {children}
        </ClientShell>
      </body>
    </html>
  )
}
