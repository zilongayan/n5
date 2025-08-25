'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface PopularManga {
  id: string;
  title: string;
  description: string;
  tags: string[];
  cover: string;
  type?: string;
  author?: string;
  artist?: string;
  rating?: number;
  follows?: number;
}

interface PopularCarouselProps {
  locale: string;
  mangas: PopularManga[];
}

export default function PopularCarousel({ locale, mangas }: PopularCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mangas.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying, mangas.length]);

  const goToPrev = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + mangas.length) % mangas.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % mangas.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  if (!mangas || mangas.length === 0) {
    return null;
  }

  return (
    <div className="py-16 bg-gradient-to-r from-slate-800/50 via-purple-900/20 to-slate-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            🔥 <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
              Popular New Titles
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Les mangas les plus populaires du moment, mis à jour en temps réel
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Navigation Arrows */}
          <button 
            onClick={goToPrev} 
            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 border border-purple-500/30 backdrop-blur-sm" 
            aria-label="Previous slide"
          >
            <ChevronLeftIcon className="w-6 h-6" />
          </button>
          
          <button 
            onClick={goToNext} 
            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-slate-900/80 hover:bg-slate-800 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 border border-purple-500/30 backdrop-blur-sm" 
            aria-label="Next slide"
          >
            <ChevronRightIcon className="w-6 h-6" />
          </button>

          {/* Slides Container */}
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {mangas.map((manga, index) => (
                <div key={manga.id} className="w-full flex-shrink-0">
                  <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden">
                    <div className="flex flex-col lg:flex-row min-h-[400px]">
                      {/* Cover Image */}
                      <div className="lg:w-1/2 relative">
                        <img 
                          src={manga.cover} 
                          alt={manga.title} 
                          className="w-full h-full object-cover min-h-[300px] lg:min-h-[400px]"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                        <div className="mb-6">
                          <h3 className="text-3xl font-bold text-white mb-4 line-clamp-2 group-hover:text-purple-400 transition-colors">
                            {manga.title}
                          </h3>
                          
                          {/* Tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {manga.tags && manga.tags.slice(0, 3).map((tag: string, tagIndex: number) => (
                              <span 
                                key={tagIndex}
                                className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
                              >
                                {tag.toUpperCase()}
                              </span>
                            ))}
                          </div>
                          
                          {/* Description */}
                          <p className="text-gray-400 text-lg line-clamp-3">
                            {manga.description}
                          </p>
                        </div>
                        
                        {/* Author/Artist Info */}
                        <div className="text-gray-500 text-sm mb-6">
                          {manga.author && (
                            <div className="mb-2">
                              <span className="text-gray-500">Auteur:</span> <span className="text-gray-300">{manga.author}</span>
                            </div>
                          )}
                          {manga.artist && manga.artist !== manga.author && (
                            <div>
                              <span className="text-gray-500">Artiste:</span> <span className="text-gray-300">{manga.artist}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Stats */}
                        <div className="flex items-center gap-6 text-sm text-gray-400 mb-6">
                          {manga.rating && manga.rating > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="text-yellow-400 text-lg">★</span>
                              <span>{manga.rating.toFixed(1)}</span>
                            </div>
                          )}
                          {manga.follows && manga.follows > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="text-purple-400 text-lg">👥</span>
                              <span>{(manga.follows / 1000).toFixed(0)}K</span>
                            </div>
                          )}
                        </div>
                        
                        {/* CTA Button */}
                        <Link 
                          href={`/${locale}/gallery/${manga.id}`}
                          className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                        >
                          Lire le Manga
                          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                      </div>
                    </div>
                    
                    {/* Slide Counter */}
                    <div className="absolute top-4 right-4 flex items-center gap-2">
                      <span className="text-white text-sm font-bold">NO. {currentIndex + 1}</span>
                      <div className="flex gap-1">
                        <button 
                          onClick={goToPrev}
                          className="w-8 h-8 bg-slate-800/80 text-white rounded flex items-center justify-center hover:bg-slate-700 transition-colors"
                        >
                          ←
                        </button>
                        <button 
                          onClick={goToNext}
                          className="w-8 h-8 bg-slate-800/80 text-white rounded flex items-center justify-center hover:bg-slate-700 transition-colors"
                        >
                          →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots Navigation */}
        <div className="flex justify-center mt-8 gap-2">
          {mangas.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-purple-500 scale-125' 
                  : 'bg-gray-400 hover:bg-gray-300'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link 
            href={`/${locale}/popular`} 
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white text-lg font-semibold rounded-2xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-2xl hover:shadow-orange-500/25 transform hover:scale-105 border border-orange-400/20"
          >
            <span>Voir Tous les Titres Populaires</span>
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
