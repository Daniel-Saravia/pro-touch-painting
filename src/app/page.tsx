'use client'

import Header from '@/components/Header'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import CTASection from '@/components/CTASection'
import Gallery from '@/components/Gallery'
import About from '@/components/About'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollToTop from '@/components/ScrollToTop'

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <Services />
      <CTASection />
      <Gallery />
      <About />
      <Testimonials />
      <Contact />
      <Footer />
      <ScrollToTop />
    </main>
  )
}