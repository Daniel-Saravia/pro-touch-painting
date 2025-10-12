'use client';

import { useEffect, useState } from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/lib/i18n';

export default function I18nProvider({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadTranslations = async () => {
      try {
        const [esTranslations, enTranslations] = await Promise.all([
          fetch('/locales/es/translation.json').then(res => res.json()),
          fetch('/locales/en/translation.json').then(res => res.json())
        ]);

        i18n.addResourceBundle('es', 'translation', esTranslations, true, true);
        i18n.addResourceBundle('en', 'translation', enTranslations, true, true);

        const url = new URL(window.location.href);
        const paramLanguage = url.searchParams.get('lang') || url.searchParams.get('lng');
        const storedLanguage = localStorage.getItem('i18nextLng');
        const preferredLanguage = (paramLanguage && ['en', 'es'].includes(paramLanguage)) ? paramLanguage : storedLanguage;
        const initialLanguage = preferredLanguage || 'en';

        await i18n.changeLanguage(initialLanguage);
        document.documentElement.setAttribute('lang', initialLanguage);
        localStorage.setItem('i18nextLng', initialLanguage);
        url.searchParams.set('lang', initialLanguage);
        window.history.replaceState({}, '', url.toString());

        setIsLoading(false);
      } catch (error) {
        console.error('Error loading translations:', error);
        setIsLoading(false);
      }
    };

    loadTranslations();
  }, []);

  useEffect(() => {
    const handleLanguageChange = (lng: string) => {
      if (!['en', 'es'].includes(lng)) {
        return;
      }
      document.documentElement.setAttribute('lang', lng);
      localStorage.setItem('i18nextLng', lng);
      const url = new URL(window.location.href);
      url.searchParams.set('lang', lng);
      window.history.replaceState({}, '', url.toString());
    };

    i18n.on('languageChanged', handleLanguageChange);
    handleLanguageChange(i18n.language);

    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
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
