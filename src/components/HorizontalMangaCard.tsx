'use client';

import React, { useState, useCallback } from 'react';
import { HeartIcon, BookmarkIcon, EyeIcon, StarIcon, ClockIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid, BookmarkIcon as BookmarkIconSolid } from '@heroicons/react/24/solid';

interface HorizontalMangaCardProps {
  manga: {
    id: string;
    title: string;
    cover: string;
    description?: string;
    tags?: string[];
    rating?: number;
    views?: number;
    chapters?: number;
    lastUpdated?: string;
  };
  locale: string;
  index: number;
}

export default function HorizontalMangaCard({ manga, locale, index }: HorizontalMangaCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  return (
    <div className="group">
      <a href={`/${locale}/gallery/${manga.id}`} className="block">
        <div className="bg-gradient-to-r from-slate-800/70 to-slate-700/70 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50 hover:border-purple-500/40 transition-all duration-500 hover:bg-slate-700/70 hover:shadow-xl hover:shadow-purple-500/10 transform hover:-translate-y-1">
          
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5 rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500"></div>
          </div>

          <div className="flex gap-5 relative z-10">
            {/* Cover Image */}
            <div className="relative flex-shrink-0">
              <img 
                src={manga.cover} 
                alt={manga.title} 
                className="w-24 h-32 object-cover rounded-xl shadow-lg group-hover:shadow-purple-500/20 transition-all duration-500 group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Rank Badge */}
              <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                #{index + 1}
              </div>

              {/* Rating Overlay */}
              <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                <div className="flex items-center gap-1">
                  <StarIcon className="w-3 h-3 text-yellow-400" />
                  <span className="text-white text-xs font-semibold">{manga.rating || 4.5}</span>
                </div>
              </div>
            </div>
            
            {/* Content */}
            <div className="flex-1 min-w-0 space-y-3">
              {/* Title */}
              <h4 className="text-white font-bold text-lg leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500 line-clamp-2">
                {manga.title}
              </h4>
              
              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {manga.tags?.slice(0, 2).map((tag, tagIndex) => (
                  <span 
                    key={tagIndex} 
                    className="px-2.5 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                  >
                    {tag.toUpperCase()}
                  </span>
                ))}
              </div>
              
              {/* Description */}
              <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                {manga.description || 'Description non disponible'}
              </p>
              
              {/* Stats Row */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <EyeIcon className="w-3.5 h-3.5" />
                    <span>{(manga.views || 0).toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookmarkIcon className="w-3.5 h-3.5" />
                    <span>{manga.chapters || 0} ch.</span>
                  </div>
                  {manga.lastUpdated && (
                    <div className="flex items-center gap-1">
                      <ClockIcon className="w-3.5 h-3.5" />
                      <span>{manga.lastUpdated}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-600/30">
            <div className="flex items-center gap-2">
              <button 
                onClick={handleLike}
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-red-500/20 border border-slate-600/50 hover:border-red-500/50 transition-all duration-300 group-hover:bg-slate-600/50"
              >
                {isLiked ? (
                  <HeartIconSolid className="w-4 h-4 text-red-400" />
                ) : (
                  <HeartIcon className="w-4 h-4 text-gray-400 group-hover:text-red-400" />
                )}
              </button>
              
              <button 
                onClick={handleBookmark}
                className="p-2 rounded-lg bg-slate-700/50 hover:bg-blue-500/20 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 group-hover:bg-slate-600/50"
              >
                {isBookmarked ? (
                  <BookmarkIconSolid className="w-4 h-4 text-blue-400" />
                ) : (
                  <BookmarkIcon className="w-4 h-4 text-gray-400 group-hover:text-blue-400" />
                )}
              </button>
            </div>
            
            {/* Read Button */}
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
              Lire
              <span className="ml-1 transform group-hover:translate-x-0.5 transition-transform duration-300">→</span>
            </div>
          </div>

          {/* Hover Effects */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
        </div>
      </a>
    </div>
  );
}
