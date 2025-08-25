'use client';

import React, { useMemo, useCallback, memo, useRef, useEffect, useState } from 'react';
import { useCache } from '@/hooks/useCache';

interface CachedComponentProps<T> {
  data: T;
  render: (data: T) => React.ReactNode;
  cacheKey: string;
  cacheTTL?: number;
  dependencies?: any[];
  className?: string;
  placeholder?: React.ReactNode;
  onCacheHit?: () => void;
  onCacheMiss?: () => void;
  enableMemo?: boolean;
  enableCallback?: boolean;
  enableRef?: boolean;
}

// Composant de base avec memo
const BaseCachedComponent = memo(<T,>({
  data,
  render,
  cacheKey,
  cacheTTL = 5 * 60 * 1000, // 5 minutes par défaut
  dependencies = [],
  className = '',
  placeholder,
  onCacheHit,
  onCacheMiss,
  enableMemo = true,
  enableCallback = true,
  enableRef = true,
}: CachedComponentProps<T>) => {
  const componentRef = useRef<HTMLDivElement>(null);
  const lastRenderTime = useRef<number>(Date.now());
  const renderCount = useRef<number>(0);

  // Hook de cache pour les données
  const { data: cachedData, invalidateCache, getCacheStats } = useCache(
    `${cacheKey}-component`,
    async () => data,
    { ttl: cacheTTL }
  );

  // Mémoisation des données si activée
  const memoizedData = useMemo(() => {
    if (enableMemo) {
      return data;
    }
    return data;
  }, [data, enableMemo, ...dependencies]);

  // Mémoisation de la fonction de rendu si activée
  const memoizedRender = useCallback((renderData: T) => {
    if (enableCallback) {
      return render(renderData);
    }
    return render(renderData);
  }, [render, enableCallback, ...dependencies]);

  // Effet pour tracker les performances
  useEffect(() => {
    const now = Date.now();
    const renderTime = now - lastRenderTime.current;
    renderCount.current += 1;

    // Log des performances en développement
    if (process.env.NODE_ENV === 'development') {
      console.log(`[CachedComponent] ${cacheKey}:`, {
        renderCount: renderCount.current,
        renderTime: `${renderTime}ms`,
        cacheHit: !!cachedData,
        dataSize: JSON.stringify(data).length,
      });
    }

    // Appeler les callbacks appropriés
    if (cachedData) {
      onCacheHit?.();
    } else {
      onCacheMiss?.();
    }

    lastRenderTime.current = now;
  }, [data, cachedData, cacheKey, onCacheHit, onCacheMiss]);

  // Fonction pour rafraîchir le cache
  const refreshCache = useCallback(() => {
    invalidateCache();
  }, [invalidateCache]);

  // Fonction pour obtenir les statistiques
  const getStats = useCallback(() => {
    const cacheStats = getCacheStats();
    return {
      ...cacheStats,
      renderCount: renderCount.current,
      lastRenderTime: lastRenderTime.current,
      componentRef: !!componentRef.current,
    };
  }, [getCacheStats]);

  // Fonction pour faire défiler vers le composant
  const scrollIntoView = useCallback(() => {
    if (componentRef.current) {
      componentRef.current.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center' 
      });
    }
  }, []);

  // Fonction pour mesurer les performances
  const measurePerformance = useCallback(() => {
    if (componentRef.current) {
      const startTime = performance.now();
      
      // Forcer un re-render
      invalidateCache();
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      console.log(`[Performance] ${cacheKey}: ${renderTime.toFixed(2)}ms`);
      return renderTime;
    }
    return 0;
  }, [cacheKey, invalidateCache]);

  // Vérifier si les données sont valides
  const isValidData = useMemo(() => {
    return data !== null && data !== undefined;
  }, [data]);

  // Rendu conditionnel
  if (!isValidData) {
    return placeholder ? (
      <div className={`cached-component-placeholder ${className}`}>
        {placeholder}
      </div>
    ) : (
      <div className={`cached-component-error ${className} text-red-500`}>
        Données invalides
      </div>
    );
  }

  return (
    <div 
      ref={componentRef}
      className={`cached-component ${className}`}
      data-cache-key={cacheKey}
      data-render-count={renderCount.current}
      data-cache-hit={!!cachedData}
    >
      {/* Indicateur de cache */}
      <div className="cached-component-indicator absolute top-2 right-2 z-10">
        <div className={`w-3 h-3 rounded-full ${
          cachedData ? 'bg-green-500' : 'bg-yellow-500'
        }`} />
      </div>

      {/* Contenu principal */}
      <div className="cached-component-content">
        {memoizedRender(memoizedData)}
      </div>

      {/* Contrôles de développement */}
      {process.env.NODE_ENV === 'development' && (
        <div className="cached-component-debug mt-2 p-2 bg-gray-100 dark:bg-gray-800 rounded text-xs">
          <div className="flex items-center justify-between">
            <span>Cache: {cachedData ? '✓' : '✗'}</span>
            <span>Renders: {renderCount.current}</span>
            <span>Key: {cacheKey}</span>
          </div>
          
          <div className="flex space-x-2 mt-1">
            <button
              onClick={refreshCache}
              className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
              title="Rafraîchir le cache"
            >
              🔄
            </button>
            <button
              onClick={scrollIntoView}
              className="px-2 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600"
              title="Faire défiler vers ce composant"
            >
              👁️
            </button>
            <button
              onClick={measurePerformance}
              className="px-2 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
              title="Mesurer les performances"
            >
              ⚡
            </button>
          </div>
          
          <details className="mt-2">
            <summary className="cursor-pointer font-medium">
              Statistiques détaillées
            </summary>
            <pre className="mt-1 text-gray-600 dark:text-gray-400">
              {JSON.stringify(getStats(), null, 2)}
            </pre>
          </details>
        </div>
      )}
    </div>
  );
});

