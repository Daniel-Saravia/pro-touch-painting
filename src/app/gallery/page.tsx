import type { Metadata } from 'next'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'
import Contact from '@/components/Contact'
import GalleryPageContent from '@/components/GalleryPageContent'
import { fetchGallerySections } from '@/lib/gallery'

export const metadata: Metadata = {
  title: 'Project Gallery | Pro Touch Painting & Drywall',
  description: 'Explore completed cabinet refinishing and house painting projects from Pro Touch Painting & Drywall. Browse our Phoenix project gallery to see quality craftsmanship across the Valley.',
  alternates: {
    canonical: '/gallery'
  },
  openGraph: {
    title: 'Project Gallery | Pro Touch Painting & Drywall',
    description: 'View finished cabinet refinishing and house painting projects from our Phoenix-area portfolio.',
    url: 'https://www.protouchpaintinganddrywall.com/gallery'
  }
}

export default async function GalleryPage() {
  const sections = await fetchGallerySections()

  return (
    <main>
      <Header />
      <GalleryPageContent sections={sections} />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  )
}
