import styles from './CTASection.module.css'

export default function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className="container">
        <div className={styles.ctaContent}>
          <h2 className={styles.ctaTitle}>Ready to Transform Your Space?</h2>
          <p className={styles.ctaSubtitle}>Get a free, no-obligation quote for your project today</p>
          <div className={styles.ctaButtons}>
            <a href="tel:602-680-7263" className="btn btn-white">Call Now: (602) 680-7263</a>
            <a href="#contact" className="btn btn-primary">Get Free Quote</a>
          </div>
        </div>
      </div>
    </section>
  )
}