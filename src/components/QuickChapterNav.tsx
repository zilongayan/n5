'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';

interface Chapter {
  id: string;
  number: string;
  title: string;
  language: string;
  pages?: number;
  readableAt?: string;
}

interface QuickChapterNavProps {
  mangaId: string;
  chapters: Chapter[];
  currentChapterId?: string;
  locale: string;
  className?: string;
}

export function QuickChapterNav({ 
  mangaId, 
  chapters, 
  currentChapterId, 
  locale, 
  className = '' 
}: QuickChapterNavProps) {
  const { t } = useTranslations();
  const [isExpanded, setIsExpanded] = useState(false);

  if (chapters.length === 0) return null;

  const currentIndex = chapters.findIndex(c => c.id === currentChapterId);
  const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
  const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;

  const getChapterDisplayName = (chapter: Chapter) => {
    const title = chapter.title ? ` - ${chapter.title}` : '';
    return `Ch. ${chapter.number}${title}`;
  };

  const getLanguageColor = (language: string) => {
    const colors: Record<string, string> = {
      'en': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
      'fr': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      'es': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
      'de': 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
      'it': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      'pt': 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
      'ru': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
      'ja': 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200',
      'ko': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
      'zh': 'bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200'
    };
    return colors[language.toLowerCase()] || colors['en'];
  };

  return (
    <div className={`bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-200 dark:border-gray-700 rounded-lg p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Navigation rapide
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
        >
          {isExpanded ? 'Réduire' : 'Développer'}
        </button>
      </div>

      {/* Current Chapter Info */}
      {currentChapterId && currentIndex >= 0 && (
        <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-sm text-blue-600 dark:text-blue-400">Chapitre actuel:</span>
              <div className="font-medium text-blue-800 dark:text-blue-200">
                {getChapterDisplayName(chapters[currentIndex])}
              </div>
            </div>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(chapters[currentIndex].language)}`}>
              {chapters[currentIndex].language.toUpperCase()}
            </span>
          </div>
        </div>
      )}

      {/* Quick Navigation */}
      <div className="flex items-center justify-between mb-4">
        {prevChapter ? (
          <Link
            href={`/${locale}/reader/${mangaId}/${prevChapter.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            ← Précédent
          </Link>
        ) : (
          <div className="px-4 py-2 text-gray-400 dark:text-gray-500">
            ← Précédent
          </div>
        )}

        <span className="text-sm text-gray-500 dark:text-gray-400">
          {currentIndex + 1} / {chapters.length}
        </span>

        {nextChapter ? (
          <Link
            href={`/${locale}/reader/${mangaId}/${nextChapter.id}`}
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
          >
            Suivant →
          </Link>
        ) : (
          <div className="px-4 py-2 text-gray-400 dark:text-gray-500">
            Suivant →
          </div>
        )}
      </div>

      {/* Chapter List (when expanded) */}
      {isExpanded && (
        <div className="space-y-2 max-h-64 overflow-y-auto">
          {chapters.map((chapter, index) => (
            <Link
              key={chapter.id}
              href={`/${locale}/reader/${mangaId}/${chapter.id}`}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                chapter.id === currentChapterId
                  ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-300 dark:border-blue-700'
                  : 'bg-gray-50 dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-700/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  chapter.id === currentChapterId
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                }`}>
                  {index + 1}
                </span>
                <div>
                  <div className="font-medium text-gray-900 dark:text-white">
                    {getChapterDisplayName(chapter)}
                  </div>
                  {chapter.pages && (
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {chapter.pages} pages
                    </div>
                  )}
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLanguageColor(chapter.language)}`}>
                {chapter.language.toUpperCase()}
              </span>
            </Link>
          ))}
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
        <Link
          href={`/${locale}/reader/${mangaId}/${chapters[0].id}`}
          className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          📖 Premier
        </Link>
        <Link
          href={`/${locale}/reader/${mangaId}/${chapters[chapters.length - 1].id}`}
          className="px-3 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
        >
          📚 Dernier
        </Link>
        {chapters.length > 2 && (
          <Link
            href={`/${locale}/reader/${mangaId}/${chapters[Math.floor(chapters.length / 2)].id}`}
            className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
          >
            🎯 Milieu
          </Link>
        )}
      </div>
    </div>
  );
}
