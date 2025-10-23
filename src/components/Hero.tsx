'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
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

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      {shouldRenderModel && <Hero3DModel />}
      <div className={styles.phoneNumber}>
        <a href="tel:6026807263" className={styles.phoneLink}>
          602-680-7263
        </a>
      </div>
    </section>
  )
}
