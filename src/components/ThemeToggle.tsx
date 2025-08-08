'use client';

import {useEffect, useState} from 'react';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initial = savedTheme ?? (prefersDark ? 'dark' : 'light');
    
    setTheme(initial);
    document.documentElement.setAttribute('data-theme', initial);
    document.documentElement.classList.toggle('dark', initial === 'dark');
  }, []);

  const toggleTheme = () => {
    if (typeof window === 'undefined') return;
    
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    document.documentElement.classList.toggle('dark', next === 'dark');
    localStorage.setItem('theme', next);
  };

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 bg-slate-200 dark:bg-slate-700 rounded-full p-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 hover:bg-slate-300 dark:hover:bg-slate-600"
      aria-label={`Basculer vers le mode ${theme === 'light' ? 'sombre' : 'clair'}`}
      title={`Basculer vers le mode ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      <div className="relative w-4 h-4">
        <svg
          className={`absolute inset-0 w-4 h-4 text-yellow-500 transition-all duration-200 ${
            theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414z"
            clipRule="evenodd"
          />
        </svg>
        <svg
          className={`absolute inset-0 w-4 h-4 text-blue-400 transition-all duration-200 ${
            theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
          }`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </div>
      <div
        className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow-lg transition-all duration-300 ${
          theme === 'dark' ? 'translate-x-7' : 'translate-x-0'
        } border border-slate-300 dark:border-slate-600`}
      />
    </button>
  );
}
