'use client'

import { useState, FormEvent } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Contact.module.css'

export default function Contact() {
  const { t } = useTranslation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        alert(t('contact.form.alerts.success'))
        setFormData({
          name: '',
          email: '',
          phone: '',
          service: '',
          message: ''
        })
      } else {
        alert(t('contact.form.alerts.error'))
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      alert(t('contact.form.alerts.error'))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">{t('contact.title')}</h2>
          <p className="section-subtitle">{t('contact.subtitle')}</p>
        </div>
        <div className={styles.contactContent}>
          <div className={styles.contactFormWrapper}>
            <form className={styles.contactForm} onSubmit={handleSubmit}>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">{t('contact.form.name')}</label>
                  <input 
                    type="text" 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="email">{t('contact.form.email')}</label>
                  <input 
                    type="email" 
                    id="email" 
                    name="email" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                  />
                </div>
              </div>
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="phone">{t('contact.form.phone')}</label>
                  <input 
                    type="tel" 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    required 
                  />
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="service">{t('contact.form.service')}</label>
                  <select 
                    id="service" 
                    name="service" 
                    value={formData.service}
                    onChange={handleChange}
                    required
                  >
                    <option value="">{t('contact.form.serviceSelect')}</option>
                    <option value="painting">{t('contact.form.services.painting')}</option>
                    <option value="drywall">{t('contact.form.services.drywall')}</option>
                    <option value="popcorn">{t('contact.form.services.popcorn')}</option>
                    <option value="cabinet">{t('contact.form.services.cabinet')}</option>
                    <option value="power">{t('contact.form.services.power')}</option>
                    <option value="texture">{t('contact.form.services.texture')}</option>
                    <option value="multiple">{t('contact.form.services.multiple')}</option>
                  </select>
                </div>
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">{t('contact.form.message')}</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={5} 
                  placeholder={t('contact.form.messagePlaceholder')}
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-block" disabled={isSubmitting}>
                {isSubmitting ? t('contact.form.submitting') : t('contact.form.submit')}
              </button>
            </form>
          </div>
          <div className={styles.contactInfo}>
            <div className={styles.infoCard}>
              <h3>{t('contact.info.title')}</h3>
              <div className={styles.infoItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"></path>
                </svg>
                <div>
                  <strong>{t('contact.info.phone')}</strong>
                  <p>(602) 680-7263</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <div>
                  <strong>{t('contact.info.email')}</strong>
                  <p>info@protouchpainting.com</p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
                <div>
                  <strong>{t('contact.info.hours')}</strong>
                  <p dangerouslySetInnerHTML={{ __html: t('contact.info.hoursDetail') }}></p>
                </div>
              </div>
              <div className={styles.infoItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <div>
                  <strong>{t('contact.info.serviceArea')}</strong>
                  <p dangerouslySetInnerHTML={{ __html: t('contact.info.serviceAreaDetail') }}></p>
                </div>
              </div>
            </div>
            <div className={styles.trustBadges}>
              <div className={styles.badge}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span>{t('contact.info.badges.bbb')}</span>
              </div>
              <div className={styles.badge}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                <span>{t('contact.info.badges.insured')}</span>
              </div>
              <div className={styles.badge}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 11l3 3L22 4"></path>
                  <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"></path>
                </svg>
                <span>{t('contact.info.badges.licensed')}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}