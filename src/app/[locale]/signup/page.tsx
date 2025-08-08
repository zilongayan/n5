"use client";

import {useRouter, usePathname} from 'next/navigation';
import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';
import {useState, useEffect} from 'react';
import {useTranslations} from '@/hooks/useTranslations';
import {useAuth} from '@/hooks/useAuth';

export default function SignupPage() {
  const router = useRouter();
  const {t, locale} = useTranslations();
  const {isAuthenticated} = useAuth();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push(`/${locale}/profile`);
    }
  }, [isAuthenticated, router, locale]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get('email') || '').trim();
    const password = String(formData.get('password') || '').trim();
    const confirmPassword = String(formData.get('confirmPassword') || '').trim();

    if (!email || !password || !confirmPassword) {
      setError(t('auth.signupError'));
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError(t('auth.passwordTooShort'));
      setLoading(false);
      return;
    }

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    });
    setLoading(false);
    
    if (res.ok) {
      router.push(`/${locale}/profile`);
    } else {
      const data = await res.json();
      setError(data.error || t('auth.signupError'));
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <AgeGate />
      <NavBar />
      <main className="max-w-md mx-auto w-full p-6 pt-20">
        <div className="theme-card p-8 space-y-6">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-primary mb-2">{t('auth.signup')}</h1>
            <p className="text-secondary">{t('auth.signup')}</p>
          </div>
          
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-secondary mb-2">
                {t('auth.email')}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="theme-input w-full"
                placeholder="votre@email.com"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-secondary mb-2">
                {t('auth.password')}
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="theme-input w-full"
                placeholder="••••••••"
              />
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-secondary mb-2">
                {t('auth.confirmPassword')}
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                required
                className="theme-input w-full"
                placeholder="••••••••"
              />
            </div>
            
            {error && (
              <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 text-sm">{error}</p>
              </div>
            )}
            
            <button
              type="submit"
              disabled={loading}
              className="theme-button-primary w-full py-3 font-semibold"
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('common.loading')}
                </span>
              ) : (
                t('auth.signupButton')
              )}
            </button>
            
            <div className="text-center pt-4">
              <a href={`/${locale}/login`} className="text-primary hover:text-primary-dark transition-colors text-sm">
                {t('auth.alreadyHaveAccount')}
              </a>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}


