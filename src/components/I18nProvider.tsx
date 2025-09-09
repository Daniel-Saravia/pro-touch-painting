'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const esTranslations = await fetch('/locales/es/translation.json').then(res => res.json());
        const enTranslations = await fetch('/locales/en/translation.json').then(res => res.json());
        
        i18n.addResourceBundle('es', 'translation', esTranslations, true, true);
        i18n.addResourceBundle('en', 'translation', enTranslations, true, true);
        
        const savedLanguage = localStorage.getItem('i18nextLng') || 'es';
        await i18n.changeLanguage(savedLanguage);
        
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading translations:', error);
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []);

  if (isLoading) {
    return <>{children}</>;
  }

  return (
    <I18nextProvider i18n={i18n}>
      {children}
    </I18nextProvider>
  );
}