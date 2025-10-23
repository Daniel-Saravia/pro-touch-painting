'use client'

import Link from 'next/link'
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
            <Link href="/gallery" className="btn btn-secondary">
              View Our Work
            </Link>
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
          <Link href="/gallery" className="btn btn-secondary">
            {t('gallery.viewWork')}
          </Link>
        </div>
      </div>
    </section>
  )
}
