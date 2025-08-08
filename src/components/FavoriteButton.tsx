'use client';

import {useState, useEffect} from 'react';

interface FavoriteButtonProps {
  itemId: string;
  initialIsFavorite?: boolean;
  className?: string;
}

export function FavoriteButton({itemId, initialIsFavorite = false, className = ''}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/favorites', {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
        // Optionally show a toast notification
        if (!isFavorite) {
          // Item added to favorites
          console.log('Ajouté aux favoris !');
        } else {
          // Item removed from favorites
          console.log('Retiré des favoris !');
        }
      } else {
        const error = await response.json();
        if (response.status === 401) {
          // User not logged in
          window.location.href = '/login';
        } else {
          console.error('Erreur:', error.error);
        }
      }
    } catch (error) {
      console.error('Erreur réseau:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`group relative flex items-center justify-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <div className="relative">
        {/* Heart icon */}
        <svg 
          className={`w-5 h-5 transition-all duration-300 ${
            isFavorite 
              ? 'text-red-500 scale-110' 
              : 'text-gray-400 dark:text-gray-500 group-hover:text-red-400 group-hover:scale-110'
          }`}
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={isFavorite ? 0 : 2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
          />
        </svg>
        
        {/* Loading spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin opacity-60"></div>
          </div>
        )}
      </div>
      
      <span className={`text-sm transition-colors ${
        isFavorite 
          ? 'text-red-600 dark:text-red-400' 
          : 'text-gray-600 dark:text-gray-400 group-hover:text-red-500'
      }`}>
        {isFavorite ? 'Favori' : 'Ajouter aux favoris'}
      </span>
      
      {/* Animated heart particles */}
      {isFavorite && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="text-red-500 text-xs animate-ping">💖</div>
          </div>
        </div>
      )}
    </button>
  );
}

// Version compacte pour l'utilisation dans les cartes
export function FavoriteButtonCompact({itemId, initialIsFavorite = false}: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isLoading, setIsLoading] = useState(false);

  const toggleFavorite = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/favorites', {
        method: isFavorite ? 'DELETE' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ itemId }),
      });

      if (response.ok) {
        setIsFavorite(!isFavorite);
      } else if (response.status === 401) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Erreur:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleFavorite}
      disabled={isLoading}
      className={`p-2 rounded-full transition-all duration-300 hover:scale-110 disabled:opacity-50 ${
        isFavorite 
          ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400' 
          : 'bg-white/80 text-gray-500 hover:bg-red-50 hover:text-red-500 dark:bg-slate-800/80 dark:text-gray-400 dark:hover:bg-red-900/20'
      }`}
      title={isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'}
    >
      <svg 
        className="w-4 h-4"
        fill={isFavorite ? 'currentColor' : 'none'}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={isFavorite ? 0 : 2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
        />
      </svg>
    </button>
  );
}