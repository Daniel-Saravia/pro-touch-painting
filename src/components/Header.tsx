'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import LanguageToggle from './LanguageToggle'
import styles from './Header.module.css'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { t } = useTranslation()

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [mobileMenuOpen])

  const handleLinkClick = () => {
    setMobileMenuOpen(false)
  }

  const handleOverlayClick = () => {
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
              <Image src="/assets/ProTouchBLUE.svg" alt="Pro Touch Painting & Drywall" width={150} height={50} priority />
            </div>
            <div className={styles.mobileNavControls}>
              <LanguageToggle />
              <button 
                className={`${styles.mobileMenuToggle} ${mobileMenuOpen ? styles.active : ''}`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <span></span>
                <span></span>
                <span></span>
              </button>
            </div>
            <div className={`${styles.mobileMenuOverlay} ${mobileMenuOpen ? styles.active : ''}`} onClick={handleOverlayClick}>
            </div>
            <ul className={`${styles.navMenu} ${mobileMenuOpen ? styles.active : ''}`}>
              <li className={styles.languageToggleDesktop}><LanguageToggle /></li>
              <li><a href="#home" onClick={handleLinkClick}>{t('nav.home')}</a></li>
              <li><a href="#services" onClick={handleLinkClick}>{t('nav.services')}</a></li>
              <li><a href="#gallery" onClick={handleLinkClick}>{t('nav.gallery')}</a></li>
              <li><a href="#about" onClick={handleLinkClick}>{t('nav.about')}</a></li>
              <li><a href="#testimonials" onClick={handleLinkClick}>{t('nav.testimonials')}</a></li>
              <li><a href="#contact" className={styles.ctaNav} onClick={handleLinkClick}>{t('nav.getQuote')}</a></li>
            </ul>
          </div>
        </div>
      </nav>
      <a href="#contact" className={`${styles.mobileCtaFixed} ${mobileMenuOpen ? styles.active : ''}`} onClick={handleLinkClick}>{t('nav.getQuote')}</a>
    </header>
  )
}