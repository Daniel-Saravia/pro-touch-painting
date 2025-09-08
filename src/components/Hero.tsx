'use client'

import dynamic from 'next/dynamic'
import styles from './Hero.module.css'

// Dynamically import 3D model to avoid SSR issues
const Hero3DModel = dynamic(() => import('./Hero3DModel'), {
  ssr: false,
  loading: () => null
})

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      <Hero3DModel />
      <div className="container">
      </div>
    </section>
  )
}