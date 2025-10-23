'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { useTranslation } from 'react-i18next'
import styles from './Hero.module.css'

// Dynamically import 3D model and defer until the browser is idle
const Hero3DModel = dynamic(() => import('./Hero3DModel'), {
  ssr: false,
  loading: () => null
})

type WindowWithIdle = Window & {
  requestIdleCallback?: (callback: IdleRequestCallback) => number
  cancelIdleCallback?: (handle: number) => void
}

export default function Hero() {
  const { t } = useTranslation()
  const [shouldRenderModel, setShouldRenderModel] = useState(false)

  useEffect(() => {
    let idleHandle: number | undefined
    let timeoutHandle: number | undefined

    if (typeof window !== 'undefined') {
      const win = window as WindowWithIdle

      if (typeof win.requestIdleCallback === 'function') {
        idleHandle = win.requestIdleCallback(() => setShouldRenderModel(true))
      } else {
        timeoutHandle = window.setTimeout(() => setShouldRenderModel(true), 1200)
      }
    }

    return () => {
      if (typeof window === 'undefined') return

      const win = window as WindowWithIdle

      if (idleHandle !== undefined && typeof win.cancelIdleCallback === 'function') {
        win.cancelIdleCallback(idleHandle)
      }

      if (timeoutHandle !== undefined) {
        window.clearTimeout(timeoutHandle)
      }
    }
  }, [])

  const features = t('hero.features', { returnObjects: true })
  const heroFeatures = Array.isArray(features) ? features : []

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      {shouldRenderModel && <Hero3DModel />}
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>{t('hero.title')}</h1>
          <p className={styles.heroSubtitle}>{t('hero.description')}</p>
          {heroFeatures.length > 0 && (
            <div className={styles.heroFeatures} aria-label={t('hero.subtitle')}>
              {heroFeatures.map((feature: string) => (
                <div key={feature} className={styles.heroFeature}>
                  <svg
                    className={styles.heroIcon}
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}
          <div className={styles.heroCta}>
            <a href="#contact" className="btn btn-primary">
              {t('hero.cta')}
            </a>
            <a href="#services" className="btn btn-secondary">
              {t('hero.learnMore')}
            </a>
          </div>
        </div>
      </div>
      <div className={styles.phoneNumber}>
        <a href="tel:6026807263" className={styles.phoneLink}>
          602-680-7263
        </a>
      </div>
    </section>
  )
}
