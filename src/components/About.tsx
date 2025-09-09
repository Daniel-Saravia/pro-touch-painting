'use client'

import { useTranslation } from 'react-i18next'
import styles from './About.module.css'

export default function About() {
  const { t } = useTranslation()
  
  return (
    <section id="about" className={styles.about}>
      <div className="container">
        <div className={styles.aboutContent}>
          <div className={styles.aboutText}>
            <h2 className="section-title">{t('about.title')}</h2>
            <p className={styles.aboutDescription}>
              {t('about.description')}
            </p>
            <div className={styles.aboutFeatures}>
              <div className={styles.aboutFeature}>
                <svg className={styles.aboutIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div>
                  <h4>{t('about.onTime.title')}</h4>
                  <p>{t('about.onTime.description')}</p>
                </div>
              </div>
              <div className={styles.aboutFeature}>
                <svg className={styles.aboutIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <div>
                  <h4>{t('about.quality.title')}</h4>
                  <p>{t('about.quality.description')}</p>
                </div>
              </div>
              <div className={styles.aboutFeature}>
                <svg className={styles.aboutIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                </svg>
                <div>
                  <h4>{t('about.communication.title')}</h4>
                  <p>{t('about.communication.description')}</p>
                </div>
              </div>
              <div className={styles.aboutFeature}>
                <svg className={styles.aboutIcon} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"></path>
                  <polyline points="9 22 9 12 15 12 15 22"></polyline>
                </svg>
                <div>
                  <h4>{t('about.licensed.title')}</h4>
                  <p>{t('about.licensed.description')}</p>
                  <p className={styles.licenseNumbers}>CR - 34 #328624 | CR - 10 #342592</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.aboutStats}>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>25+</div>
              <div className={styles.statLabel}>{t('about.stats.yearsExperience')}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>2,500+</div>
              <div className={styles.statLabel}>{t('about.stats.projectsCompleted')}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>100%</div>
              <div className={styles.statLabel}>{t('about.stats.satisfactionRate')}</div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statNumber}>5.0</div>
              <div className={styles.statLabel}>{t('about.stats.starRating')}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}