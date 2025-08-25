'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from '@/hooks/useTranslations';
import { getChapterPageUrls } from '@/data/catalog';

interface Chapter {
  id: string;
  number: string;
  title: string;
  language: string;
  pages?: number;
  readableAt?: string;
}

interface ChapterPreviewProps {
  mangaId: string;
  chapters: Chapter[];
  locale: string;
  className?: string;
}

export function ChapterPreview({ mangaId, chapters, locale, className = '' }: ChapterPreviewProps) {
  const { t } = useTranslations();
  const [selectedChapter, setSelectedChapter] = useState<Chapter | null>(null);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Set first chapter as default
  useEffect(() => {
    if (chapters.length > 0 && !selectedChapter) {
      setSelectedChapter(chapters[0]);
    }
  }, [chapters, selectedChapter]);

  // Load preview images when chapter changes
  useEffect(() => {
    if (!selectedChapter) return;

    const loadPreview = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const images = await getChapterPageUrls(selectedChapter.id);
        
        // Check if we got placeholder URLs (error fallback)
        if (images.length > 0 && images[0].startsWith('placeholder://')) {
          setError("Ce chapitre n'est pas encore disponible en preview");
          setPreviewImages([]);
        } else {
          // Take first 6 pages for preview
          setPreviewImages(images.slice(0, 6));
        }
      } catch (err) {
        console.error('Failed to load chapter preview:', err);
        setError("Impossible de charger le preview de ce chapitre. Veuillez réessayer.");
        setPreviewImages([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadPreview();
  }, [mangaId, selectedChapter]);

  const handleChapterSelect = (chapter: Chapter) => {
    setSelectedChapter(chapter);
  };

  const getChapterDisplayName = (chapter: Chapter) => {
    const title = chapter.title ? ` - ${chapter.title}` : '';
    return `Ch. ${chapter.number}${title} (${chapter.language.toUpperCase()})`;
  };

  if (chapters.length === 0) {
    return (
      <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-8 ${className}`}>
        <div className="text-center text-gray-500 dark:text-gray-400">
          <div className="text-4xl mb-4">📚</div>
          <h3 className="text-lg font-semibold mb-2">Aucun chapitre disponible</h3>
          <p>Ce manga n&apos;a pas encore de chapitres publiés.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-8 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('gallery.preview')}</h2>
        {selectedChapter && (
          <Link
            href={`/${locale}/reader/${mangaId}/${selectedChapter.id}`}
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
          >
            Lire le chapitre complet →
          </Link>
        )}
      </div>

      {/* Chapter Selection */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-3">
          Choisir un chapitre pour le preview
        </h3>
        <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
          {chapters.map((chapter) => (
            <button
              key={chapter.id}
              onClick={() => handleChapterSelect(chapter)}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                selectedChapter?.id === chapter.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {getChapterDisplayName(chapter)}
            </button>
          ))}
        </div>
      </div>

      {/* Preview Content */}
      {selectedChapter && (
        <div className="space-y-4">
          {/* Chapter Info */}
          <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {getChapterDisplayName(selectedChapter)}
                </h4>
                {selectedChapter.pages && (
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {selectedChapter.pages} pages
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/${locale}/reader/${mangaId}/${selectedChapter.id}`}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  📖 Lire
                </Link>
                {chapters.length > 1 && (
                  <button
                    onClick={() => {
                      const currentIndex = chapters.findIndex(c => c.id === selectedChapter.id);
                      const nextChapter = chapters[currentIndex + 1] || chapters[0];
                      setSelectedChapter(nextChapter);
                    }}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    ⏭️ Suivant
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Preview Images */}
          {isLoading ? (
            <div className="space-y-4">
              <div className="text-center text-gray-500 dark:text-gray-400">
                <div className="text-2xl mb-2">⏳</div>
                <p>Chargement du preview...</p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="aspect-[3/4] bg-gray-200 dark:bg-gray-600 rounded-lg animate-pulse" />
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">📚</div>
              <p className="mb-4">{error}</p>
              <div className="space-y-3">
                <button
                  onClick={() => selectedChapter && handleChapterSelect(selectedChapter)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Réessayer
                </button>
                <div className="text-sm opacity-75">
                  Ou cliquez sur un autre chapitre ci-dessus
                </div>
              </div>
            </div>
          ) : previewImages.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {previewImages.map((src, i) => (
                <div
                  key={i}
                  className="group aspect-[3/4] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105 cursor-pointer relative"
                  onClick={() => {
                    window.location.href = `/${locale}/reader/${mangaId}/${selectedChapter.id}`;
                  }}
                >
                  <img 
                    src={src} 
                    alt={`Page ${i + 1}`} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  
                  {/* Overlay with page info */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-2 left-2 right-2 text-white">
                      <div className="text-sm font-medium">Page {i + 1}</div>
                      <div className="text-xs opacity-80">Cliquer pour lire</div>
                    </div>
                  </div>
                  
                  {/* Page number badge */}
                  <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-full">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <div className="text-4xl mb-2">📄</div>
              <p>Aucune page disponible pour ce chapitre</p>
            </div>
          )}
        </div>
      )}

      {/* Quick Actions */}
      {chapters.length > 0 && (
        <div className="mt-6 flex flex-wrap gap-3 justify-center">
          <Link
            href={`/${locale}/reader/${mangaId}/${chapters[0].id}`}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            📖 Premier chapitre
          </Link>
          <Link
            href={`/${locale}/reader/${mangaId}/${chapters[chapters.length - 1].id}`}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            📚 Dernier chapitre
          </Link>
          {chapters.length > 2 && (
            <Link
              href={`/${locale}/reader/${mangaId}/${chapters[Math.floor(chapters.length / 2)].id}`}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
            >
              🎯 Chapitre du milieu
            </Link>
          )}
        </div>
      )}
    </div>
  );
}
