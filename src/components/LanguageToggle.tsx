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

  const USAFlag = () => (
    <svg className={styles.flag} viewBox="0 0 24 16" width="20" height="13">
      <rect width="24" height="16" fill="#B22234"/>
      <rect y="1" width="24" height="1" fill="#FFFFFF"/>
      <rect y="3" width="24" height="1" fill="#FFFFFF"/>
      <rect y="5" width="24" height="1" fill="#FFFFFF"/>
      <rect y="7" width="24" height="1" fill="#FFFFFF"/>
      <rect y="9" width="24" height="1" fill="#FFFFFF"/>
      <rect y="11" width="24" height="1" fill="#FFFFFF"/>
      <rect y="13" width="24" height="1" fill="#FFFFFF"/>
      <rect y="15" width="24" height="1" fill="#FFFFFF"/>
      <rect width="10" height="8" fill="#3C3B6E"/>
    </svg>
  );

  const MexicoFlag = () => (
    <svg className={styles.flag} viewBox="0 0 24 16" width="20" height="13">
      <rect width="8" height="16" fill="#006847"/>
      <rect x="8" width="8" height="16" fill="#FFFFFF"/>
      <rect x="16" width="8" height="16" fill="#CE1126"/>
      {/* Simplified Eagle Emblem */}
      <g transform="translate(12, 8)">
        {/* Eagle body */}
        <ellipse cx="0" cy="0" rx="2" ry="1.5" fill="#8B4513"/>
        {/* Eagle head */}
        <circle cx="0" cy="-1" r="0.8" fill="#654321"/>
        {/* Eagle beak */}
        <path d="M0.8,-1 L1.2,-0.8 L0.8,-0.6 Z" fill="#FFA500"/>
        {/* Eagle wings */}
        <path d="M-2,-0.5 Q-2.8,0 -2,0.8 Q-1.2,0.2 -1.5,-0.5 Z" fill="#8B4513"/>
        <path d="M2,-0.5 Q2.8,0 2,0.8 Q1.2,0.2 1.5,-0.5 Z" fill="#8B4513"/>
        {/* Eagle tail */}
        <path d="M-0.5,1.2 Q0,2.2 0.5,1.2 Q0,1.8 -0.5,1.2 Z" fill="#654321"/>
      </g>
    </svg>
  );

  return (
    <button
      className={styles.languageToggle}
      onClick={toggleLanguage}
      aria-label="Toggle language"
    >
      <div className={styles.flagContainer}>
        {i18n.language === 'es' ? <USAFlag /> : <MexicoFlag />}
        <span className={styles.langText}>
          {i18n.language === 'es' ? 'EN' : 'ES'}
        </span>
      </div>
    </button>
  );
}