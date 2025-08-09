'use client';

import {useParams} from 'next/navigation';
import {translations, type Locale} from '@/i18n/translations';

export function useTranslations() {
  const params = useParams();
  // Use English as default for root page, French for others
  const locale = (params?.locale as Locale) || 'en';
  
  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[locale];
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        // Fallback to English if translation not found
        value = keys.reduce((obj, k) => obj?.[k], translations.en);
        break;
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  return {
    t,
    locale,
    isLocale: (loc: string) => locale === loc,
  };
}
