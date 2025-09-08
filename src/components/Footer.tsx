import Image from 'next/image'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footerContent}>
          <div className={styles.footerColumn}>
            <Image src="/assets/ProTouch.svg" alt="Pro Touch Painting & Drywall" width={120} height={40} className={styles.footerLogo} />
            <p className={styles.footerDescription}>
              Your trusted partner for professional painting and drywall services. Quality craftsmanship, guaranteed satisfaction.
            </p>
            <div className={styles.socialLinks}>
              <a href="#" aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                </svg>
              </a>
              <a href="#" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a href="#" aria-label="Google">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"></path>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"></path>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"></path>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"></path>
                </svg>
              </a>
            </div>
          </div>
          <div className={styles.footerColumn}>
            <h4>Services</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#services">Interior Painting</a></li>
              <li><a href="#services">Exterior Painting</a></li>
              <li><a href="#services">Drywall Services</a></li>
              <li><a href="#services">Cabinet Refinishing</a></li>
              <li><a href="#services">Power Washing</a></li>
              <li><a href="#services">Texture Application</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4>Quick Links</h4>
            <ul className={styles.footerLinks}>
              <li><a href="#home">Home</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#gallery">Gallery</a></li>
              <li><a href="#testimonials">Reviews</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#">Free Quote</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <h4>Business Hours</h4>
            <ul className={styles.hoursList}>
              <li><span>Monday - Friday:</span> 7:00 AM - 6:00 PM</li>
              <li><span>Saturday:</span> 8:00 AM - 4:00 PM</li>
              <li><span>Sunday:</span> Emergency Only</li>
            </ul>
            <div className={styles.emergencyContact}>
              <p><strong>24/7 Emergency Service</strong></p>
              <a href="tel:602-680-7263" className={styles.emergencyNumber}>(602) 680-7263</a>
            </div>
          </div>
        </div>
        <div className={styles.footerBottom}>
          <p>&copy; 2024 Pro Touch Painting & Drywall. All rights reserved. | Licensed & Insured | ROC #123456</p>
        </div>
      </div>
    </footer>
  )
}