// Wrapper avec displayName pour le débogage
BaseCachedComponent.displayName = 'CachedComponent';

// Export du composant optimisé
export const CachedComponent = React.forwardRef<HTMLDivElement, CachedComponentProps<any>>(
  (props, ref) => {
    return <BaseCachedComponent {...props} />;
  }
);

// Composant de cache pour les listes de composants
interface CachedComponentListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  cacheKeyPrefix: string;
  cacheTTL?: number;
  className?: string;
  enableVirtualization?: boolean;
  pageSize?: number;
}

export function CachedComponentList<T>({
  items,
  renderItem,
  cacheKeyPrefix,
  cacheTTL = 5 * 60 * 1000,
  className = '',
  enableVirtualization = false,
  pageSize = 20,
}: CachedComponentListProps<T>) {
  const [visibleItems, setVisibleItems] = useState(items.slice(0, pageSize));
  const [currentPage, setCurrentPage] = useState(1);

  // Fonction pour charger plus d'éléments
  const loadMore = useCallback(() => {
    const nextPage = currentPage + 1;
    const startIndex = (nextPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const newItems = items.slice(startIndex, endIndex);
    
    setVisibleItems(prev => [...prev, ...newItems]);
    setCurrentPage(nextPage);
  }, [currentPage, pageSize, items]);

  // Fonction pour réinitialiser la liste
  const resetList = useCallback(() => {
    setVisibleItems(items.slice(0, pageSize));
    setCurrentPage(1);
  }, [items, pageSize]);

  if (enableVirtualization) {
    return (
      <CachedList
        items={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${cacheKeyPrefix}-${index}`}
        pageSize={pageSize}
        cacheKey={`${cacheKeyPrefix}-list`}
        cacheTTL={cacheTTL}
        className={className}
        onLoadMore={loadMore}
        hasMore={visibleItems.length < items.length}
      />
    );
  }

  return (
    <div className={`cached-component-list ${className}`}>
      {visibleItems.map((item, index) => (
        <CachedComponent
          key={`${cacheKeyPrefix}-${index}`}
          data={item}
          render={(data) => renderItem(data, index)}
          cacheKey={`${cacheKeyPrefix}-${index}`}
          cacheTTL={cacheTTL}
        />
      ))}
      
      {visibleItems.length < items.length && (
        <div className="text-center py-4">
          <button
            onClick={loadMore}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            Charger plus ({items.length - visibleItems.length} restants)
          </button>
        </div>
      )}
      
      <div className="text-center py-2 text-sm text-gray-500">
        {visibleItems.length} / {items.length} éléments affichés
        <button
          onClick={resetList}
          className="ml-2 text-blue-600 hover:text-blue-800 underline"
        >
          Réinitialiser
        </button>
      </div>
    </div>
  );
}
