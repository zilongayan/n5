'use client';

import Image from 'next/image';
import { useState, useCallback, useMemo } from 'react';

interface CachedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataURL?: string;
  sizes?: string;
  quality?: number;
  onLoad?: () => void;
  onError?: () => void;
}

export function CachedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  placeholder = 'empty',
  blurDataURL,
  sizes,
  quality = 75,
  onLoad,
  onError,
}: CachedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [imageSrc, setImageSrc] = useState(src);

  // Cache key basé sur l'URL de l'image
  const cacheKey = useMemo(() => {
    try {
      const url = new URL(src, window.location.origin);
      return `${url.pathname}${url.search}`;
    } catch {
      return src;
    }
  }, [src]);

  // Gestionnaire de chargement réussi
  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    onLoad?.();
    
    // Stocker dans le cache local
    if (typeof window !== 'undefined') {
      try {
        const imageCache = JSON.parse(localStorage.getItem('imageCache') || '{}');
        imageCache[cacheKey] = {
          src: imageSrc,
          timestamp: Date.now(),
          loaded: true
        };
        localStorage.setItem('imageCache', JSON.stringify(imageCache));
      } catch (error) {
        console.warn('Failed to cache image:', error);
      }
    }
  }, [cacheKey, imageSrc, onLoad]);

  // Gestionnaire d'erreur avec fallback
  const handleError = useCallback(() => {
    setHasError(true);
    onError?.();
    
    // Essayer un fallback si disponible
    if (imageSrc !== '/placeholder-image.jpg') {
      setImageSrc('/placeholder-image.jpg');
      setHasError(false);
    }
  }, [imageSrc, onError]);

  // Vérifier le cache au montage
  useMemo(() => {
    if (typeof window !== 'undefined') {
      try {
        const imageCache = JSON.parse(localStorage.getItem('imageCache') || '{}');
        const cached = imageCache[cacheKey];
        
        if (cached && cached.loaded && Date.now() - cached.timestamp < 24 * 60 * 60 * 1000) {
          // Cache valide (moins de 24h)
          setIsLoaded(true);
        }
      } catch (error) {
        console.warn('Failed to read image cache:', error);
      }
    }
  }, [cacheKey]);

  // Nettoyer le cache périodiquement
  useMemo(() => {
    if (typeof window !== 'undefined') {
      const cleanupCache = () => {
        try {
          const imageCache = JSON.parse(localStorage.getItem('imageCache') || '{}');
          const now = Date.now();
          const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 jours
          
          const cleanedCache = Object.fromEntries(
            Object.entries(imageCache).filter(([_, data]: [string, any]) => 
              now - data.timestamp < maxAge
            )
          );
          
          localStorage.setItem('imageCache', JSON.stringify(cleanedCache));
        } catch (error) {
          console.warn('Failed to cleanup image cache:', error);
        }
      };

      // Nettoyer toutes les heures
      const interval = setInterval(cleanupCache, 60 * 60 * 1000);
      return () => clearInterval(interval);
    }
  }, []);

  if (hasError && imageSrc === '/placeholder-image.jpg') {
    return (
      <div 
        className={`${className} bg-gray-200 dark:bg-gray-700 flex items-center justify-center`}
        style={{ width: width || 200, height: height || 200 }}
      >
        <span className="text-gray-500 dark:text-gray-400 text-sm">
          Image non disponible
        </span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={imageSrc}
        alt={alt}
        width={width}
        height={height}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        priority={priority}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes}
        quality={quality}
        onLoad={handleLoad}
        onError={handleError}
        loading={priority ? 'eager' : 'lazy'}
      />
      
      {/* Placeholder de chargement */}
      {!isLoaded && !hasError && (
        <div 
          className="absolute inset-0 bg-gray-200 dark:bg-gray-700 animate-pulse"
          style={{ width: width || 200, height: height || 200 }}
        />
      )}
      
      {/* Indicateur de cache */}
      {isLoaded && (
        <div className="absolute top-1 right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded opacity-75">
          ✓
        </div>
      )}
    </div>
  );
}
