'use client'

import styles from './Gallery.module.css'

const galleryItems = [
  {
    id: 1,
    title: 'Living Room Transformation',
    description: 'Complete interior painting with accent wall',
    image: '/assets/gallery/1.JPEG'
  },
  {
    id: 2,
    title: 'Drywall Repair & Finishing',
    description: 'Water damage restoration and seamless repair',
    image: '/assets/gallery/2.JPEG'
  },
  {
    id: 3,
    title: 'Kitchen Cabinet Refinishing',
    description: 'Modern white finish with new hardware',
    image: '/assets/gallery/3.JPEG'
  },
  {
    id: 4,
    title: 'House Exterior Power Wash',
    description: 'Complete exterior cleaning and restoration',
    image: '/assets/gallery/4.JPEG'
  }
]

export default function Gallery() {
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