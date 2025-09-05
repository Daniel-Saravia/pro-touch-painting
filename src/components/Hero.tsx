import styles from './Hero.module.css'

export default function Hero() {
  return (
    <section id="home" className={styles.hero}>
      <div className={styles.heroOverlay}></div>
      <div className="container">
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Transform Your Space with Professional Excellence</h1>
          <p className={styles.heroSubtitle}>Premier Painting & Drywall Services for Residential and Commercial Properties</p>
          <div className={styles.heroFeatures}>
            <div className={styles.heroFeature}>
              <svg className={styles.heroIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 11l3 3L22 4"></path>
                <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
              </svg>
              <span>25+ Years Experience</span>
            </div>
            <div className={styles.heroFeature}>
              <svg className={styles.heroIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
              </svg>
              <span>5-Star Rated Service</span>
            </div>
            <div className={styles.heroFeature}>
              <svg className={styles.heroIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              <span>Fully Licensed & Insured</span>
            </div>
          </div>
          <div className={styles.heroCta}>
            <a href="#contact" className="btn btn-primary">Get Free Quote</a>
            <a href="#services" className="btn btn-secondary">Our Services</a>
          </div>
        </div>
      </div>
    </section>
  )
}