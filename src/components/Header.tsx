'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.navWrapper}>
            <div className={styles.logo} onClick={scrollToTop} style={{ cursor: 'pointer' }}>
              <Image src="/assets/ProTouch.svg" alt="Pro Touch Painting & Drywall" width={150} height={50} priority />
            </div>
            <button 
              className={styles.mobileMenuToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className={`${styles.navMenu} ${mobileMenuOpen ? styles.active : ''}`}>
              <li><a href="#home" onClick={handleLinkClick}>Home</a></li>
              <li><a href="#services" onClick={handleLinkClick}>Services</a></li>
              <li><a href="#gallery" onClick={handleLinkClick}>Gallery</a></li>
              <li><a href="#about" onClick={handleLinkClick}>About</a></li>
              <li><a href="#testimonials" onClick={handleLinkClick}>Testimonials</a></li>
              <li><a href="#contact" className={styles.ctaNav} onClick={handleLinkClick}>Get Quote</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}