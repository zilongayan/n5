'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, XMarkIcon, ClockIcon, StarIcon, EyeIcon } from '@heroicons/react/24/outline';
import { MagnifyingGlassIcon as MagnifyingGlassIconSolid } from '@heroicons/react/24/solid';

interface SearchResult {
  id: string;
  title: string;
  cover: string;
  description?: string;
  tags?: string[];
  rating?: number;
  views?: number;
  chapters?: number;
  lastUpdated?: string;
}

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ placeholder = "Rechercher un manga...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Simulated search results - in real app, this would come from API
  const mockSearchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Solo Leveling',
      cover: 'https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Lorsque d\'étranges portails sont apparus aux quatre coins du monde...',
      tags: ['Action', 'Fantasy', 'Monsters'],
      rating: 4.8,
      views: 1250000,
      chapters: 156
    },
    {
      id: '2',
      title: 'Mairimashita! Iruma-kun',
      cover: 'https://uploads.mangadex.org/covers/5c1f9c8e-8b1a-4b8c-9c1f-9c8e8b1a4b8c/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Hopeless pushover Iruma Suzuki has found himself in a devil of a predicament...',
      tags: ['Comedy', 'Fantasy', 'School'],
      rating: 4.6,
      views: 890000,
      chapters: 89
    },
    {
      id: '3',
      title: 'Chainsaw Man',
      cover: 'https://uploads.mangadex.org/covers/7d1f9c8e-8b1a-4b8c-9c1f-9c8e8b1a4b8c/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Denji is a teenage boy living with a Chainsaw Devil named Pochita...',
      tags: ['Action', 'Horror', 'Supernatural'],
      rating: 4.9,
      views: 2100000,
      chapters: 97
    },
    {
      id: '4',
      title: 'One Piece',
      cover: 'https://uploads.mangadex.org/covers/9e1f9c8e-8b1a-4b8c-9c1f-9c8e8b1a4b8c/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Follow the adventures of Monkey D. Luffy and his pirate crew...',
      tags: ['Action', 'Adventure', 'Comedy'],
      rating: 4.7,
      views: 3500000,
      chapters: 1089
    },
    {
      id: '5',
      title: 'Demon Slayer',
      cover: 'https://uploads.mangadex.org/covers/0f1f9c8e-8b1a-4b8c-9c1f-9c8e8b1a4b8c/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Tanjirou Kamado\'s life changes when his family is attacked by demons...',
      tags: ['Action', 'Fantasy', 'Historical'],
      rating: 4.8,
      views: 1800000,
      chapters: 205
    }
  ];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!showDropdown) return;

      switch (event.key) {
        case 'ArrowDown':
          event.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          event.preventDefault();
          setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
          break;
        case 'Enter':
          event.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick(results[selectedIndex]);
          } else if (query.trim()) {
            handleSearch(event as any);
          }
          break;
        case 'Escape':
          setShowDropdown(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showDropdown, results, selectedIndex, query]);

  // Simulate search with debouncing
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setShowDropdown(false);
      setSelectedIndex(-1);
      return;
    }

    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      // Simulate API call delay
      setTimeout(() => {
        const filteredResults = mockSearchResults.filter(manga =>
          manga.title.toLowerCase().includes(query.toLowerCase()) ||
          manga.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase())) ||
          manga.description?.toLowerCase().includes(query.toLowerCase())
        );
        
        setResults(filteredResults);
        setShowDropdown(filteredResults.length > 0);
        setSelectedIndex(-1);
        setIsLoading(false);
      }, 300);
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsSearching(true);
  };

  const handleResultClick = (result: SearchResult) => {
    setShowDropdown(false);
    setQuery('');
    setSelectedIndex(-1);
    router.push(`/gallery/${result.id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      setSelectedIndex(-1);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query.trim() && setShowDropdown(true)}
            placeholder={placeholder}
            className="w-full px-6 py-4 bg-slate-800/80 border border-purple-500/30 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 backdrop-blur-sm transition-all duration-300"
          />
          
          {/* Search Icon */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
            )}
          </div>

          {/* Clear Button */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-20 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-white transition-colors"
              aria-label="Effacer la recherche"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}

          {/* Search Button */}
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
            aria-label="Rechercher"
          >
            <MagnifyingGlassIconSolid className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-slate-800/95 backdrop-blur-xl border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-6 text-center">
              <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-400">Recherche en cours...</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center">
              <MagnifyingGlassIcon className="w-12 h-12 text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400 text-lg">Aucun résultat trouvé</p>
              <p className="text-gray-500 text-sm">Essayez avec d'autres mots-clés</p>
            </div>
          ) : (
            <div className="p-2">
              {results.map((result, index) => (
                <div
                  key={result.id}
                  onClick={() => handleResultClick(result)}
                  className={`p-3 rounded-xl cursor-pointer transition-all duration-200 ${
                    index === selectedIndex
                      ? 'bg-purple-500/20 border border-purple-400/50'
                      : 'hover:bg-slate-700/50 border border-transparent'
                  }`}
                >
                  <div className="flex gap-3">
                    {/* Cover Image */}
                    <div className="flex-shrink-0">
                      <img
                        src={result.cover}
                        alt={result.title}
                        className="w-16 h-20 object-cover rounded-lg shadow-lg"
                        loading="lazy"
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-semibold text-lg mb-1 line-clamp-1">
                        {result.title}
                      </h4>
                      
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1 mb-2">
                        {result.tags?.slice(0, 2).map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded-full border border-purple-500/30"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      {/* Description */}
                      <p className="text-gray-400 text-sm line-clamp-2 mb-2">
                        {result.description}
                      </p>
                      
                      {/* Stats */}
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <StarIcon className="w-3 h-3" />
                          <span>{result.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <EyeIcon className="w-3 h-3" />
                          <span>{(result.views || 0).toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <ClockIcon className="w-3 h-3" />
                          <span>{result.chapters} ch.</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* View All Results */}
              <div className="p-3 border-t border-slate-600/30">
                <button
                  onClick={handleSearch}
                  className="w-full px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105"
                >
                  Voir Tous les Résultats ({results.length})
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
