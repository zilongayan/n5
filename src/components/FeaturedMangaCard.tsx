'use client';

import React, { useState, useCallback } from 'react';
import { HeartIcon, BookmarkIcon, ShareIcon, PlayIcon, StarIcon, EyeIcon, FireIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

interface FeaturedMangaCardProps {
  manga: {
    id: string;
    title: string;
    cover: string;
    description?: string;
    tags?: string[];
    rating?: number;
    views?: number;
    chapters?: number;
    status?: 'ongoing' | 'completed' | 'hiatus';
  };
  locale: string;
  rank: number;
  canNavigate?: {
    prev: boolean;
    next: boolean;
  };
}

export default function FeaturedMangaCard({ 
  manga, 
  locale, 
  rank, 
  canNavigate = { prev: false, next: true } 
}: FeaturedMangaCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleLike = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiked(!isLiked);
  }, [isLiked]);

  
  const handleBookmark = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
  }, [isBookmarked]);

  const handleShare = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: manga.title,
        text: manga.description || '',
        url: window.location.origin + `/${locale}/gallery/${manga.id}`
      });
    } else {
      navigator.clipboard.writeText(window.location.origin + `/${locale}/gallery/${manga.id}`);
    }
  }, [manga, locale]);

  const handleNavigation = useCallback((direction: 'prev' | 'next') => {
    // Navigation logic can be implemented here
    // For now, we'll just log the action
    console.log(`Navigate ${direction}`);
    
    // You could implement actual navigation logic here:
    // - Update the current manga index
    // - Fetch new manga data
    // - Update the component state
  }, []);

  const getStatusColor = (status?: string) => {
    switch (status) {
      case 'ongoing': return 'from-green-500 to-emerald-500';
      case 'completed': return 'from-blue-500 to-cyan-500';
      case 'hiatus': return 'from-yellow-500 to-orange-500';
      default: return 'from-gray-500 to-slate-500';
    }
  };

  const getStatusText = (status?: string) => {
    switch (status) {
      case 'ongoing': return 'En cours';
      case 'completed': return 'Terminé';
      case 'hiatus': return 'En pause';
      default: return 'Inconnu';
    }
  };

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <a href={`/${locale}/gallery/${manga.id}`} className="block">
        <div className="relative bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm border border-purple-500/30 rounded-3xl overflow-hidden hover:border-purple-400/60 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/20 transform hover:-translate-y-1">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 animate-pulse"></div>
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.3),transparent_50%)]"></div>
          </div>

          <div className="flex flex-col lg:flex-row min-h-[450px] relative z-10">
            {/* Image Section */}
            <div className="lg:w-1/2 relative overflow-hidden">
              <img 
                src={manga.cover} 
                alt={manga.title} 
                className="w-full h-full object-cover min-h-[300px] lg:min-h-[450px] transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Multiple Overlay Layers */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-transparent to-transparent"></div>
              
              {/* Floating Stats */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className="bg-black/60 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1">
                  <StarIcon className="w-4 h-4 text-yellow-400" />
                  <span className="text-white text-sm font-semibold">{manga.rating || 4.8}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-4 right-4">
                <div className={`bg-gradient-to-r ${getStatusColor(manga.status)} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                  {getStatusText(manga.status)}
                </div>
              </div>

              {/* Chapter Info */}
              <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2">
                <div className="flex items-center gap-2 text-white">
                  <BookmarkIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{manga.chapters || 0} chapitres</span>
                </div>
              </div>

              {/* Views Counter */}
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-xl px-3 py-2">
                <div className="flex items-center gap-2 text-white">
                  <EyeIcon className="w-4 h-4" />
                  <span className="text-sm font-medium">{(manga.views || 0).toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            {/* Content Section */}
            <div className="lg:w-1/2 p-8 lg:p-10 flex flex-col justify-center">
              <div className="mb-8">
                {/* Rank Badge */}
                <div className="inline-flex items-center gap-2 mb-6">
                  <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-sm px-3 py-1 rounded-full flex items-center gap-1">
                    <FireIcon className="w-4 h-4" />
                    NO. {rank}
                  </div>
                  <div className="bg-purple-500/20 text-purple-300 text-xs px-2 py-1 rounded-full border border-purple-500/30">
                    POPULAIRE
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500">
                  {manga.title}
                </h3>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {manga.tags?.slice(0, 4).map((tag: string, tagIndex: number) => (
                    <span 
                      key={tagIndex}
                      className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium rounded-full border border-purple-500/40 hover:border-purple-400/60 hover:bg-purple-500/30 transition-all duration-300"
                    >
                      {tag.toUpperCase()}
                    </span>
                  ))}
                </div>
                
                {/* Description */}
                <p className="text-gray-300 text-lg leading-relaxed line-clamp-4 group-hover:text-gray-200 transition-colors duration-300">
                  {manga.description || 'Description non disponible'}
                </p>
              </div>
              
              {/* Action Buttons */}
              <div className="space-y-4">
                {/* Main CTA */}
                <div className="inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white font-bold text-lg rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group-hover:shadow-purple-500/50">
                  <PlayIcon className="w-6 h-6 mr-3" />
                  Lire le Manga
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>

                {/* Secondary Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={handleLike}
                      className="p-3 rounded-xl bg-slate-700/50 hover:bg-red-500/20 border border-slate-600/50 hover:border-red-500/50 transition-all duration-300 group-hover:bg-slate-600/50"
                    >
                      {isLiked ? (
                        <HeartIconSolid className="w-5 h-5 text-red-400" />
                      ) : (
                        <HeartIcon className="w-5 h-5 text-gray-400 group-hover:text-red-400" />
                      )}
                    </button>
                    
                    <button 
                      onClick={handleBookmark}
                      className="p-3 rounded-xl bg-slate-700/50 hover:bg-blue-500/20 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 group-hover:bg-slate-600/50"
                    >
                      {isBookmarked ? (
                        <BookmarkIconSolid className="w-5 h-5 text-blue-400" />
                      ) : (
                        <BookmarkIcon className="w-5 h-5 text-gray-400 group-hover:text-blue-400" />
                      )}
                    </button>
                    
                    <button 
                      onClick={handleShare}
                      className="p-3 rounded-xl bg-slate-700/50 hover:bg-green-500/20 border border-slate-600/50 hover:border-green-500/50 transition-all duration-300 group-hover:bg-slate-600/50"
                    >
                      <ShareIcon className="w-5 h-5 text-gray-400 group-hover:text-green-400" />
                    </button>
                  </div>

                  {/* Quick Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <EyeIcon className="w-4 h-4" />
                      <span>{(manga.views || 0).toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4" />
                      <span>{manga.rating || 4.8}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Navigation Controls */}
          <div className="absolute top-6 right-6 flex items-center gap-3">
            <div className="flex gap-2">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavigation('prev');
                }}
                disabled={!canNavigate.prev}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  canNavigate.prev 
                    ? 'bg-slate-800/80 text-white hover:bg-purple-600 hover:scale-110 hover:shadow-lg' 
                    : 'bg-slate-800/40 text-gray-500 cursor-not-allowed'
                }`}
              >
                ←
              </button>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleNavigation('next');
                }}
                disabled={!canNavigate.next}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 ${
                  canNavigate.next 
                    ? 'bg-slate-800/80 text-white hover:bg-purple-600 hover:scale-110 hover:shadow-lg' 
                    : 'bg-slate-800/40 text-gray-500 cursor-not-allowed'
                }`}
              >
                →
              </button>
            </div>
          </div>

          {/* Hover Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl blur-xl" />
        </div>
      </a>
    </div>
  );
}
