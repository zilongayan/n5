'use client';

interface LanguagePillProps {
  language: string;
  className?: string;
}

export function LanguagePill({ language, className = '' }: LanguagePillProps) {
  const getLanguageInfo = (lang: string) => {
    const langMap: Record<string, { name: string; flag: string; color: string }> = {
      'en': { name: 'English', flag: '🇺🇸', color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' },
      'fr': { name: 'Français', flag: '🇫🇷', color: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' },
      'es': { name: 'Español', flag: '🇪🇸', color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' },
      'de': { name: 'Deutsch', flag: '🇩🇪', color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' },
      'it': { name: 'Italiano', flag: '🇮🇹', color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' },
      'pt': { name: 'Português', flag: '🇵🇹', color: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200' },
      'ru': { name: 'Русский', flag: '🇷🇺', color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' },
      'ja': { name: '日本語', flag: '🇯🇵', color: 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200' },
      'ko': { name: '한국어', flag: '🇰🇷', color: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200' },
      'zh': { name: '中文', flag: '🇨🇳', color: 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200' },
    };

    return langMap[lang.toLowerCase()] || { 
      name: lang.toUpperCase(), 
      flag: '🌐', 
      color: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200' 
    };
  };

  const { name, flag, color } = getLanguageInfo(language);

  return (
    <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${color} ${className}`}>
      <span className="text-sm">{flag}</span>
      <span>{name}</span>
    </span>
  );
}
