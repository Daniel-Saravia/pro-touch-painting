import type { Metadata } from 'next'
import { Poppins, Roboto } from 'next/font/google'
import './globals.css'
import I18nProvider from '@/components/I18nProvider'

const poppins = Poppins({ 
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins'
})

const roboto = Roboto({ 
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  variable: '--font-roboto'
})

export const metadata: Metadata = {
  metadataBase: new URL('https://www.protouchpaintinganddrywall.com'),
  title: 'Phoenix Painting & Drywall | Pro Touch Painting & Drywall',
  description: 'Pro Touch Painting & Drywall provides licensed interior and exterior painting, drywall repair, popcorn ceiling removal, cabinet refinishing, epoxy flooring, and power washing for homes, businesses, and HOA communities across Phoenix, Scottsdale, and the Greater Valley.',
  keywords: [
    'Phoenix painting contractor',
    'drywall repair Phoenix AZ',
    'HOA painting Phoenix',
    'cabinet refinishing Phoenix',
    'epoxy garage floors Phoenix',
    'popcorn ceiling removal Phoenix',
    'commercial painting Scottsdale',
    'residential painters Tempe'
  ],
  openGraph: {
    title: 'Phoenix Painting & Drywall Experts | Pro Touch Painting & Drywall',
    description: 'Trusted Phoenix painters and drywall specialists delivering premium finishes for residential, commercial, and HOA projects throughout Maricopa County.',
    url: 'https://www.protouchpaintinganddrywall.com/',
    siteName: 'Pro Touch Painting & Drywall',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/assets/paHouse.webp',
        width: 1200,
        height: 630,
        alt: 'Pro Touch Painting & Drywall crew painting a Phoenix home exterior'
      }
    ]
  },
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'es-US': '/?lang=es'
    }
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phoenix Painting & Drywall Experts | Pro Touch Painting & Drywall',
    description: 'Full-service painting and drywall contractors serving Phoenix, Scottsdale, Tempe, Mesa, Chandler, Gilbert, and Glendale.',
    creator: '@ProTouchPainting',
    images: ['/assets/paHouse.webp']
  },
  robots: {
    index: true,
    follow: true
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/site.webmanifest' }
    ]
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
