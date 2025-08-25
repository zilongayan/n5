'use client';

import {useState, useRef, useEffect} from 'react';
import {useTranslations} from '@/hooks/useTranslations';

interface ShareButtonProps {
  itemId: string;
  title: string;
  className?: string;
}

export function ShareButton({itemId, title, className = ''}: ShareButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const {t, locale} = useTranslations();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getGalleryUrl = (): string => {
    if (typeof window === 'undefined') return `/${locale}/gallery/${itemId}`;
    return `${window.location.origin}/${locale}/gallery/${itemId}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getGalleryUrl());
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setIsOpen(false);
      }, 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareVia = (platform: string) => {
    const encodedTitle = encodeURIComponent(title);
    const encodedUrl = encodeURIComponent(getGalleryUrl());
    
    let shareUrl = '';
    
    switch (platform) {
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
        break;
      case 'reddit':
        shareUrl = `https://reddit.com/submit?title=${encodedTitle}&url=${encodedUrl}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`;
        break;
    }
    
    if (shareUrl && typeof window !== 'undefined') {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setIsOpen(false);
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center px-6 py-3 rounded-xl transition-all duration-300 theme-button-secondary hover:scale-105 ${className}`}
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
        </svg>
        📤 {t('gallery.share')}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50">
          {/* Copy Link */}
          <button
            onClick={copyToClipboard}
            className={`flex items-center w-full px-4 py-2 text-sm transition-colors ${
              copied 
                ? 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20' 
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
            }`}
          >
            <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {copied ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              )}
            </svg>
            {copied ? t('gallery.linkCopied') : t('gallery.copyLink')}
          </button>

          <div className="border-t border-slate-200 dark:border-slate-700 my-1"></div>
          <div className="px-4 py-2 text-xs text-slate-500 dark:text-slate-400">
            {t('gallery.shareVia')}
          </div>

          {/* Social Media Platforms */}
          <button
            onClick={() => shareVia('twitter')}
            className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="text-blue-400 text-lg mr-3">🐦</span>
            Twitter
          </button>

          <button
            onClick={() => shareVia('facebook')}
            className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="text-blue-600 text-lg mr-3">📘</span>
            Facebook
          </button>

          <button
            onClick={() => shareVia('reddit')}
            className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="text-orange-500 text-lg mr-3">🟠</span>
            Reddit
          </button>

          <button
            onClick={() => shareVia('telegram')}
            className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="text-blue-500 text-lg mr-3">✈️</span>
            Telegram
          </button>

          <button
            onClick={() => shareVia('whatsapp')}
            className="flex items-center w-full px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
          >
            <span className="text-green-500 text-lg mr-3">💬</span>
            WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
