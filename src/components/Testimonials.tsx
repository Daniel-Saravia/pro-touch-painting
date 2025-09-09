'use client'

import { useTranslation } from 'react-i18next'
import styles from './Testimonials.module.css'

export default function Testimonials() {
  const { t } = useTranslation()
  
  // Get testimonials from translation files with fallback
  const testimonialsData = t('testimonials.reviews', { returnObjects: true })
  const testimonials = Array.isArray(testimonialsData) ? testimonialsData : []

  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('testimonials.title')}</h2>
          <p className="section-subtitle">{t('testimonials.subtitle')}</p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.length > 0 ? testimonials.map((testimonial: any, index: number) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className={styles.testimonialText}>&quot;{testimonial.text}&quot;</p>
              <div className={styles.testimonialAuthor}>
                <strong>{testimonial.author}</strong>
                <span>{testimonial.role}</span>
              </div>
            </div>
          )) : (
            // Fallback content if translations aren't loaded
            <div className={styles.testimonialCard}>
              <div className={styles.testimonialRating}>
                {[...Array(5)].map((_, i) => (
                  <span key={i}>★</span>
                ))}
              </div>
              <p className={styles.testimonialText}>&quot;Loading testimonials...&quot;</p>
              <div className={styles.testimonialAuthor}>
                <strong>Loading...</strong>
                <span>Please wait</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}