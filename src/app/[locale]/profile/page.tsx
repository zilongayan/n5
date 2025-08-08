"use client";

import {useEffect} from 'react';
import {useRouter} from 'next/navigation';
import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';
import {useTranslations} from '@/hooks/useTranslations';
import {useAuth} from '@/hooks/useAuth';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const {t, locale} = useTranslations();
  const {user, isAuthenticated, loading} = useAuth();

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.push(`/${locale}/login`);
    }
  }, [isAuthenticated, loading, router, locale]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
        <AgeGate />
        <NavBar />
        <main className="max-w-6xl mx-auto w-full p-6 pt-20">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-secondary">Chargement...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <AgeGate />
      <NavBar />
      <main className="max-w-6xl mx-auto w-full p-6 pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">👤 Mon Profil</h1>
          <p className="text-secondary">Gérez votre compte et vos préférences</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="theme-card p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Informations</h2>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-secondary">Email</label>
                <p className="text-primary font-medium">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm text-secondary">Membre depuis</label>
                <p className="text-primary font-medium">Aujourd'hui</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="theme-card p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Actions rapides</h2>
            <div className="space-y-3">
              <Link
                href={`/${locale}/favorites`}
                className="block w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white text-center rounded-lg transition-colors"
              >
                ❤️ Mes Favoris
              </Link>
              <Link
                href={`/${locale}/collections`}
                className="block w-full px-4 py-3 bg-purple-600 hover:bg-purple-700 text-white text-center rounded-lg transition-colors"
              >
                📚 Mes Collections
              </Link>
            </div>
          </div>

          {/* Settings */}
          <div className="theme-card p-6">
            <h2 className="text-xl font-semibold text-primary mb-4">Paramètres</h2>
            <div className="space-y-3">
              <button className="block w-full px-4 py-3 bg-gray-600 hover:bg-gray-700 text-white text-center rounded-lg transition-colors">
                ⚙️ Paramètres
              </button>
              <button className="block w-full px-4 py-3 bg-red-600 hover:bg-red-700 text-white text-center rounded-lg transition-colors">
                🗑️ Supprimer le compte
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
