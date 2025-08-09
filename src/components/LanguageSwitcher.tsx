'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const locales = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇵🇹' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
];

export function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // Détecter la locale actuelle à partir du pathname
  const currentLocale = pathname.split('/')[1] || 'en';
  const currentLanguage = locales.find(locale => locale.code === currentLocale) || locales[0];

  const switchLanguage = (localeCode: string) => {
    // Stocker la préférence de l'utilisateur
    localStorage.setItem('preferred-locale', localeCode);
    
    // Construire le nouveau chemin en fonction de la langue
    const pathSegments = pathname.split('/').filter(Boolean);
    const currentLocaleInPath = pathSegments[0];
    
    // Retirer la locale actuelle du chemin si elle existe
    let pathWithoutLocale = '';
    if (['en', 'fr', 'es', 'it', 'pt', 'ru'].includes(currentLocaleInPath)) {
      pathWithoutLocale = pathSegments.slice(1).join('/');
    } else {
      pathWithoutLocale = pathSegments.join('/');
    }
    
    // Toujours utiliser le préfixe de langue, même pour l'anglais
    // Le middleware se chargera de rediriger /en vers / si nécessaire
    const newPath = `/${localeCode}${pathWithoutLocale ? `/${pathWithoutLocale}` : ''}`;
    router.push(newPath);
    
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
        aria-label="Changer de langue"
      >
        <span className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
          {currentLanguage.flag}
        </span>
        <span className="hidden sm:inline">{currentLanguage.name}</span>
        <svg 
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Overlay pour fermer le menu */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu déroulant */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-20">
            <div className="py-2">
              {locales.map((locale) => (
                <button
                  key={locale.code}
                  onClick={() => switchLanguage(locale.code)}
                  className={`w-full flex items-center space-x-3 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors ${
                    currentLocale === locale.code
                      ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-lg">{locale.flag}</span>
                  <span className="font-medium">{locale.name}</span>
                  {currentLocale === locale.code && (
                    <svg className="w-4 h-4 ml-auto" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                </button>
              ))}
            </div>
            
            <div className="border-t border-slate-200 dark:border-slate-700 p-2">
              <div className="text-xs text-slate-500 dark:text-slate-400 px-2">
                Langue détectée automatiquement
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
