'use client'

import { useTranslation } from 'react-i18next'
import styles from './Gallery.module.css'

const galleryItems = [
  {
    id: 1,
    title: 'Sun City House Painting',
    titleEs: 'Pintura de Casa en Sun City',
    description: 'Professional exterior house painting in Sun City',
    descriptionEs: 'Pintura profesional de exteriores de casa en Sun City',
    image: '/assets/gallery/1.JPEG'
  },
  {
    id: 2,
    title: 'Sun City House Painting',
    titleEs: 'Pintura de Casa en Sun City',
    description: 'Quality exterior house painting in Sun City',
    descriptionEs: 'Pintura de calidad para exteriores de casa en Sun City',
    image: '/assets/gallery/2.JPEG'
  },
  {
    id: 3,
    title: 'Sun City House Painting',
    titleEs: 'Pintura de Casa en Sun City',
    description: 'Expert exterior house painting in Sun City',
    descriptionEs: 'Pintura experta de exteriores de casa en Sun City',
    image: '/assets/gallery/3.JPEG'
  },
  {
    id: 4,
    title: 'Sun City House Painting',
    titleEs: 'Pintura de Casa en Sun City',
    description: 'Complete exterior house painting in Sun City',
    descriptionEs: 'Pintura completa de exteriores de casa en Sun City',
    image: '/assets/gallery/4.JPEG'
  }
]

export default function Gallery() {
  const { t, i18n, ready } = useTranslation()
  const isSpanish = i18n.language === 'es'

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
                    alt={item.title}
                    className={styles.galleryImage}
                  />
                </div>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
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
                  alt={isSpanish ? item.titleEs : item.title}
                  className={styles.galleryImage}
                />
              </div>
              <h4>{isSpanish ? item.titleEs : item.title}</h4>
              <p>{isSpanish ? item.descriptionEs : item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}