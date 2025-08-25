'use client';

import Link from 'next/link';
import {useState, useEffect} from 'react';
import ThemeToggle from './ThemeToggle';
import {SearchModal} from './SearchModal';
import {LanguageSwitcher} from './LanguageSwitcher';
import {ProfileDropdown} from './ProfileDropdown';
import {MobileProfileMenu} from './MobileProfileMenu';
import {useTranslations} from '@/hooks/useTranslations';
import {useAuth} from '@/hooks/useAuth';

export function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const {t, locale} = useTranslations();
  const {loading, isAuthenticated} = useAuth();

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

  // Use root path for English home, localized path for others
  const homeHref = locale === 'en' ? '/' : `/${locale}`;
  const localePrefix = locale === 'en' ? '' : `/${locale}`;
  
  const navItems = [
    {href: homeHref, label: t('nav.home'), icon: '🏠'},
    {href: `${localePrefix}/popular`, label: t('nav.popular'), icon: '🔥'},
    {href: `${localePrefix}/recent`, label: t('nav.recent'), icon: '🆕'},
    {href: `${localePrefix}/random`, label: t('nav.random'), icon: '🎲'},
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-xl border-b border-purple-500/20 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href={homeHref} className="flex items-center space-x-3 group">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-purple-500/25 transition-all duration-300 group-hover:scale-110">
              <span className="text-white font-bold text-lg">🎌</span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">MangaView</span>
              <span className="text-xs text-gray-400 -mt-1">Otaku Portal</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group flex items-center space-x-2 text-gray-300 hover:text-purple-400 transition-all duration-300 relative"
              >
                <span className="text-lg group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                <span className="font-medium group-hover:text-purple-400 transition-colors duration-300">{item.label}</span>
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></div>
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            {/* Search Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="hidden md:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl text-purple-300 hover:from-purple-600/30 hover:to-pink-600/30 transition-all duration-300 text-sm border border-purple-500/30 hover:border-purple-400/50 backdrop-blur-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden xl:inline">{t('nav.search')}</span>
              <span className="hidden lg:inline xl:hidden">⌘K</span>
            </button>

            <LanguageSwitcher />
            <ThemeToggle />
            
            {/* Profile/Login */}
            <div className="hidden md:flex items-center space-x-2">
              {!loading && (
                isAuthenticated ? (
                  <ProfileDropdown />
                ) : (
                  <>
                    <Link 
                      href={`/${locale}/login`} 
                      className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-purple-400 transition-colors duration-300"
                    >
                      {t('nav.login')}
                    </Link>
                    <Link 
                      href={`/${locale}/signup`} 
                      className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/25 transform hover:scale-105"
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
            <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
              {!loading && (
                isAuthenticated ? (
                  <MobileProfileMenu onClose={() => setIsMenuOpen(false)} />
                ) : (
                  <div className="space-y-2">
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
                  </div>
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