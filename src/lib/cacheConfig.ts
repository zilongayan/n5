// Configuration globale du cache
export const CACHE_CONFIG = {
  // Cache des images
  images: {
    ttl: 24 * 60 * 60 * 1000, // 24 heures
    maxSize: 100, // 100 images max
    cleanupInterval: 60 * 60 * 1000, // Nettoyage toutes les heures
    formats: ['webp', 'avif', 'jpg', 'png'],
    quality: 75,
    placeholder: '/placeholder-image.jpg',
  },

  // Cache des données
  data: {
    ttl: 5 * 60 * 1000, // 5 minutes
    maxSize: 200, // 200 entrées max
    cleanupInterval: 5 * 60 * 1000, // Nettoyage toutes les 5 minutes
  },

  // Cache des composants
  components: {
    ttl: 10 * 60 * 1000, // 10 minutes
    maxSize: 50, // 50 composants max
    cleanupInterval: 10 * 60 * 1000, // Nettoyage toutes les 10 minutes
  },

  // Cache des API
  api: {
    ttl: 2 * 60 * 1000, // 2 minutes
    maxSize: 100, // 100 requêtes max
    cleanupInterval: 2 * 60 * 1000, // Nettoyage toutes les 2 minutes
  },

  // Cache des listes
  lists: {
    ttl: 15 * 60 * 1000, // 15 minutes
    maxSize: 30, // 30 listes max
    cleanupInterval: 15 * 60 * 1000, // Nettoyage toutes les 15 minutes
    pageSize: 20,
    overscan: 5,
  },

  // Cache des traductions
  translations: {
    ttl: 60 * 60 * 1000, // 1 heure
    maxSize: 10, // 10 langues max
    cleanupInterval: 60 * 60 * 1000, // Nettoyage toutes les heures
  },

  // Cache des thèmes
  themes: {
    ttl: 24 * 60 * 60 * 1000, // 24 heures
    maxSize: 5, // 5 thèmes max
    cleanupInterval: 24 * 60 * 60 * 1000, // Nettoyage quotidien
  },

  // Cache des préférences utilisateur
  preferences: {
    ttl: 7 * 24 * 60 * 60 * 1000, // 7 jours
    maxSize: 20, // 20 préférences max
    cleanupInterval: 24 * 60 * 60 * 1000, // Nettoyage quotidien
  },
} as const;

// Types pour la configuration
export type CacheType = keyof typeof CACHE_CONFIG;
export type CacheConfig = typeof CACHE_CONFIG[CacheType];

// Fonctions utilitaires pour le cache
export const cacheUtils = {
  // Générer une clé de cache
  generateKey: (type: CacheType, identifier: string, params?: Record<string, any>): string => {
    const baseKey = `${type}:${identifier}`;
    if (params) {
      const paramString = Object.entries(params)
        .sort(([a], [b]) => a.localeCompare(b))
        .map(([k, v]) => `${k}=${v}`)
        .join('&');
      return `${baseKey}?${paramString}`;
    }
    return baseKey;
  },

  // Vérifier si le cache est valide
  isValid: (timestamp: number, ttl: number): boolean => {
    return Date.now() - timestamp < ttl;
  },

  // Calculer l'âge du cache
  getAge: (timestamp: number): number => {
    return Date.now() - timestamp;
  },

  // Formater l'âge du cache
  formatAge: (timestamp: number): string => {
    const age = cacheUtils.getAge(timestamp);
    const seconds = Math.floor(age / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (days > 0) return `${days}j`;
    if (hours > 0) return `${hours}h`;
    if (minutes > 0) return `${minutes}m`;
    return `${seconds}s`;
  },

  // Nettoyer le cache expiré
  cleanup: (cache: Map<string, any>, ttl: number): void => {
    const now = Date.now();
    for (const [key, entry] of cache.entries()) {
      if (!cacheUtils.isValid(entry.timestamp, ttl)) {
        cache.delete(key);
      }
    }
  },

  // Obtenir la taille du cache en bytes
  getSize: (cache: Map<string, any>): number => {
    let size = 0;
    for (const [key, value] of cache.entries()) {
      try {
        size += JSON.stringify({ key, value }).length;
      } catch {
        size += key.length + 100; // Estimation
      }
    }
    return size;
  },

  // Formater la taille en bytes
  formatSize: (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  },

  // Statistiques du cache
  getStats: (cache: Map<string, any>, ttl: number) => {
    const now = Date.now();
    let valid = 0;
    let expired = 0;
    let totalSize = 0;

    for (const [key, entry] of cache.entries()) {
      if (cacheUtils.isValid(entry.timestamp, ttl)) {
        valid++;
      } else {
        expired++;
      }
      totalSize += JSON.stringify(entry).length;
    }

    return {
      total: cache.size,
      valid,
      expired,
      size: totalSize,
      formattedSize: cacheUtils.formatSize(totalSize),
    };
  },
};

// Configuration des headers de cache HTTP
export const CACHE_HEADERS = {
  // Images et ressources statiques
  static: {
    'Cache-Control': 'public, max-age=31536000, immutable', // 1 an
    'ETag': true,
  },

  // Données dynamiques
  dynamic: {
    'Cache-Control': 'public, max-age=300, s-maxage=600', // 5 min client, 10 min CDN
    'ETag': true,
  },

  // API
  api: {
    'Cache-Control': 'public, max-age=120, s-maxage=300', // 2 min client, 5 min CDN
    'ETag': true,
  },

  // Pas de cache
  noCache: {
    'Cache-Control': 'no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  },
} as const;

// Configuration des stratégies de cache
export const CACHE_STRATEGIES = {
  // Cache First (pour les ressources statiques)
  cacheFirst: {
    name: 'Cache First',
    description: 'Utilise le cache en priorité, fait une requête réseau si pas en cache',
    useCase: 'Images, CSS, JS, ressources statiques',
  },

  // Network First (pour les données dynamiques)
  networkFirst: {
    name: 'Network First',
    description: 'Fait une requête réseau en priorité, utilise le cache en fallback',
    useCase: 'Données API, contenu dynamique',
  },

  // Stale While Revalidate
  staleWhileRevalidate: {
    name: 'Stale While Revalidate',
    description: 'Retourne le cache immédiatement, met à jour en arrière-plan',
    useCase: 'Contenu qui peut être légèrement obsolète',
  },

  // Cache Only
  cacheOnly: {
    name: 'Cache Only',
    description: 'Utilise uniquement le cache, pas de requête réseau',
    useCase: 'Ressources critiques, mode hors ligne',
  },
} as const;

// Configuration des métriques de performance
export const PERFORMANCE_CONFIG = {
  // Seuils de performance
  thresholds: {
    imageLoad: 1000, // 1 seconde
    componentRender: 16, // 16ms (60fps)
    apiResponse: 2000, // 2 secondes
    cacheHit: 50, // 50ms
  },

  // Métriques à tracker
  metrics: [
    'cache-hit-ratio',
    'average-response-time',
    'memory-usage',
    'render-count',
    'cache-size',
  ],

  // Intervalles de collecte
  collection: {
    cacheStats: 5000, // 5 secondes
    performance: 10000, // 10 secondes
    memory: 30000, // 30 secondes
  },
} as const;

export default CACHE_CONFIG;
