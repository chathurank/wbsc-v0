import './globals.css'
import type { Metadata } from 'next'
import { Jost, DM_Sans } from 'next/font/google'
import Header from '@/components/header'
import { Providers } from './providers'

const jost = Jost({ 
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Würth Baer Supply Company - B2B E-commerce',
  description: 'Your trusted partner for industrial supplies and equipment.',
  keywords: 'B2B, e-commerce, industrial supplies, equipment, Würth Baer Supply Company',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jost.variable} ${dmSans.variable}`}>
      <body className="font-sans">
        <Providers>
          <Header />
          <main>{children}</main>
          {/* Footer component can be added here */}
        </Providers>
      </body>
    </html>
  )
}

