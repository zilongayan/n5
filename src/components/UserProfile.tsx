'use client';

import { useAuth } from '@/hooks/useAuth';
import { signOut } from 'next-auth/react';

export function UserProfile() {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center space-x-3 p-3">
        <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded-full animate-pulse"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24 animate-pulse"></div>
          <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-32 animate-pulse"></div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return null;
  }

  return (
    <div className="flex items-center space-x-3 p-3">
      {/* Avatar */}
      <div className="relative">
        {user.image ? (
          <img
            src={user.image}
            alt={user.name || user.email}
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">
              {user.name?.charAt(0) || user.email?.charAt(0) || 'U'}
            </span>
          </div>
        )}
      </div>

      {/* Informations utilisateur */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
          {user.name || 'Utilisateur'}
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
          {user.email}
        </p>
      </div>

      {/* Bouton de déconnexion */}
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
        title="Se déconnecter"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </button>
    </div>
  );
}
