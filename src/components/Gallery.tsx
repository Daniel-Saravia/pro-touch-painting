'use client'

import { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useTranslation } from 'react-i18next'
import styles from './Gallery.module.css'

const galleryItems = [
  {
    id: 1,
    image: 'https://protouchgallery.s3.us-east-2.amazonaws.com/Cabinets/buleCabinets.jpg'
  },
  {
    id: 2,
    image: 'https://protouchgallery.s3.us-east-2.amazonaws.com/House/dreamHouse.jpg'
  },
  {
    id: 3,
    image: 'https://protouchgallery.s3.us-east-2.amazonaws.com/House/greyHouse.jpg'
  },
  {
    id: 4,
    image: 'https://protouchgallery.s3.us-east-2.amazonaws.com/House/nicePool.jpg'
  },
  {
    id: 5,
    image: 'https://protouchgallery.s3.us-east-2.amazonaws.com/House/offWhiteHouse.jpg'
  },
  {
    id: 6,
    image: 'https://protouchgallery.s3.us-east-2.amazonaws.com/House/tallCeiling.jpg'
  }
]

export default function Gallery() {
  const { t, ready } = useTranslation()
  const router = useRouter()
  const [isNavigating, setIsNavigating] = useState(false)

  useEffect(() => {
    if (router.prefetch) {
      router.prefetch('/gallery')
    }
  }, [router])

  const handleNavigate = useCallback(() => {
    if (isNavigating) return
    setIsNavigating(true)
    router.push('/gallery')
  }, [isNavigating, router])

  const buttonLabel = ready ? t('gallery.viewWork') : 'View Our Work'
  const loadingLabel = ready ? t('gallery.loading') : 'Loading...'

  if (!ready) {
    return (
      <section id="gallery" className={styles.gallery}>
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Work Gallery</h2>
            <p className="section-subtitle">See the quality and craftsmanship in our recent projects</p>
          </div>
          <div className={styles.galleryGrid}>
            {galleryItems.map(item => (
              <div key={item.id} className={styles.galleryItem}>
                <div className={styles.imageContainer}>
                  <img
                    src={item.image}
                    alt="Phoenix project"
                    className={styles.galleryImage}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className={styles.galleryCTA}>
            <button
              type="button"
              className={`btn btn-secondary ${styles.ctaButton}`}
              onClick={handleNavigate}
              disabled={isNavigating}
              aria-busy={isNavigating}
            >
              {isNavigating && <span className={styles.loadingSpinner} aria-hidden="true" />}
              <span>{isNavigating ? loadingLabel : buttonLabel}</span>
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="gallery" className={styles.gallery}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('gallery.title')}</h2>
          <p className="section-subtitle">{t('gallery.subtitle')}</p>
        </div>
        <div className={styles.galleryGrid}>
          {galleryItems.map(item => (
            <div key={item.id} className={styles.galleryItem}>
              <div className={styles.imageContainer}>
                <img
                  src={item.image}
                  alt="Phoenix project"
                  className={styles.galleryImage}
                />
              </div>
            </div>
          ))}
        </div>
        <div className={styles.galleryCTA}>
          <button
            type="button"
            className={`btn btn-secondary ${styles.ctaButton}`}
            onClick={handleNavigate}
            disabled={isNavigating}
            aria-busy={isNavigating}
          >
            {isNavigating && <span className={styles.loadingSpinner} aria-hidden="true" />}
            <span>{isNavigating ? loadingLabel : buttonLabel}</span>
          </button>
        </div>
      </div>
    </section>
  )
}
