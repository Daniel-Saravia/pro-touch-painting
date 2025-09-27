'use client'

import Image from 'next/image'
import { useTranslation } from 'react-i18next'
import styles from './Services.module.css'

export default function Services() {
  const { t } = useTranslation()
  
  const services = [
    {
      id: 1,
      key: 'drywall',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <line x1="9" y1="9" x2="15" y2="9"></line>
          <line x1="9" y1="13" x2="15" y2="13"></line>
          <line x1="9" y1="17" x2="15" y2="17"></line>
        </svg>
      ),
      image: "/assets/drywall.avif",
      features: [
        "New construction drywall",
        "Damage repair & patching",
        "Seamless finishing",
        "Water damage restoration"
      ]
    },
    {
      id: 2,
      key: 'popcorn',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
          <path d="M9 22V12h6v10"></path>
        </svg>
      ),
      image: "/assets/popcorn.avif",
      features: [
        "Safe asbestos testing",
        "Clean removal process",
        "Smooth ceiling finishing",
        "Modern texture options"
      ]
    },
    {
      id: 3,
      key: 'cabinet',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
          <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
        </svg>
      ),
      image: "/assets/cabinet.avif",
      features: [
        "Complete color changes",
        "Professional spray finishing",
        "Hardware updates",
        "Same-day completion available"
      ]
    },
    {
      id: 4,
      key: 'power',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"></path>
          <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
          <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
          <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
          <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
          <line x1="12" y1="22.08" x2="12" y2="12"></line>
        </svg>
      ),
      image: "/assets/Power-Washing-Your-Driveway.avif",
      features: [
        "House exterior cleaning",
        "Driveway & sidewalk restoration",
        "Deck & fence cleaning",
        "Pre-paint surface preparation"
      ]
    },
    {
      id: 5,
      key: 'epoxy',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3h18v18H3z"></path>
          <rect x="7" y="7" width="3" height="3"></rect>
          <rect x="14" y="7" width="3" height="3"></rect>
          <rect x="7" y="14" width="3" height="3"></rect>
          <rect x="14" y="14" width="3" height="3"></rect>
        </svg>
      ),
      image: "/assets/chips.png",
      features: [
        "Multiple chip color combinations",
        "Gradient and solid color options",
        "Chemical and stain resistant",
        "Easy to clean and maintain"
      ]
    },
    {
      id: 6,
      key: 'texture',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
          <polyline points="14 2 14 8 20 8"></polyline>
          <line x1="16" y1="13" x2="8" y2="13"></line>
          <line x1="16" y1="17" x2="8" y2="17"></line>
          <polyline points="10 9 9 9 8 9"></polyline>
        </svg>
      ),
      image: "/assets/Types-of-Wall-Texture.avif",
      features: [
        "Orange peel texture",
        "Knockdown texture",
        "Skip trowel finishes",
        "Custom texture matching"
      ]
    },
    {
      id: 7,
      key: 'painting',
      icon: (
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path>
        </svg>
      ),
      image: "/assets/construction-worker-painting.avif",
      features: [
        "Color consultation",
        "Premium paint products",
        "Detailed prep work",
        "Clean, efficient process"
      ],
      featured: true
    }
  ]

  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('services.title')}</h2>
          <p className="section-subtitle">{t('services.subtitle')}</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={`${styles.serviceCard} ${service.featured ? styles.featured : ''}`}>
              <div className={styles.serviceImageContainer}>
                {service.image ? (
                  <Image 
                    src={service.image} 
                    alt={t(`services.${service.key}.title`)}
                    fill
                    className={styles.serviceImage}
                  />
                ) : (
                  <div className={styles.serviceImagePlaceholder}>
                    <span>Service Image</span>
                  </div>
                )}
              </div>
              <div className={styles.serviceContent}>
                <h3 className={styles.serviceTitle}>{t(`services.${service.key}.title`)}</h3>
                <p className={styles.serviceDescription}>{t(`services.${service.key}.description`)}</p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <a href="#contact" className={styles.serviceLink}>{t('services.learnMore')} →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}