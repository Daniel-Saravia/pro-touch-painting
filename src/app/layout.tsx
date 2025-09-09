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
  title: 'Pro Touch Painting & Drywall - Professional Painting & Drywall Services',
  description: 'Premier residential and commercial painting, drywall installation and repair, popcorn ceiling removal, cabinet refinishing, and power washing services.',
  keywords: 'painting, drywall, cabinet refinishing, power washing, popcorn ceiling removal, texture application',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'manifest', url: '/site.webmanifest' },
    ],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={`${poppins.variable} ${roboto.variable}`}>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}