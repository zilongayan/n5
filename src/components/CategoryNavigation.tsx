'use client';

import React from 'react';
import Link from 'next/link';

interface CategoryNavigationProps {
  locale: string;
}

export default function CategoryNavigation({ locale }: CategoryNavigationProps) {
  const categories = [
    { name: 'Action', icon: '⚔️', color: 'from-red-500 to-red-600', slug: 'action' },
    { name: 'Romance', icon: '💕', color: 'from-pink-500 to-pink-600', slug: 'romance' },
    { name: 'Fantasy', icon: '🐉', color: 'from-purple-500 to-purple-600', slug: 'fantasy' },
    { name: 'Comedy', icon: '😂', color: 'from-yellow-500 to-yellow-600', slug: 'comedy' },
    { name: 'Drama', icon: '🎭', color: 'from-blue-500 to-blue-600', slug: 'drama' },
    { name: 'Horror', icon: '👻', color: 'from-gray-500 to-gray-600', slug: 'horror' },
  ];

  return (
    <section className="py-16 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          🏷️ Parcourir par Catégorie
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={`/${locale}/tags/${category.slug}`}
              className="group block text-center p-6 bg-slate-800/80 border border-slate-700 rounded-lg hover:border-purple-500/50 transition-all duration-300 hover:scale-105"
            >
              <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300`}>
                {category.icon}
              </div>
              <h3 className="text-white font-semibold group-hover:text-purple-400 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
