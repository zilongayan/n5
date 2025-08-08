'use client';

import Link from 'next/link';
import {useState, useEffect} from 'react';
import {ThemeToggle} from './ThemeToggle';
import {SearchModal} from './SearchModal';
import {LanguageSelector} from './LanguageSelector';
import {useTranslations} from '@/hooks/useTranslations';
import {useAuth} from '@/hooks/useAuth';

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {t, locale} = useTranslations();
  const {user, loading, logout, isAuthenticated} = useAuth();

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && !(event.target as Element).closest('.mobile-menu')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        event.preventDefault();
        setIsSearchOpen(true);
      }
      if (event.key === 'Escape') {
        setIsSearchOpen(false);
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const navItems = [
    {href: `/${locale}`, label: t('nav.home'), icon: '🏠'},
    {href: `/${locale}/popular`, label: t('nav.popular'), icon: '🔥'},
    {href: `/${locale}/recent`, label: t('nav.recent'), icon: '🆕'},
    {href: `/${locale}/random`, label: t('nav.random'), icon: '🎲'},
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">N5</span>
            </div>
            <span className="text-xl font-bold text-slate-900 dark:text-white">Portal</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-2 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <span className="text-lg">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center space-x-2 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden xl:inline">{t('nav.search')}</span>
              <span className="hidden lg:inline xl:hidden">⌘K</span>
            </button>

            <LanguageSelector />
            <ThemeToggle />
            
            {/* Profile/Login */}
            <div className="hidden md:flex items-center space-x-2">
              {!loading && (
                isAuthenticated ? (
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {user?.email}
                    </span>
                    <button 
                      onClick={logout}
                      className="px-4 py-2 text-sm font-medium text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                ) : (
                  <>
                    <Link 
                      href={`/${locale}/login`} 
                      className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {t('nav.login')}
                    </Link>
                    <Link 
                      href={`/${locale}/signup`} 
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm"
                    >
                      {t('nav.signup')}
                    </Link>
                  </>
                )
              )}
            </div>
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <svg className="w-5 h-5 text-slate-600 dark:text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden py-4 border-t border-slate-200 dark:border-slate-700 mobile-menu">
          <div className="space-y-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
            
            {/* Mobile Search Button */}
            <button
              onClick={() => {
                setIsSearchOpen(true);
                setIsMenuOpen(false);
              }}
              className="flex items-center space-x-3 px-4 py-3 rounded-lg text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-200"
            >
              <span className="text-xl">🔍</span>
              <span className="font-medium">{t('nav.search')}</span>
            </button>
            
            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700 space-y-2">
              {!loading && (
                isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="px-4 py-3 text-center text-slate-600 dark:text-slate-400">
                      {user?.email}
                    </div>
                    <button
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full px-4 py-3 mx-4 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg transition-colors"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                ) : (
                  <>
                    <Link
                      href={`/${locale}/login`}
                      className="block px-4 py-3 text-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.login')}
                    </Link>
                    <Link
                      href={`/${locale}/signup`}
                      className="block px-4 py-3 mx-4 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.signup')}
                    </Link>
                  </>
                )
              )}
            </div>
          </div>
        </div>
      )}

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </nav>
  );
}