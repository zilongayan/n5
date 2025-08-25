'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { MagnifyingGlassIcon, XMarkIcon, ClockIcon, StarIcon, EyeIcon, FireIcon, BookOpenIcon } from '@heroicons/react/24/outline';
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
  const [isFocused, setIsFocused] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Simulated search results - in real app, this would come from API
  const mockSearchResults: SearchResult[] = [
    {
      id: '1',
      title: 'Solo Leveling',
      cover: 'https://uploads.mangadex.org/covers/32d76d19-8a05-4db0-9fc2-e0b0648fe9d0/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Lorsque d\'étranges portails sont apparus aux quatre coins du monde, l\'humanité a dû trouver parade pour ne pas finir massacrée entre les griffes des monstres qu\'ils ont apportés avec eux.',
      tags: ['Action', 'Fantasy', 'Monsters', 'Adventure'],
      rating: 4.8,
      views: 1250000,
      chapters: 156
    },
    {
      id: '2',
      title: 'Mairimashita! Iruma-kun',
      cover: 'https://uploads.mangadex.org/covers/5c1f9c8e-8b1a-4b8c-9c1f-9c8e8b1a4b8c/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Hopeless pushover Iruma Suzuki has found himself in a devil of a predicament. His trashy parents have sold him to the devil!',
      tags: ['Comedy', 'Fantasy', 'School', 'Demons'],
      rating: 4.6,
      views: 890000,
      chapters: 89
    },
    {
      id: '3',
      title: 'Chainsaw Man',
      cover: 'https://uploads.mangadex.org/covers/7d1f9c8e-8b1a-4b8c-9c1f-9c8e8b1a4b8c/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Denji is a teenage boy living with a Chainsaw Devil named Pochita. Due to the debt his father left behind, he has been living a rock-bottom life while repaying his debt.',
      tags: ['Action', 'Horror', 'Supernatural', 'Demons'],
      rating: 4.9,
      views: 2100000,
      chapters: 97
    },
    {
      id: '4',
      title: 'One Piece',
      cover: 'https://uploads.mangadex.org/covers/9e1f9c8e-8b1a-4b8c-9c1f-9c8e8b1a4b8c/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Follow the adventures of Monkey D. Luffy and his pirate crew in search of the legendary treasure known as "One Piece" to become the next Pirate King.',
      tags: ['Action', 'Adventure', 'Comedy', 'Pirates'],
      rating: 4.7,
      views: 3500000,
      chapters: 1089
    },
    {
      id: '5',
      title: 'Demon Slayer',
      cover: 'https://uploads.mangadex.org/covers/0f1f9c8e-8b1a-4b8c-9c1f-9c8e8b1a4b8c/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Tanjirou Kamado\'s life changes when his family is attacked by demons and only his sister Nezuko survives, but she has been transformed into a demon.',
      tags: ['Action', 'Fantasy', 'Historical', 'Demons'],
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
        setIsFocused(false);
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
            // Create a synthetic form event for the search
            const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
            handleSearch(syntheticEvent);
          }
          break;
        case 'Escape':
          setShowDropdown(false);
          setSelectedIndex(-1);
          setIsFocused(false);
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

  const handleInputFocus = () => {
    setIsFocused(true);
    if (query.trim() && results.length > 0) {
      setShowDropdown(true);
    }
  };

  const handleResultClick = (result: SearchResult) => {
    setShowDropdown(false);
    setQuery('');
    setSelectedIndex(-1);
    setIsFocused(false);
    router.push(`/gallery/${result.id}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setShowDropdown(false);
      setSelectedIndex(-1);
      setIsFocused(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
    setIsFocused(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Enhanced Search Input */}
      <form onSubmit={handleSearch} className="relative group">
        <div className={`relative transition-all duration-500 ${
          isFocused ? 'scale-105' : 'scale-100'
        }`}>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={handleInputFocus}
            placeholder={placeholder}
            className={`w-full px-16 py-5 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-2 rounded-3xl text-white placeholder-gray-400 focus:outline-none backdrop-blur-xl transition-all duration-500 ${
              isFocused 
                ? 'border-purple-400 shadow-2xl shadow-purple-500/30 scale-105' 
                : 'border-purple-500/30 hover:border-purple-400/50'
            }`}
          />
          
          {/* Background Glow Effect */}
          <div className={`absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-blue-500/10 rounded-3xl blur-xl transition-opacity duration-500 ${
            isFocused ? 'opacity-100' : 'opacity-0'
          }`} />
          
          {/* Search Icon with Animation */}
          <div className="absolute left-5 top-1/2 -translate-y-1/2">
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-purple-400 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <div className={`transition-all duration-300 ${isFocused ? 'scale-110' : 'scale-100'}`}>
                <MagnifyingGlassIcon className={`w-6 h-6 transition-colors duration-300 ${
                  isFocused ? 'text-purple-400' : 'text-gray-400'
                }`} />
              </div>
            )}
          </div>

          {/* Clear Button with Enhanced Animation */}
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-24 top-1/2 -translate-y-1/2 p-2.5 bg-slate-700/50 hover:bg-red-500/20 text-gray-400 hover:text-white rounded-xl transition-all duration-300 transform hover:scale-110 backdrop-blur-sm border border-slate-600/30 hover:border-red-500/50"
              aria-label="Effacer la recherche"
            >
              <XMarkIcon className="w-4 h-4" />
            </button>
          )}

          {/* Enhanced Search Button */}
          <button 
            type="submit"
            className={`absolute right-2 top-1/2 -translate-y-1/2 px-6 py-3 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white font-semibold rounded-2xl transition-all duration-300 transform hover:scale-110 hover:shadow-xl hover:shadow-purple-500/30 ${
              isFocused ? 'shadow-lg shadow-purple-500/20' : ''
            }`}
            aria-label="Rechercher"
          >
            <MagnifyingGlassIconSolid className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Enhanced Search Results Dropdown */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-4 animate-in slide-in-from-top-2 duration-300">
          <div className="bg-gradient-to-br from-slate-800/95 via-slate-700/95 to-slate-800/95 backdrop-blur-2xl border-2 border-purple-500/30 rounded-3xl shadow-2xl shadow-purple-500/20 z-50 max-h-[500px] overflow-y-auto">
            
            {/* Dropdown Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-b border-purple-500/30 rounded-t-3xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FireIcon className="w-5 h-5 text-orange-400" />
                  <span className="text-white font-semibold">Résultats de recherche</span>
                  <span className="bg-purple-500/30 text-purple-300 text-sm px-2 py-1 rounded-full">
                    {results.length} manga{results.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="text-gray-400 text-sm">
                  Utilisez ↑↓ pour naviguer, Enter pour sélectionner
                </div>
              </div>
            </div>

            {isLoading ? (
              <div className="p-12 text-center">
                <div className="w-12 h-12 border-3 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-300 text-lg font-medium">Recherche en cours...</p>
                <p className="text-gray-500 text-sm">Analyse de notre base de données</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MagnifyingGlassIcon className="w-10 h-10 text-gray-500" />
                </div>
                <p className="text-gray-300 text-xl font-semibold mb-2">Aucun résultat trouvé</p>
                <p className="text-gray-500 text-sm mb-4">Essayez avec d'autres mots-clés ou vérifiez l'orthographe</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['Action', 'Fantasy', 'Romance', 'Comedy'].map((suggestion) => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30 hover:bg-purple-500/30 transition-colors"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-3">
                {results.map((result, index) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`group cursor-pointer transition-all duration-300 transform hover:scale-[1.02] ${
                      index === selectedIndex
                        ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400/50 shadow-lg shadow-purple-500/20'
                        : 'hover:bg-slate-700/50 border-2 border-transparent'
                    } rounded-2xl p-4`}
                  >
                    <div className="flex gap-4">
                      {/* Enhanced Cover Image */}
                      <div className="flex-shrink-0 relative">
                        <img
                          src={result.cover}
                          alt={result.title}
                          className="w-20 h-24 object-cover rounded-xl shadow-lg group-hover:shadow-purple-500/20 transition-all duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        
                        {/* Rating Badge */}
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-black text-xs font-bold px-2 py-1 rounded-full shadow-lg">
                          ⭐ {result.rating}
                        </div>
                      </div>
                      
                      {/* Enhanced Content */}
                      <div className="flex-1 min-w-0 space-y-3">
                        {/* Title with Hover Effect */}
                        <h4 className="text-white font-bold text-xl leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300 line-clamp-1">
                          {result.title}
                        </h4>
                        
                        {/* Enhanced Tags */}
                        <div className="flex flex-wrap gap-2">
                          {result.tags?.slice(0, 3).map((tag, tagIndex) => (
                            <span
                              key={tagIndex}
                              className="px-3 py-1.5 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium rounded-full border border-purple-500/40 hover:border-purple-400/60 hover:bg-purple-500/30 transition-all duration-300 backdrop-blur-sm"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Enhanced Description */}
                        <p className="text-gray-300 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-200 transition-colors duration-300">
                          {result.description}
                        </p>
                        
                        {/* Enhanced Stats Row */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-600/30">
                          <div className="flex items-center gap-4 text-sm text-gray-400">
                            <div className="flex items-center gap-1.5">
                              <EyeIcon className="w-4 h-4 text-blue-400" />
                              <span>{(result.views || 0).toLocaleString()}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <BookOpenIcon className="w-4 h-4 text-green-400" />
                              <span>{result.chapters} chapitres</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                              <ClockIcon className="w-4 h-4 text-yellow-400" />
                              <span>Mis à jour récemment</span>
                            </div>
                          </div>
                          
                          {/* Quick Action Button */}
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105">
                              Lire →
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {/* Enhanced View All Results */}
                <div className="p-4 border-t border-slate-600/30 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-2xl">
                  <button
                    onClick={handleSearch}
                    className="w-full px-6 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white font-semibold text-lg rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/30"
                  >
                    <div className="flex items-center justify-center gap-3">
                      <span>Voir Tous les Résultats</span>
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {results.length} manga{results.length > 1 ? 's' : ''}
                      </span>
                      <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
