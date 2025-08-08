'use client';

import Link from 'next/link';
import {useAuth} from '@/hooks/useAuth';
import {useTranslations} from '@/hooks/useTranslations';

interface MobileProfileMenuProps {
  onClose: () => void;
}

export function MobileProfileMenu({onClose}: MobileProfileMenuProps) {
  const {user, logout} = useAuth();
  const {t, locale} = useTranslations();

  const handleLogout = () => {
    logout();
    onClose();
  };

  // Get initials from email
  const getInitials = (email: string) => {
    return email
      .split('@')[0]
      .split(/[._-]/)
      .map(part => part.charAt(0).toUpperCase())
      .slice(0, 2)
      .join('');
  };

  if (!user) return null;

  return (
    <div className="space-y-2">
      {/* User Info */}
      <div className="flex items-center space-x-3 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 rounded-lg mx-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
          {getInitials(user.email)}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
            {user.email.split('@')[0]}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {user.email}
          </p>
        </div>
      </div>

      {/* Menu Items */}
      <Link
        href={`/${locale}/profile`}
        onClick={onClose}
        className="flex items-center space-x-3 px-4 py-3 mx-4 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
      >
        <span className="text-xl">👤</span>
        <span className="font-medium">Mon Profil</span>
      </Link>
      
      <Link
        href={`/${locale}/favorites`}
        onClick={onClose}
        className="flex items-center space-x-3 px-4 py-3 mx-4 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
      >
        <span className="text-xl">❤️</span>
        <span className="font-medium">Mes Favoris</span>
      </Link>
      
      <Link
        href={`/${locale}/collections`}
        onClick={onClose}
        className="flex items-center space-x-3 px-4 py-3 mx-4 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
      >
        <span className="text-xl">📚</span>
        <span className="font-medium">Mes Collections</span>
      </Link>

      {/* Logout Button */}
      <button
        onClick={handleLogout}
        className="flex items-center space-x-3 w-full px-4 py-3 mx-4 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
      >
        <span className="text-xl">🚪</span>
        <span className="font-medium">{t('nav.logout')}</span>
      </button>
    </div>
  );
}
