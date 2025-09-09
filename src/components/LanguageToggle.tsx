'use client';

import { useTranslation } from 'react-i18next';
import styles from './LanguageToggle.module.css';

export default function LanguageToggle() {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'es' ? 'en' : 'es';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <button 
      className={styles.languageToggle}
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <span className={styles.langText}>
        {i18n.language === 'es' ? 'EN' : 'ES'}
      </span>
    </button>
  );
}