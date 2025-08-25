'use client';

import { useState, useEffect, useCallback } from 'react';
import { useCache } from '@/hooks/useCache';

interface CacheStats {
  localStorage: {
    size: number;
    keys: string[];
  };
  sessionStorage: {
    size: number;
    keys: string[];
  };
  memory: {
    used: number;
    total: number;
    percentage: number;
  };
  images: {
    cached: number;
    total: number;
  };
}

export function CacheManager() {
  const [isVisible, setIsVisible] = useState(false);
  const [stats, setStats] = useState<CacheStats>({
    localStorage: { size: 0, keys: [] },
    sessionStorage: { size: 0, keys: [] },
    memory: { used: 0, total: 0, percentage: 0 },
    images: { cached: 0, total: 0 },
  });

  // Hook de cache pour les statistiques
  const { data: cacheStats, refetch: refreshStats } = useCache(
    'cache-manager-stats',
    async () => {
      if (typeof window === 'undefined') return stats;

      // Statistiques localStorage
      const localStorageKeys = Object.keys(localStorage);
      const localStorageSize = localStorageKeys.reduce((acc, key) => {
        try {
          return acc + (localStorage.getItem(key)?.length || 0);
        } catch {
          return acc;
        }
      }, 0);

      // Statistiques sessionStorage
      const sessionStorageKeys = Object.keys(sessionStorage);
      const sessionStorageSize = sessionStorageKeys.reduce((acc, key) => {
        try {
          return acc + (sessionStorage.getItem(key)?.length || 0);
        } catch {
          return acc;
        }
      }, 0);

      // Statistiques mémoire
      let memoryUsed = 0;
      let memoryTotal = 0;
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        memoryUsed = memory.usedJSHeapSize;
        memoryTotal = memory.totalJSHeapSize;
      }

      // Statistiques images
      let imageCacheSize = 0;
      try {
        const imageCache = JSON.parse(localStorage.getItem('imageCache') || '{}');
        imageCacheSize = Object.keys(imageCache).length;
      } catch {
        imageCacheSize = 0;
      }

      return {
        localStorage: {
          size: localStorageSize,
          keys: localStorageKeys,
        },
        sessionStorage: {
          size: sessionStorageSize,
          keys: sessionStorageKeys,
        },
        memory: {
          used: memoryUsed,
          total: memoryTotal,
          percentage: memoryTotal > 0 ? (memoryUsed / memoryTotal) * 100 : 0,
        },
        images: {
          cached: imageCacheSize,
          total: imageCacheSize, // Pour l'instant, on compte seulement les images en cache
        },
      };
    },
    { ttl: 5000 } // Rafraîchir toutes les 5 secondes
  );

  // Mettre à jour les statistiques
  useEffect(() => {
    if (cacheStats) {
      setStats(cacheStats);
    }
  }, [cacheStats]);

  // Fonction pour vider tout le cache
  const clearAllCache = useCallback(() => {
    if (typeof window === 'undefined') return;

    // Vider localStorage
    localStorage.clear();
    
    // Vider sessionStorage
    sessionStorage.clear();
    
    // Vider le cache des images
    localStorage.removeItem('imageCache');
    
    // Rafraîchir les statistiques
    refreshStats();
  }, [refreshStats]);

  // Fonction pour vider le cache des images
  const clearImageCache = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    localStorage.removeItem('imageCache');
    refreshStats();
  }, [refreshStats]);

  // Fonction pour vider le cache des données
  const clearDataCache = useCallback(() => {
    if (typeof window === 'undefined') return;
    
    // Supprimer les clés de cache des données (sauf les préférences utilisateur)
    const keysToKeep = ['theme', 'preferred-locale', 'ageAccepted'];
    const keysToRemove = Object.keys(localStorage).filter(
      key => !keysToKeep.includes(key)
    );
    
    keysToRemove.forEach(key => localStorage.removeItem(key));
    refreshStats();
  }, [refreshStats]);

  // Fonction pour optimiser le cache
  const optimizeCache = useCallback(() => {
    if (typeof window === 'undefined') return;

    try {
      // Nettoyer le cache des images
      const imageCache = JSON.parse(localStorage.getItem('imageCache') || '{}');
      const now = Date.now();
      const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours
      
      const cleanedImageCache = Object.fromEntries(
        Object.entries(imageCache).filter(([_, data]: [string, any]) => 
          now - data.timestamp < maxAge
        )
      );
      
      localStorage.setItem('imageCache', JSON.stringify(cleanedImageCache));
      
      // Nettoyer les autres caches expirés
      const keysToCheck = Object.keys(localStorage).filter(
        key => key.includes('cache') || key.includes('data')
      );
      
      keysToCheck.forEach(key => {
        try {
          const data = JSON.parse(localStorage.getItem(key) || '{}');
          if (data.timestamp && (now - data.timestamp) > maxAge) {
            localStorage.removeItem(key);
          }
        } catch {
          // Ignorer les clés non-JSON
        }
      });
      
      refreshStats();
    } catch (error) {
      console.warn('Failed to optimize cache:', error);
    }
  }, [refreshStats]);

  // Formatage des tailles
  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 right-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg z-50 transition-all duration-200 hover:scale-110"
        title="Gestionnaire de cache"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Gestionnaire de Cache
            </h2>
            <button
              onClick={() => setIsVisible(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Statistiques */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                Local Storage
              </h3>
              <p className="text-blue-700 dark:text-blue-300">
                {formatBytes(stats.localStorage.size)}
              </p>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                {stats.localStorage.keys.length} clés
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                Images en Cache
              </h3>
              <p className="text-green-700 dark:text-green-300">
                {stats.images.cached}
              </p>
              <p className="text-sm text-green-600 dark:text-green-400">
                images stockées
              </p>
            </div>

            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-2">
                Mémoire JavaScript
              </h3>
              <p className="text-purple-700 dark:text-purple-300">
                {formatBytes(stats.memory.used)}
              </p>
              <p className="text-sm text-purple-600 dark:text-purple-400">
                {stats.memory.percentage.toFixed(1)}% utilisée
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg">
              <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-2">
                Session Storage
              </h3>
              <p className="text-orange-700 dark:text-orange-300">
                {formatBytes(stats.sessionStorage.size)}
              </p>
              <p className="text-sm text-orange-600 dark:text-orange-400">
                {stats.sessionStorage.keys.length} clés
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={optimizeCache}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              🔧 Optimiser le Cache
            </button>
            
            <button
              onClick={clearImageCache}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              🖼️ Vider le Cache des Images
            </button>
            
            <button
              onClick={clearDataCache}
              className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              📊 Vider le Cache des Données
            </button>
            
            <button
              onClick={clearAllCache}
              className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg transition-colors"
            >
              🗑️ Vider Tout le Cache
            </button>
          </div>

          {/* Rafraîchir */}
          <div className="mt-6 text-center">
            <button
              onClick={refreshStats}
              className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
            >
              🔄 Rafraîchir les statistiques
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
