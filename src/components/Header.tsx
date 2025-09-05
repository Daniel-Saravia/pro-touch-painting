'use client'

import { useState } from 'react'
import Image from 'next/image'
import styles from './Header.module.css'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <div className="container">
          <div className={styles.navWrapper}>
            <div className={styles.logo}>
              <Image src="/logo.png" alt="Pro Touch Painting & Drywall" width={150} height={50} />
            </div>
            <button 
              className={styles.mobileMenuToggle}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            <ul className={`${styles.navMenu} ${mobileMenuOpen ? styles.active : ''}`}>
              <li><a href="#home">Home</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact" className={styles.ctaNav}>Get Quote</a></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}