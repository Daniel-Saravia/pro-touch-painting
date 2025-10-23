'use client'

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useRouter } from 'next/navigation'
import type { GalleryAsset, GallerySections, GallerySectionKey } from '@/lib/gallery'
import styles from './GalleryPageContent.module.css'

type GalleryPageContentProps = {
  sections: GallerySections
}

const sectionOrder: GallerySectionKey[] = ['Cabinets', 'House']

export default function GalleryPageContent({ sections }: GalleryPageContentProps) {
  const { t, i18n } = useTranslation()
  const router = useRouter()

  const localizedSections = useMemo(() => {
    return sectionOrder.map(sectionKey => {
      const assets = sections?.[sectionKey] ?? []
      return {
        key: sectionKey,
        label: t(`gallery.sections.${sectionKey.toLowerCase() as 'cabinets' | 'house'}`),
        assets
      }
    })
  }, [sections, t, i18n.language])

  const handleBackClick = () => {
    if (typeof window !== 'undefined' && window.history.length > 1) {
      router.back()
      return
    }
    router.push('/')
  }

  return (
    <section className={styles.page}>
      <div className="container">
        <button
          type="button"
          className={`${styles.backButton} btn btn-secondary`}
          onClick={handleBackClick}
        >
          {t('gallery.back')}
        </button>

        <div className={styles.hero}>
          <h1 className={styles.title}>{t('gallery.title')}</h1>
          <p className={styles.subtitle}>{t('gallery.subtitle')}</p>
        </div>

        {localizedSections.map(section => (
          <div key={section.key} className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>{section.label}</h2>
              <p className={styles.sectionCount}>
                {t('gallery.photoCount', { count: section.assets.length })}
              </p>
            </div>

            {section.assets.length > 0 ? (
              <div className={styles.grid}>
                {section.assets.map(asset => (
                  <figure key={asset.key} className={styles.card}>
                    <div className={styles.imageWrapper}>
                      <img
                        src={asset.src}
                        alt={asset.alt}
                        loading="lazy"
                      />
                    </div>
                  </figure>
                ))}
              </div>
            ) : (
              <p className={styles.emptyState}>{t('gallery.empty')}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
