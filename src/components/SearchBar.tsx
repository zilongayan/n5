'use client';

import React, { useState, useEffect, useRef } from 'react';
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
}

interface SearchBarProps {
  placeholder?: string;
  className?: string;
}

export default function SearchBar({ placeholder = "Rechercher un manga...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Données de test simplifiées
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
      title: 'Chainsaw Man',
      cover: 'https://uploads.mangadex.org/covers/7d1f9c8e-8b1a-4b8c-9c1f-9c8e8b1a4b8c/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Denji est un jeune garçon vivant avec un démon tronçonneuse...',
      tags: ['Action', 'Horror', 'Supernatural'],
      rating: 4.9,
      views: 2100000,
      chapters: 97
    },
    {
      id: '3',
      title: 'One Piece',
      cover: 'https://uploads.mangadex.org/covers/9e1f9c8e-8b1a-4b8c-9c1f-9c8e8b1a4b8c/e90bdc47-c8b9-4df7-b2c0-17641b645ee1.jpg.512.jpg',
      description: 'Suivez les aventures de Monkey D. Luffy et son équipage de pirates...',
      tags: ['Action', 'Adventure', 'Comedy'],
      rating: 4.7,
      views: 3500000,
      chapters: 1089
    }
  ];

  // Gestion du clic à l'extérieur
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recherche simplifiée
  const performSearch = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    
    // Simulation d'un délai d'API
    setTimeout(() => {
      const filteredResults = mockSearchResults.filter(manga =>
        manga.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        manga.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        manga.description?.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      console.log('Search query:', searchQuery);
      console.log('Filtered results:', filteredResults);
      
      setResults(filteredResults);
      setShowDropdown(true);
      setIsLoading(false);
    }, 300);
  };

  // Gestion de la saisie
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    console.log('Input changed to:', value);
    
    // Recherche immédiate
    performSearch(value);
  };

  // Gestion du focus
  const handleInputFocus = () => {
    setIsFocused(true);
    if (query.trim()) {
      setShowDropdown(true);
    }
  };

  // Clic sur un résultat
  const handleResultClick = (result: SearchResult) => {
    console.log('Result clicked:', result);
    setShowDropdown(false);
    setQuery('');
    setIsFocused(false);
    router.push(`/gallery/${result.id}`);
  };

  // Soumission du formulaire
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      console.log('Form submitted with query:', query);
      setShowDropdown(false);
      setIsFocused(false);
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  // Effacer la recherche
  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setShowDropdown(false);
    setIsFocused(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      {/* Barre de recherche */}
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
          
          {/* Icône de recherche */}
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

          {/* Bouton d'effacement */}
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

          {/* Bouton de recherche */}
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

      {/* Dropdown des résultats */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-4 z-50">
          <div className="bg-slate-800/95 backdrop-blur-xl border-2 border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-500/20 max-h-96 overflow-y-auto">
            
            {/* Header */}
            <div className="sticky top-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl border-b border-purple-500/30 rounded-t-2xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <FireIcon className="w-5 h-5 text-orange-400" />
                  <span className="text-white font-semibold">Résultats de recherche</span>
                  <span className="bg-purple-500/30 text-purple-300 text-sm px-2 py-1 rounded-full">
                    {results.length} manga{results.length > 1 ? 's' : ''}
                  </span>
                </div>
              </div>
            </div>

            {/* Contenu des résultats */}
            <div className="p-4 space-y-3">
              {isLoading ? (
                <div className="p-8 text-center">
                  <div className="w-8 h-8 border-2 border-purple-400 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                  <p className="text-gray-400">Recherche en cours...</p>
                </div>
              ) : results.length === 0 ? (
                <div className="p-8 text-center">
                  <p className="text-gray-400 text-lg">Aucun résultat trouvé</p>
                  <p className="text-gray-500 text-sm">Essayez avec d'autres mots-clés</p>
                </div>
              ) : (
                results.map((result) => (
                  <div
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className="group cursor-pointer p-4 rounded-xl hover:bg-slate-700/50 transition-all duration-300 border-2 border-transparent hover:border-purple-500/30"
                  >
                    <div className="flex gap-4">
                      {/* Image de couverture */}
                      <div className="flex-shrink-0">
                        <img
                          src={result.cover}
                          alt={result.title}
                          className="w-20 h-24 object-cover rounded-xl shadow-lg"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Contenu */}
                      <div className="flex-1 min-w-0 space-y-2">
                        <h4 className="text-white font-bold text-lg">
                          {result.title}
                        </h4>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
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
                        <p className="text-gray-300 text-sm line-clamp-2">
                          {result.description}
                        </p>
                        
                        {/* Statistiques */}
                        <div className="flex items-center gap-4 text-xs text-gray-400 pt-2 border-t border-slate-600/30">
                          <div className="flex items-center gap-1">
                            <StarIcon className="w-3 h-3" />
                            <span>{result.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <EyeIcon className="w-3 h-3" />
                            <span>{(result.views || 0).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <BookOpenIcon className="w-3 h-3" />
                            <span>{result.chapters} ch.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
              
              {/* Bouton voir tous les résultats */}
              {results.length > 0 && (
                <div className="p-4 border-t border-slate-600/30">
                  <button
                    onClick={handleSearch}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    Voir Tous les Résultats ({results.length})
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
