'use client';

import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { useCache } from '@/hooks/useCache';

interface CachedListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  keyExtractor: (item: T, index: number) => string;
  pageSize?: number;
  cacheKey?: string;
  cacheTTL?: number;
  className?: string;
  itemHeight?: number;
  overscan?: number;
  placeholder?: React.ReactNode;
  onLoadMore?: () => void;
  hasMore?: boolean;
}

export function CachedList<T>({
  items,
  renderItem,
  keyExtractor,
  pageSize = 20,
  cacheKey = 'default-list',
  cacheTTL = 10 * 60 * 1000, // 10 minutes
  className = '',
  itemHeight = 60,
  overscan = 5,
  placeholder,
  onLoadMore,
  hasMore = false,
}: CachedListProps<T>) {
  const [visibleRange, setVisibleRange] = useState({ start: 0, end: pageSize });
  const [scrollTop, setScrollTop] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Hook de cache pour les données
  const { data: cachedItems, invalidateCache } = useCache(
    `${cacheKey}-items`,
    async () => items,
    { ttl: cacheTTL }
  );

  // Calculer la hauteur totale de la liste
  const totalHeight = useMemo(() => {
    return items.length * itemHeight;
  }, [items.length, itemHeight]);

  // Calculer les éléments visibles
  const visibleItems = useMemo(() => {
    const start = Math.max(0, visibleRange.start - overscan);
    const end = Math.min(items.length, visibleRange.end + overscan);
    
    return items.slice(start, end).map((item, index) => ({
      item,
      originalIndex: start + index,
    }));
  }, [items, visibleRange, overscan]);

  // Gérer le scroll
  const handleScroll = useCallback((event: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop: newScrollTop } = event.currentTarget;
    setScrollTop(newScrollTop);
    
    // Calculer la nouvelle plage visible
    const start = Math.floor(newScrollTop / itemHeight);
    const end = Math.min(start + pageSize, items.length);
    
    setVisibleRange({ start, end });
    
    // Charger plus d'éléments si nécessaire
    if (hasMore && onLoadMore && end >= items.length - overscan) {
      setIsLoading(true);
      onLoadMore();
      setIsLoading(false);
    }
  }, [itemHeight, pageSize, items.length, overscan, hasMore, onLoadMore]);

  // Fonction pour faire défiler vers un élément
  const scrollToItem = useCallback((index: number) => {
    if (containerRef.current) {
      const scrollTop = index * itemHeight;
      containerRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }, [itemHeight]);

  // Fonction pour faire défiler vers le haut
  const scrollToTop = useCallback(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Fonction pour faire défiler vers le bas
  const scrollToBottom = useCallback(() => {
    if (containerRef.current) {
      const scrollTop = totalHeight - containerRef.current.clientHeight;
      containerRef.current.scrollTo({ top: scrollTop, behavior: 'smooth' });
    }
  }, [totalHeight]);

  // Fonction pour rafraîchir le cache
  const refreshCache = useCallback(() => {
    invalidateCache();
  }, [invalidateCache]);

  // Fonction pour obtenir les statistiques de performance
  const getPerformanceStats = useCallback(() => {
    const visibleCount = visibleItems.length;
    const totalCount = items.length;
    const cacheHitRate = cachedItems ? 1 : 0;
    
    return {
      visibleCount,
      totalCount,
      cacheHitRate,
      scrollPosition: Math.round((scrollTop / totalHeight) * 100),
      memoryUsage: visibleCount * itemHeight,
    };
  }, [visibleItems.length, items.length, cachedItems, scrollTop, totalHeight, itemHeight]);

  // Effet pour mettre à jour la plage visible au montage
  useEffect(() => {
    setVisibleRange({ start: 0, end: pageSize });
  }, [pageSize]);

  // Effet pour nettoyer le cache périodiquement
  useEffect(() => {
    const interval = setInterval(() => {
      // Nettoyer le cache toutes les 5 minutes
      if (Date.now() % (5 * 60 * 1000) === 0) {
        invalidateCache();
      }
    }, 60 * 1000);

    return () => clearInterval(interval);
  }, [invalidateCache]);

  if (items.length === 0) {
    return placeholder ? (
      <div className={`text-center py-8 ${className}`}>
        {placeholder}
      </div>
    ) : (
      <div className={`text-center py-8 text-gray-500 ${className}`}>
        Aucun élément à afficher
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      {/* Contrôles de navigation */}
      <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 dark:bg-gray-800 rounded-lg">
        <div className="flex space-x-2">
          <button
            onClick={scrollToTop}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            title="Aller en haut"
          >
            ↑ Haut
          </button>
          <button
            onClick={scrollToBottom}
            className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
            title="Aller en bas"
          >
            ↓ Bas
          </button>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400">
          <span>
            {visibleItems.length} / {items.length} éléments visibles
          </span>
          <span>
            Cache: {cachedItems ? '✓' : '✗'}
          </span>
          <button
            onClick={refreshCache}
            className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 rounded hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
            title="Rafraîchir le cache"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Barre de progression */}
      <div className="mb-2">
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <div
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{
              width: `${Math.round((scrollTop / totalHeight) * 100)}%`,
            }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1 text-center">
          {Math.round((scrollTop / totalHeight) * 100)}% de la liste
        </div>
      </div>

      {/* Liste virtuelle */}
      <div
        ref={containerRef}
        className="overflow-auto border border-gray-200 dark:border-gray-700 rounded-lg"
        style={{ height: `${pageSize * itemHeight}px` }}
        onScroll={handleScroll}
      >
        <div style={{ height: `${totalHeight}px`, position: 'relative' }}>
          {visibleItems.map(({ item, originalIndex }) => (
            <div
              key={keyExtractor(item, originalIndex)}
              style={{
                position: 'absolute',
                top: `${originalIndex * itemHeight}px`,
                height: `${itemHeight}px`,
                width: '100%',
              }}
              className="border-b border-gray-100 dark:border-gray-800 last:border-b-0"
            >
              {renderItem(item, originalIndex)}
            </div>
          ))}
        </div>
      </div>

      {/* Indicateur de chargement */}
      {isLoading && (
        <div className="text-center py-4">
          <div className="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">
            Chargement...
          </span>
        </div>
      )}

      {/* Statistiques de performance (développement uniquement) */}
      {process.env.NODE_ENV === 'development' && (
        <details className="mt-4 p-2 bg-gray-50 dark:bg-gray-800 rounded text-xs">
          <summary className="cursor-pointer font-medium">
            Statistiques de performance
          </summary>
          <pre className="mt-2 text-gray-600 dark:text-gray-400">
            {JSON.stringify(getPerformanceStats(), null, 2)}
          </pre>
        </details>
      )}
    </div>
  );
}
