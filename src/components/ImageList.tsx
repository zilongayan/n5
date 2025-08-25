'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { ReaderMode } from './ModeToggle';
import { CachedImage } from './CachedImage';

interface ImageListProps {
  images: string[];
  currentPage: number;
  mode: ReaderMode;
  zoom: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export function ImageList({
  images,
  currentPage,
  mode,
  zoom,
  onPageChange,
  className = ''
}: ImageListProps) {
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [errorImages, setErrorImages] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Preload images
  const preloadImage = useCallback(async (index: number) => {
    if (loadedImages.has(index) || errorImages.has(index)) return;
    
    setIsLoading(true);
    try {
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = images[index];
      });
      
      setLoadedImages(prev => new Set(prev).add(index));
    } catch (error) {
      console.error(`Failed to load image ${index}:`, error);
      setErrorImages(prev => new Set(prev).add(index));
    } finally {
      setIsLoading(false);
    }
  }, [images, loadedImages, errorImages]);

  // Preload current page and next few pages
  useEffect(() => {
    const pagesToPreload = [currentPage, currentPage + 1, currentPage + 2];
    pagesToPreload.forEach(page => {
      if (page >= 1 && page <= images.length) {
        preloadImage(page - 1);
      }
    });
  }, [currentPage, images.length, preloadImage]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!containerRef.current) return;

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0');
            preloadImage(index);
          }
        });
      },
      { threshold: 0.1 }
    );

    const imageElements = containerRef.current.querySelectorAll('[data-index]');
    imageElements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
  }, [preloadImage]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'ArrowUp':
          e.preventDefault();
          onPageChange(Math.max(1, currentPage - 1));
          break;
        case 'ArrowRight':
        case 'ArrowDown':
        case ' ':
          e.preventDefault();
          onPageChange(Math.min(images.length, currentPage + 1));
          break;
        case 'Home':
          e.preventDefault();
          onPageChange(1);
          break;
        case 'End':
          e.preventDefault();
          onPageChange(images.length);
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, images.length, onPageChange]);

  const renderImage = (index: number) => {
    const isCurrentPage = index === currentPage - 1;
    const isLoaded = loadedImages.has(index);
    const hasError = errorImages.has(index);

    if (hasError) {
      return (
        <div
          key={index}
          data-index={index}
          className="flex items-center justify-center min-h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">❌</div>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Erreur de chargement
            </p>
            <button
              onClick={() => preloadImage(index)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Réessayer
            </button>
          </div>
        </div>
      );
    }

    if (!isLoaded) {
      return (
        <div
          key={index}
          data-index={index}
          className="flex items-center justify-center min-h-[400px] bg-gray-100 dark:bg-gray-800 rounded-lg animate-pulse"
        >
          <div className="text-center">
            <div className="text-4xl mb-2">⏳</div>
            <p className="text-gray-600 dark:text-gray-400">
              Chargement...
            </p>
          </div>
        </div>
      );
    }

    return (
      <div
        key={index}
        data-index={index}
        className={`transition-all duration-300 ${
          isCurrentPage ? 'opacity-100 scale-100' : 'opacity-60 scale-95'
        }`}
      >
        <CachedImage
          src={images[index]}
          alt={`Page ${index + 1}`}
          className={`w-full h-auto ${
            mode === 'fit-width' ? 'max-w-full' :
            mode === 'fit-height' ? 'max-h-screen' :
            'max-w-full max-h-screen'
          }`}
          style={{
            transform: `scale(${zoom})`,
            transformOrigin: 'top left'
          }}
        />
      </div>
    );
  };

  if (mode === 'long-strip') {
    return (
      <div ref={containerRef} className={`space-y-4 ${className}`}>
        {images.map((_, index) => renderImage(index))}
      </div>
    );
  }

  // Single page mode
  return (
    <div ref={containerRef} className={`flex justify-center ${className}`}>
      {renderImage(currentPage - 1)}
    </div>
  );
}
