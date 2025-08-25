'use client';

import Link from 'next/link';
import {FavoriteButton, FavoriteButtonCompact} from '@/components/FavoriteButton';
import {DownloadButton} from '@/components/DownloadButton';
import {ShareButton} from '@/components/ShareButton';
import {Comments} from '@/components/Comments';
import {useTranslations} from '@/hooks/useTranslations';
import {CatalogItem} from '@/data/catalog';
import { ChapterList } from '@/components/ChapterList';
import {getTagId} from '@/lib/tagMapping';
import {LanguagePill} from './LanguagePill';
import {PreviewDemo} from './PreviewDemo';

interface Chapter {
  id: string;
  number: string;
  title: string;
  language: string;
  pages?: number;
  readableAt?: string;
}

interface GalleryContentProps {
  item: CatalogItem;
  related: CatalogItem[];
  chapters?: Chapter[];
  preview?: string[]; // page image URLs
}

export function GalleryContent({item, related, chapters = [], preview = []}: GalleryContentProps) {
  const {t, locale} = useTranslations();

  const firstChapterId = chapters[0]?.id;
  const readHref = firstChapterId ? `/${locale}/reader/${item.id}/${firstChapterId}` : undefined;

  const languages = Array.from(new Set(chapters.map(c => c.language.toUpperCase())));

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Gallery Header */}
      <div className="theme-card p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cover Image */}
          <div className="lg:col-span-1">
            <div className="relative group">
              <img
                src={item.cover}
                alt={item.title}
                className="w-full aspect-[3/4] object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-all duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FavoriteButton 
                  itemId={item.id} 
                  className="w-full bg-white/90 hover:bg-white text-gray-800 shadow-lg"
                />
              </div>
            </div>
          </div>

          {/* Gallery Info */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-primary mb-2">{item.title}</h1>
              {item.description && (
                <p className="text-secondary leading-relaxed whitespace-pre-line line-clamp-5">
                  {item.description}
                </p>
              )}
            </div>

            {/* Meta */}
            <div className="flex flex-wrap gap-3 text-sm text-muted">
              <span className="px-2 py-1 rounded bg-surface-elevated">{chapters.length} chapitres</span>
              {languages.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  <span className="text-muted">Langues:</span>
                  {languages.map((lang) => (
                    <LanguagePill key={lang} language={lang} />
                  ))}
                </div>
              )}
            </div>

            {/* Tags */}
            <div>
              <h3 className="text-lg font-semibold text-primary mb-3">{t('gallery.tags')}</h3>
              <div className="flex flex-wrap gap-2">
                {item.tags && item.tags.map((tag: string) => {
                  const tagId = getTagId(tag);
                  const searchUrl = tagId 
                    ? `/${locale}/search?tags=${tagId}` 
                    : `/${locale}/search?q=${encodeURIComponent(tag)}`;
                  
                  return (
                    <Link
                      key={tag}
                      href={searchUrl}
                      className="tag-primary px-3 py-1 rounded-full transition-all duration-300 text-sm"
                    >
                      #{tag}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4">
              {readHref ? (
                <Link href={readHref} className="theme-button-primary px-6 py-3 rounded-xl">
                  📖 {t('gallery.readNow')}
                </Link>
              ) : (
                <button disabled className="theme-button-primary px-6 py-3 rounded-xl opacity-60 cursor-not-allowed">
                  📖 {t('gallery.readNow')}
                </button>
              )}
              <FavoriteButton 
                itemId={item.id} 
                className="theme-button-secondary"
              />
              <DownloadButton 
                itemId={item.id}
                title={item.title}
                className="theme-button-secondary"
              />
              <ShareButton 
                itemId={item.id}
                title={item.title}
                className="theme-button-secondary"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Chapters Menu */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Chapitres</h2>
          {readHref && (
            <Link href={readHref} className="text-blue-600 dark:text-blue-400 hover:underline">
              Lire le plus récent →
            </Link>
          )}
        </div>
        <ChapterList mangaId={item.id} chapters={chapters} locale={locale} />
      </div>

      {/* Gallery Preview */}
      <PreviewDemo 
        mangaId={item.id}
        chapters={chapters}
        locale={locale}
      />

      {/* Related Galleries */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('gallery.related')}</h2>
          <Link 
            href={`/${locale}/popular`} 
            className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
          >
            {t('gallery.viewAll')} →
          </Link>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {related.map((relatedItem, index) => (
            <Link
              key={relatedItem.id}
              href={`/${locale}/gallery/${relatedItem.id}`}
              className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{animationDelay: `${index * 100}ms`}}
            >
              <div className="relative">
                <img
                  src={relatedItem.cover}
                  alt={relatedItem.title}
                  className="aspect-[3/4] object-cover w-full group-hover:brightness-110 transition-all duration-300"
                />
                <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                  {Math.floor(Math.random() * 100)}%
                </div>
                <div className="absolute top-2 left-2">
                  <FavoriteButtonCompact itemId={relatedItem.id} />
                </div>
              </div>
              <div className="p-3">
                <div className="text-sm text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {relatedItem.title}
                </div>
                <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                  {relatedItem.tags && relatedItem.tags.slice(0, 2).join(', ')}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
        <Comments itemId={item.id} />
      </div>
    </main>
  );
}
