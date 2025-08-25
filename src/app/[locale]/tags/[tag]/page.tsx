import React from 'react';
import Link from 'next/link';
import { getCatalogPage } from '@/data/catalog';

interface TagPageProps {
  params: Promise<{ locale: string; tag: string }>;
}

export default async function TagPage({ params }: TagPageProps) {
  const { locale, tag } = await params;
  
  // Decode the tag from URL
  const decodedTag = decodeURIComponent(tag);
  
  let mangas: any[] = [];
  
  try {
    // Fetch manga and filter by tag (simplified for now)
    const catalogData = await getCatalogPage({ page: 1 });
    mangas = catalogData.popular || [];
    
    // Filter by tag (this is a simplified filter - in real app you'd use API)
    if (decodedTag !== 'all') {
      mangas = mangas.filter(manga => 
        manga.tags && manga.tags.some((t: string) => 
          t.toLowerCase().includes(decodedTag.toLowerCase())
        )
      );
    }
  } catch (error) {
    console.error('Failed to load tag data:', error);
    // Fallback data
    mangas = [
      { 
        id: '1', 
        title: 'Solo Leveling', 
        description: 'Un chasseur de rang E devient le plus puissant...', 
        tags: ['Action', 'Fantasy', 'Monsters'],
        cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop&crop=center'
      },
      { 
        id: '2', 
        title: 'One Piece', 
        description: 'L\'aventure de Luffy et son équipage...', 
        tags: ['Action', 'Adventure', 'Comedy'],
        cover: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=center'
      },
    ];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <main className="pt-16">
        {/* Header */}
        <section className="py-16 bg-gradient-to-r from-slate-800/80 via-purple-900/40 to-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Tag: <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {decodedTag.charAt(0).toUpperCase() + decodedTag.slice(1)}
              </span>
            </h1>
            <p className="text-xl text-gray-300">
              Découvrez tous les mangas du tag "{decodedTag}"
            </p>
          </div>
        </section>

        {/* Manga Grid */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {mangas.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {mangas.map((manga) => (
                  <div key={manga.id} className="bg-slate-800/80 border border-slate-700 rounded-lg overflow-hidden hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                    <Link href={`/${locale}/gallery/${manga.id}`}>
                      {/* Cover Image */}
                      <div className="relative">
                        <img 
                          src={manga.cover} 
                          alt={manga.title} 
                          className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4">
                        <h3 className="text-base font-semibold text-white mb-2 line-clamp-2 hover:text-purple-400 transition-colors">
                          {manga.title}
                        </h3>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1 mb-2">
                          {manga.tags && manga.tags.slice(0, 2).map((tag: string, tagIndex: number) => (
                            <span 
                              key={tagIndex}
                              className="px-2 py-1 bg-slate-700 text-gray-300 text-xs rounded border border-slate-600"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-400 text-sm line-clamp-2">
                          {manga.description}
                        </p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">😔</div>
                <h3 className="text-2xl font-bold text-white mb-4">Aucun manga trouvé</h3>
                <p className="text-gray-400 mb-8">
                  Aucun manga trouvé pour le tag "{decodedTag}"
                </p>
                <Link
                  href={`/${locale}`}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Retour à l'accueil
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
