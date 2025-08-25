'use client';

import {useState, useEffect} from 'react';
import Link from 'next/link';
import {useTranslations} from '@/hooks/useTranslations';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({isOpen, onClose}: SearchModalProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const {locale} = useTranslations();

  // Simuler des résultats de recherche
  const mockSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) return [];
    
    setIsLoading(true);
    
    // Simulation d'une recherche avec délai
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const mockResults = [
      { id: '1', title: 'Galerie Premium Collection', type: 'gallery', tags: ['art', 'premium'] },
      { id: '2', title: 'Artiste Moderne', type: 'artist', tags: ['moderne', 'style'] },
      { id: '3', title: 'Collection Vintage', type: 'gallery', tags: ['vintage', 'classique'] },
      { id: '4', title: 'Série Exclusive', type: 'series', tags: ['exclusif', 'série'] },
      { id: '5', title: 'Art Contemporain', type: 'gallery', tags: ['contemporain', 'nouveau'] }
    ].filter(item => 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    
    setIsLoading(false);
    return mockResults;
  };

  useEffect(() => {
    if (query.trim()) {
      mockSearch(query).then(setResults);
    } else {
      setResults([]);
    }
  }, [query]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'gallery': return '🖼️';
      case 'artist': return '👨‍🎨';
      case 'series': return '📚';
      default: return '🔍';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'gallery': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'artist': return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300';
      case 'series': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      default: return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
      <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Rechercher des galeries, artistes, collections..."
                className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              {isLoading && (
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="p-6 max-h-96 overflow-y-auto">
          {query.trim() === '' ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Commencez à taper pour rechercher
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Trouvez rapidement vos galeries, artistes et collections préférés
              </p>
            </div>
          ) : results.length === 0 && !isLoading ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-4">😕</div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                Aucun résultat trouvé
              </h3>
              <p className="text-slate-500 dark:text-slate-400">
                Essayez avec d'autres mots-clés
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              {results.map((item) => (
                                  <Link
                    key={item.id}
                    href={`/${locale}/${item.type === 'gallery' ? 'gallery' : item.type}/${item.id}`}
                    onClick={onClose}
                    className="flex items-center space-x-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition-colors group"
                  >
                  <div className="text-2xl">{getTypeIcon(item.type)}</div>
                  <div className="flex-1">
                    <h4 className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(item.type)}`}>
                        {item.type === 'gallery' ? 'Galerie' : item.type === 'artist' ? 'Artiste' : 'Série'}
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="text-xs text-slate-500 dark:text-slate-400">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-blue-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-700/50 border-t border-slate-200 dark:border-slate-600">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Appuyez sur Échap pour fermer</span>
            <span>Entrez pour sélectionner</span>
          </div>
        </div>
      </div>
    </div>
  );
}
