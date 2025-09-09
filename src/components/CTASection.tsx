'use client'

import { useTranslation } from 'react-i18next'
import styles from './CTASection.module.css'

export default function CTASection() {
  const { t } = useTranslation()
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>{t('cta.title')}</h2>
          <p className={styles.ctaSubtitle}>{t('cta.description')}</p>
          <div className={styles.ctaButtons}>
            <a href="tel:602-680-7263" className="btn btn-white">Call Now: (602) 680-7263</a>
            <a href="#contact" className="btn btn-primary">{t('nav.getQuote')}</a>
          </div>
        </div>
      </div>
    </section>
  )
}