'use client'

import { useState } from 'react'
import styles from './Gallery.module.css'

const galleryItems = [
  {
    id: 1,
    category: 'painting',
    title: 'Living Room Transformation',
    description: 'Complete interior painting with accent wall',
    beforeImage: '/gallery/painting-before-1.jpg',
    afterImage: '/gallery/painting-after-1.jpg'
  },
  {
    id: 2,
    category: 'drywall',
    title: 'Drywall Repair & Finishing',
    description: 'Water damage restoration and seamless repair',
    beforeImage: '/gallery/drywall-before-1.jpg',
    afterImage: '/gallery/drywall-after-1.jpg'
  },
  {
    id: 3,
    category: 'cabinet',
    title: 'Kitchen Cabinet Refinishing',
    description: 'Modern white finish with new hardware',
    beforeImage: '/gallery/cabinet-before-1.jpg',
    afterImage: '/gallery/cabinet-after-1.jpg'
  },
  {
    id: 4,
    category: 'exterior',
    title: 'House Exterior Power Wash',
    description: 'Complete exterior cleaning and restoration',
    beforeImage: '/gallery/exterior-before-1.jpg',
    afterImage: '/gallery/exterior-after-1.jpg'
  }
]

const categories = [
  { id: 'all', label: 'All Projects' },
  { id: 'painting', label: 'Painting' },
  { id: 'drywall', label: 'Drywall' },
  { id: 'cabinet', label: 'Cabinets' },
  { id: 'exterior', label: 'Exterior' }
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory)

  return (
    <section id="gallery" className={styles.gallery}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Work Gallery</h2>
          <p className="section-subtitle">See the quality and craftsmanship in our recent projects</p>
        </div>
        <div className={styles.galleryTabs}>
          {categories.map(category => (
            <button
              key={category.id}
              className={`${styles.galleryTab} ${activeCategory === category.id ? styles.active : ''}`}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </div>
        <div className={styles.galleryGrid}>
          {filteredItems.map(item => (
            <div key={item.id} className={styles.galleryItem}>
              <div className={styles.beforeAfterContainer}>
                <div className={styles.beforeSide}>
                  <div className={styles.imagePlaceholder} data-label="Before">
                    <span>Before</span>
                  </div>
                </div>
                <div className={styles.afterSide}>
                  <div className={styles.imagePlaceholder} data-label="After" style={{ backgroundColor: 'var(--primary-orange)' }}>
                    <span>After</span>
                  </div>
                </div>
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