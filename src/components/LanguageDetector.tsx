'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const locales = ['en', 'es', 'fr', 'it', 'pt', 'ru'];
const defaultLocale = 'en';

// Mapping des codes de langue vers nos locales supportées
const languageMap: Record<string, string> = {
  'en': 'en', 'en-US': 'en', 'en-GB': 'en', 'en-CA': 'en', 'en-AU': 'en',
  'fr': 'fr', 'fr-FR': 'fr', 'fr-CA': 'fr', 'fr-BE': 'fr', 'fr-CH': 'fr',
  'es': 'es', 'es-ES': 'es', 'es-MX': 'es', 'es-AR': 'es', 'es-CO': 'es',
  'it': 'it', 'it-IT': 'it', 'it-CH': 'it',
  'pt': 'pt', 'pt-PT': 'pt', 'pt-BR': 'pt',
  'ru': 'ru', 'ru-RU': 'ru', 'ru-BY': 'ru', 'ru-KZ': 'ru',
  // Fallbacks pour d'autres langues européennes courantes
  'de': 'en', 'nl': 'en', 'sv': 'en', 'no': 'en', 'da': 'en',
  'pl': 'en', 'cs': 'en', 'sk': 'en', 'hu': 'en', 'ro': 'en',
  'ar': 'en', 'zh': 'en', 'ja': 'en', 'ko': 'en', 'hi': 'en'
};

export function LanguageDetector() {
  const router = useRouter();

  useEffect(() => {
    // Ne faire la détection que si on est sur la page racine
    if (window.location.pathname !== '/') return;

    // Vérifier si l'utilisateur a déjà choisi une langue (stockée dans localStorage)
    const storedLocale = localStorage.getItem('preferred-locale');
    if (storedLocale && locales.includes(storedLocale)) {
      if (storedLocale !== defaultLocale) {
        router.replace(`/${storedLocale}`);
      }
      return;
    }

    // Détecter la langue du navigateur
    const browserLanguages = navigator.languages || [navigator.language];
    let detectedLocale = defaultLocale;

    // Essayer de trouver une correspondance exacte ou partielle
    for (const lang of browserLanguages) {
      const normalizedLang = lang.toLowerCase();
      
      // Correspondance exacte
      if (languageMap[normalizedLang]) {
        detectedLocale = languageMap[normalizedLang];
        break;
      }
      
      // Correspondance par code de langue principal (ex: "fr" pour "fr-FR")
      const primaryLang = normalizedLang.split('-')[0];
      if (languageMap[primaryLang]) {
        detectedLocale = languageMap[primaryLang];
        break;
      }
    }

    // Stocker la préférence détectée
    localStorage.setItem('preferred-locale', detectedLocale);

    // Rediriger vers la langue détectée si ce n'est pas la langue par défaut
    if (detectedLocale !== defaultLocale) {
      router.replace(`/${detectedLocale}`);
    }
  }, [router]);

  return null; // Ce composant ne rend rien visuellement
}
