'use client';

import { useState } from 'react';
import { ChapterPreview } from './ChapterPreview';
import { QuickChapterNav } from './QuickChapterNav';

interface Chapter {
  id: string;
  number: string;
  title: string;
  language: string;
  pages?: number;
  readableAt?: string;
}

interface PreviewDemoProps {
  mangaId: string;
  chapters: Chapter[];
  locale: string;
  className?: string;
}

export function PreviewDemo({ mangaId, chapters, locale, className = '' }: PreviewDemoProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'navigation'>('preview');

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
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🎌 Lecteur de Manga Interactif
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Découvrez et naviguez entre les chapitres avec facilité
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
          <button
            onClick={() => setActiveTab('preview')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'preview'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            📖 Preview des Chapitres
          </button>
          <button
            onClick={() => setActiveTab('navigation')}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeTab === 'navigation'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            🧭 Navigation Rapide
          </button>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'preview' ? (
        <ChapterPreview 
          mangaId={mangaId}
          chapters={chapters}
          locale={locale}
        />
      ) : (
        <QuickChapterNav 
          mangaId={mangaId}
          chapters={chapters}
          locale={locale}
        />
      )}

      {/* Feature Highlights */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <div className="text-2xl mb-2">🎯</div>
          <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
            Sélection Dynamique
          </h4>
          <p className="text-sm text-blue-600 dark:text-blue-400">
            Changez de chapitre et voyez le preview se mettre à jour instantanément
          </p>
        </div>
        
        <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
          <div className="text-2xl mb-2">🚀</div>
          <h4 className="font-semibold text-purple-800 dark:text-purple-200 mb-1">
            Navigation Rapide
          </h4>
          <p className="text-sm text-purple-600 dark:text-purple-400">
            Accédez directement au premier, dernier ou chapitre du milieu
          </p>
        </div>
        
        <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
          <div className="text-2xl mb-2">💾</div>
          <h4 className="font-semibold text-green-800 dark:text-green-200 mb-1">
            Cache Intelligent
          </h4>
          <p className="text-sm text-green-600 dark:text-green-400">
            Les images se chargent rapidement grâce au système de cache optimisé
          </p>
        </div>
      </div>

      {/* Usage Instructions */}
      <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          💡 Comment utiliser le preview interactif :
        </h4>
        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
          <li className="flex items-start gap-2">
            <span className="text-blue-500">1.</span>
            <span>Cliquez sur un chapitre dans la liste pour voir son preview</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">2.</span>
            <span>Cliquez sur une image de preview pour ouvrir le lecteur</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">3.</span>
            <span>Utilisez les boutons de navigation pour changer de chapitre</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500">4.</span>
            <span>Accédez rapidement au premier, dernier ou chapitre du milieu</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
