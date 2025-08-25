import { useState, useEffect, useCallback, useRef } from 'react';

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

interface CacheOptions {
  ttl?: number; // Time to live en millisecondes
  maxSize?: number; // Taille maximale du cache
  cleanupInterval?: number; // Intervalle de nettoyage en millisecondes
}

export function useCache<T>(
  key: string,
  fetcher: () => Promise<T>,
  options: CacheOptions = {}
) {
  const {
    ttl = 5 * 60 * 1000, // 5 minutes par défaut
    maxSize = 100, // 100 entrées max
    cleanupInterval = 60 * 1000, // Nettoyage toutes les minutes
  } = options;

  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const cacheRef = useRef<Map<string, CacheEntry<T>>>(new Map());
  const cleanupIntervalRef = useRef<NodeJS.Timeout>();

  // Fonction de nettoyage du cache
  const cleanupCache = useCallback(() => {
    const now = Date.now();
    const entries = Array.from(cacheRef.current.entries());
    
    // Supprimer les entrées expirées
    const validEntries = entries.filter(([_, entry]) => 
      now - entry.timestamp < entry.ttl
    );
    
    // Limiter la taille du cache
    if (validEntries.length > maxSize) {
      const sortedEntries = validEntries.sort((a, b) => 
        a[1].timestamp - b[1].timestamp
      );
      validEntries.splice(0, validEntries.length - maxSize);
    }
    
    // Recréer le cache avec les entrées valides
    cacheRef.current.clear();
    validEntries.forEach(([key, entry]) => {
      cacheRef.current.set(key, entry);
    });
  }, [maxSize]);

  // Initialiser le nettoyage automatique
  useEffect(() => {
    cleanupIntervalRef.current = setInterval(cleanupCache, cleanupInterval);
    
    return () => {
      if (cleanupIntervalRef.current) {
        clearInterval(cleanupIntervalRef.current);
      }
    };
  }, [cleanupCache, cleanupInterval]);

  // Fonction pour récupérer les données
  const fetchData = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
    const cached = cacheRef.current.get(key);
    
    // Vérifier si le cache est valide
    if (!forceRefresh && cached && (now - cached.timestamp) < cached.ttl) {
      setData(cached.data);
      setError(null);
      return cached.data;
    }
    
    setLoading(true);
    setError(null);
    
    try {
      const result = await fetcher();
      
      // Mettre en cache
      cacheRef.current.set(key, {
        data: result,
        timestamp: now,
        ttl,
      });
      
      setData(result);
      return result;
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Unknown error');
      setError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  }, [key, fetcher, ttl]);

  // Fonction pour invalider le cache
  const invalidateCache = useCallback(() => {
    cacheRef.current.delete(key);
    setData(null);
  }, [key]);

  // Fonction pour vider tout le cache
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
    setData(null);
  }, []);

  // Fonction pour obtenir les statistiques du cache
  const getCacheStats = useCallback(() => {
    const now = Date.now();
    const entries = Array.from(cacheRef.current.entries());
    
    const stats = {
      totalEntries: entries.length,
      validEntries: entries.filter(([_, entry]) => 
        (now - entry.timestamp) < entry.ttl
      ).length,
      expiredEntries: entries.filter(([_, entry]) => 
        (now - entry.timestamp) >= entry.ttl
      ).length,
      memoryUsage: entries.reduce((acc, [_, entry]) => 
        acc + JSON.stringify(entry.data).length, 0
      ),
    };
    
    return stats;
  }, []);

  // Charger les données au montage si pas en cache
  useEffect(() => {
    if (!data && !loading) {
      fetchData();
    }
  }, [data, loading, fetchData]);

  return {
    data,
    loading,
    error,
    fetchData,
    invalidateCache,
    clearCache,
    getCacheStats,
    refetch: () => fetchData(true),
  };
}

// Hook spécialisé pour les images
export function useImageCache(imageUrl: string, options: CacheOptions = {}) {
  const [isCached, setIsCached] = useState(false);
  const [cacheSize, setCacheSize] = useState(0);
  
  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    // Vérifier si l'image est en cache du navigateur
    const checkImageCache = async () => {
      try {
        const img = new Image();
        img.src = imageUrl;
        
        // Si l'image se charge rapidement, elle est probablement en cache
        const startTime = performance.now();
        await new Promise((resolve, reject) => {
          img.onload = resolve;
          img.onerror = reject;
          setTimeout(reject, 100); // Timeout de 100ms
        });
        
        const loadTime = performance.now() - startTime;
        setIsCached(loadTime < 50); // Moins de 50ms = probablement en cache
      } catch {
        setIsCached(false);
      }
    };
    
    checkImageCache();
    
    // Vérifier la taille du cache des images
    try {
      const imageCache = JSON.parse(localStorage.getItem('imageCache') || '{}');
      setCacheSize(Object.keys(imageCache).length);
    } catch {
      setCacheSize(0);
    }
  }, [imageUrl]);
  
  return { isCached, cacheSize };
}

// Hook pour le cache des composants
export function useComponentCache<T>(
  key: string,
  component: T,
  ttl: number = 10 * 60 * 1000 // 10 minutes par défaut
) {
  const [cachedComponent, setCachedComponent] = useState<T | null>(null);
  const cacheRef = useRef<Map<string, { component: T; timestamp: number }>>(new Map());
  
  useEffect(() => {
    const now = Date.now();
    const cached = cacheRef.current.get(key);
    
    if (cached && (now - cached.timestamp) < ttl) {
      setCachedComponent(cached.component);
    } else {
      // Mettre en cache le nouveau composant
      cacheRef.current.set(key, { component, timestamp: now });
      setCachedComponent(component);
    }
  }, [key, component, ttl]);
  
  return cachedComponent;
}
