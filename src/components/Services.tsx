import Image from 'next/image'
import styles from './Services.module.css'

const services = [
  {
    id: 1,
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="9"></line>
        <line x1="9" y1="13" x2="15" y2="13"></line>
        <line x1="9" y1="17" x2="15" y2="17"></line>
      </svg>
    ),
    title: "Drywall Installation & Repair",
    description: "Expert installation of new drywall and seamless repairs for existing walls. We handle everything from small patches to complete room installations.",
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
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
        <path d="M9 22V12h6v10"></path>
      </svg>
    ),
    title: "Popcorn Ceiling Removal",
    description: "Transform outdated popcorn ceilings into smooth, modern surfaces. Safe removal with minimal mess and disruption to your home.",
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
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"></path>
      </svg>
    ),
    title: "Cabinet Refinishing",
    description: "Give your kitchen or bathroom a stunning makeover with professional cabinet refinishing. Save thousands compared to replacement.",
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
    title: "Power Washing",
    description: "Restore your property's exterior surfaces to like-new condition with professional power washing services.",
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
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <polyline points="10 9 9 9 8 9"></polyline>
      </svg>
    ),
    title: "Texture Application",
    description: "Add character and dimension to your walls and ceilings with professional texture application services.",
    image: "/assets/Types-of-Wall-Texture.avif",
    features: [
      "Orange peel texture",
      "Knockdown texture",
      "Skip trowel finishes",
      "Custom texture matching"
    ]
  },
  {
    id: 6,
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"></path>
      </svg>
    ),
    title: "Interior & Exterior Painting",
    description: "Transform any space with our premium painting services. We use top-quality paints and meticulous techniques for flawless results.",
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

export default function Services() {
  return (
    <section id="services" className={styles.services}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Professional Services</h2>
          <p className="section-subtitle">Comprehensive solutions for all your painting and drywall needs</p>
        </div>
        <div className={styles.servicesGrid}>
          {services.map((service) => (
            <div key={service.id} className={`${styles.serviceCard} ${service.featured ? styles.featured : ''}`}>
              <div className={styles.serviceImageContainer}>
                {service.image ? (
                  <Image 
                    src={service.image} 
                    alt={service.title}
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
                <h3 className={styles.serviceTitle}>{service.title}</h3>
                <p className={styles.serviceDescription}>{service.description}</p>
                <ul className={styles.serviceFeatures}>
                  {service.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <a href="#contact" className={styles.serviceLink}>Learn More →</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}