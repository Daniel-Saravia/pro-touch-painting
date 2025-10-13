'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import styles from './Footer.module.css'

export default function Footer() {
  const { t } = useTranslation()
  
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <Image src="/assets/ProTouchBLUE.svg" alt="Pro Touch Painting & Drywall" width={160} height={53} className={styles.footerLogo} />
            <p className={styles.footerDescription}>
              {t('footer.description')}
            </p>
          </div>
          <div className={styles.footerColumn}>
            <h4>{t('footer.services')}</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#services">{t('footer.interiorPainting')}</a></li>
              <li><a href="#services">{t('footer.exteriorPainting')}</a></li>
              <li><a href="#services">{t('footer.drywallServices')}</a></li>
              <li><a href="#services">{t('footer.cabinetRefinishing')}</a></li>
              <li><a href="#services">{t('footer.powerWashing')}</a></li>
              <li><a href="#services">{t('footer.textureApplication')}</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4>{t('footer.quickLinks')}</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#home">{t('footer.home')}</a></li>
              <li><a href="#about">{t('footer.aboutUs')}</a></li>
              <li><a href="#gallery">{t('footer.gallery')}</a></li>
              <li><a href="#testimonials">{t('footer.reviews')}</a></li>
              <li><a href="#contact">{t('footer.contact')}</a></li>
              <li><a href="#contact">{t('footer.freeQuote')}</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4>{t('footer.businessHours')}</h4>
            <ul className={styles.hoursList}>
              <li><span>{t('footer.mondayFriday')}:</span> 7:00 AM - 6:00 PM</li>
              <li><span>{t('footer.saturday')}:</span> 8:00 AM - 4:00 PM</li>
              <li><span>{t('footer.sunday')}:</span> {t('footer.emergencyOnly')}</li>
            </ul>
            <div className={styles.emergencyContact}>
              <p><strong>{t('footer.emergencyService')}</strong></p>
              <a href="tel:602-680-7263" className={styles.emergencyNumber}>(602) 680-7263</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2025 Pro Touch Painting & Drywall. {t('footer.rights')}. | {t('footer.licensedInsured')} | CR - 34 #328624 | CR - 10 #342592</p>
        </div>
      </div>
    </footer>
  )
}