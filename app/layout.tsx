import './globals.css'
import type { Metadata } from 'next'
import { Jost, DM_Sans } from 'next/font/google'
import Header from '@/components/header'
import { Footer } from '@/components/footer/footer'
import { Providers } from './providers'
import { GoogleTagManager } from '@/components/google-tag-manager'
import { JsonLd } from '@/components/json-ld'

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
  title: {
    default: 'Würth Baer Supply Company - B2B Woodworking & Carpentry Supplies',
    template: '%s | Würth Baer Supply Company'
  },
  description: 'Your trusted B2B partner for premium woodworking and carpentry supplies. Serving professionals with quality tools, hardware, and materials.',
  keywords: 'B2B, woodworking supplies, carpentry tools, hardware, wood materials, Würth Baer Supply Company',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.wurthbaer.com/',
    siteName: 'Würth Baer Supply Company',
  },
  twitter: {
    card: 'summary_large_image',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${jost.variable} ${dmSans.variable}`}>
      <head>
        <GoogleTagManager id="GTM-XXXXXXX" />
      </head>
      <body className={`${dmSans.className} font-sans min-h-screen flex flex-col`}>
        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Würth Baer Supply Company",
            "url": "https://www.wurthbaer.com",
            "logo": "https://www.wurthbaer.com/logo.png",
            "description": "Your trusted B2B partner for premium woodworking and carpentry supplies.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "123 Main St",
              "addressLocality": "Chicago",
              "addressRegion": "IL",
              "postalCode": "60601",
              "addressCountry": "US"
            },
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+1-800-123-4567",
              "contactType": "customer service"
            },
            "sameAs": [
              "https://www.facebook.com/wurthbaer",
              "https://www.linkedin.com/company/wurth-baer-supply-company",
              "https://twitter.com/wurthbaer"
            ]
          }}
        />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

