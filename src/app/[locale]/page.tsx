import { getTranslation } from '@/i18n/translations';
import { Locale } from '@/i18n/translations';
import { getCatalogPage } from '@/data/catalog';
import SearchBar from '@/components/SearchBar';
import PopularCarousel from '@/components/PopularCarousel';
import CategoryNavigation from '@/components/CategoryNavigation';

// Fallback data for when API fails
const fallbackData = {
  popular: [
    {
      id: '1',
      title: 'Kyori-kan ga Bagutteru Downer Gyaru-chan',
      description: 'Une histoire de slice of life avec une gyaru downer',
      tags: ['SLICE OF LIFE'],
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      type: 'manga',
      author: 'Yaki Tomato',
      artist: 'Yaki Tomato',
      rating: 4.5,
      follows: 12500
    },
    {
      id: '2',
      title: 'The Forbidden Lust of a Frigid Girl',
      description: 'Un manga romantique avec des thèmes matures',
      tags: ['ROMANCE', 'MATURE'],
      cover: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop',
      type: 'manga',
      author: 'Unknown Author',
      artist: 'Unknown Artist',
      rating: 4.2,
      follows: 8900
    },
    {
      id: '3',
      title: 'Ichaicha Suru to Okane ga Waichau 2-ri no Hanashi',
      description: 'Une histoire romantique et comique',
      tags: ['ROMANCE', 'COMEDY'],
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      type: 'manga',
      author: 'Romance Author',
      artist: 'Romance Artist',
      rating: 4.0,
      follows: 6700
    }
  ],
  selfPublished: [
    {
      id: '4',
      title: 'Delirium',
      description: 'Un manga auto-édité avec un style unique',
      cover: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop',
      language: 'EN'
    },
    {
      id: '5',
      title: 'Doomsia\'s Healing Sessions',
      description: 'Sessions de guérison mystiques',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      language: 'EN'
    },
    {
      id: '6',
      title: 'The Embodiment of Sins',
      description: 'L\'incarnation des péchés',
      cover: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop',
      language: 'EN'
    },
    {
      id: '7',
      title: 'Time-stop Ugly Old Man',
      description: 'Un vieil homme qui peut arrêter le temps',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      language: 'EN'
    },
    {
      id: '8',
      title: 'Summer Autumn Night',
      description: 'Une nuit entre été et automne',
      cover: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop',
      language: 'EN'
    }
  ],
  featured: [
    {
      id: '9',
      title: 'Masaka jibun ga joshi ni naru nante',
      description: 'Et si je devenais une fille ?',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      language: 'JP'
    },
    {
      id: '10',
      title: 'Kaoru Hana wa Rin to Saku',
      description: 'Les fleurs de Kaoru fleurissent avec Rin',
      cover: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop',
      language: 'JP'
    },
    {
      id: '11',
      title: 'Reborn as a Vending Machine, I Now Wander the Dungeon',
      description: 'Réincarné en distributeur automatique',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      language: 'JP'
    }
  ],
  recentlyAdded: [
    {
      id: '12',
      title: 'Kuuhou no Anata',
      description: 'Vous dans le vide',
      cover: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop',
      language: 'JP'
    },
    {
      id: '13',
      title: 'Bishoujo da yo! Ikkyuu-chan!',
      description: 'C\'est une belle fille, Ikkyuu-chan !',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      language: 'JP'
    },
    {
      id: '14',
      title: 'UMA',
      description: 'Créature mystérieuse',
      cover: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop',
      language: 'JP'
    },
    {
      id: '15',
      title: 'Meet up at somewhere in...',
      description: 'Rendez-vous quelque part...',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      language: 'EN'
    },
    {
      id: '16',
      title: 'Memories',
      description: 'Souvenirs',
      cover: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop',
      language: 'EN'
    }
  ],
  latestUpdates: [
    {
      id: '17',
      title: 'Vol. 2 Ch. 18 – Liệu Tuổ...',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      language: 'VN',
      time: '59 seconds ago',
      chapterCount: 9
    },
    {
      id: '18',
      title: 'Ch. 29',
      cover: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=400&h=600&fit=crop',
      language: 'VN',
      time: '1 hour ago',
      chapterCount: 4
    },
    {
      id: '19',
      title: 'Ch. 21',
      cover: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop',
      language: 'VN',
      time: '2 hours ago',
      chapterCount: 21
    }
  ]
};

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  let catalogData;
  
  try {
    catalogData = await getCatalogPage({ page: 1 });
    console.log('Catalog data loaded:', { 
      recentCount: catalogData?.recent?.length || 0, 
      popularCount: catalogData?.popular?.length || 0 
    });
  } catch (error) {
    console.error('Failed to load catalog data:', error);
    catalogData = null;
  }

  // Use real API data when available, fallback to demo data only when API fails
  const popularMangas = catalogData?.popular || fallbackData.popular;
  const recentMangas = catalogData?.recent || fallbackData.latestUpdates;
  const featuredIndex = Math.floor(Math.random() * (popularMangas?.length || 1));
  const featuredManga = popularMangas[featuredIndex];
  const sidebarMangas = popularMangas.filter((_, i) => i !== featuredIndex);
  
  return (
    <div className="min-h-screen bg-[#0B0C0F]">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 bg-gradient-to-br from-[#151821]/80 via-[#151821]/60 to-[#151821]/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              MangaView
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            {getTranslation(locale as Locale, 'home.hero.subtitle')}
          </p>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-8">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-1">550K+</div>
              <div className="text-gray-400 text-sm">{getTranslation(locale as Locale, 'home.hero.stats.titles')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-pink-400 mb-1">∞</div>
              <div className="text-gray-400 text-sm">{getTranslation(locale as Locale, 'home.hero.stats.chapters')}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400 mb-1">24/7</div>
              <div className="text-gray-400 text-sm">{getTranslation(locale as Locale, 'home.hero.stats.available')}</div>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <SearchBar placeholder={getTranslation(locale as Locale, 'home.hero.search.placeholder')} />
          </div>
        </div>
      </section>

      {/* Popular New Titles - Featured Card + Horizontal Scroll */}
      <section className="py-16 bg-gradient-to-r from-slate-800/50 via-purple-900/20 to-slate-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🔥 <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                Popular New Titles
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Les mangas les plus populaires du moment, mis à jour en temps réel
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Featured Large Card */}
            <div className="lg:w-2/3">
              <a href={`/${locale}/gallery/${featuredManga?.id}`} className="block">
                <div className="relative bg-gradient-to-br from-slate-800/80 to-slate-700/80 backdrop-blur-sm border border-purple-500/20 rounded-2xl overflow-hidden hover:border-purple-400/50 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row min-h-[400px]">
                    <div className="lg:w-1/2 relative">
                      <img 
                        src={featuredManga?.cover} 
                        alt={featuredManga?.title} 
                        className="w-full h-full object-cover min-h-[300px] lg:min-h-[400px]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    </div>
                    
                    <div className="lg:w-1/2 p-8 flex flex-col justify-center">
                      <div className="mb-6">
                        <h3 className="text-3xl font-bold text-white mb-4 line-clamp-2">
                          {featuredManga?.title}
                        </h3>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          {featuredManga?.tags?.slice(0, 3).map((tag: string, tagIndex: number) => (
                            <span 
                              key={tagIndex}
                              className="px-3 py-1 bg-purple-500/20 text-purple-300 text-sm rounded-full border border-purple-500/30"
                            >
                              {tag.toUpperCase()}
                            </span>
                          ))}
                        </div>
                        
                        <p className="text-gray-400 text-lg line-clamp-3">
                          {featuredManga?.description || 'Description non disponible'}
                        </p>
                      </div>
                      
                      <div className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25">
                        Lire le Manga
                        <span className="ml-2">→</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* NO. 1 Badge and Navigation */}
                  <div className="absolute top-4 right-4 flex items-center gap-2">
                    <span className="text-white text-sm font-bold">NO. 1</span>
                    <div className="flex gap-1">
                      <button className="w-8 h-8 bg-slate-800/80 text-white rounded flex items-center justify-center hover:bg-slate-700 transition-colors">
                        ←
                      </button>
                      <button className="w-8 h-8 bg-slate-800/80 text-white rounded flex items-center justify-center hover:bg-slate-700 transition-colors">
                        →
                      </button>
                    </div>
                  </div>
                </div>
              </a>
            </div>
            
            {/* Horizontal Scroll Cards */}
            <div className="lg:w-1/3">
              <div className="space-y-4">
                {sidebarMangas.map((manga) => (
                  <a key={manga.id} href={`/${locale}/gallery/${manga.id}`} className="block">
                    <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-slate-700/60">
                      <div className="flex gap-4">
                        <img 
                          src={manga.cover} 
                          alt={manga.title} 
                          className="w-20 h-24 object-cover rounded-lg"
                          loading="lazy"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-white font-semibold text-sm line-clamp-2 mb-2">{manga.title}</h4>
                          <div className="flex flex-wrap gap-1 mb-2">
                            {manga.tags?.slice(0, 2).map((tag, tagIndex) => (
                              <span key={tagIndex} className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30">
                                {tag.toUpperCase()}
                              </span>
                            ))}
                          </div>
                          <p className="text-gray-400 text-xs line-clamp-2">{manga.description || 'Description non disponible'}</p>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Updates - Grid Layout */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">Latest Updates</h2>
            <a href={`/${locale}/recent`} className="text-purple-400 hover:text-purple-300 transition-colors">
              View All →
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentMangas.slice(0, 8).map((manga) => (
              <a key={manga.id} href={`/${locale}/gallery/${manga.id}`} className="block">
                <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-slate-700/60">
                  <div className="relative mb-3">
                    <img 
                      src={manga.cover} 
                      alt={manga.title} 
                      className="w-full h-32 object-cover rounded-lg"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 flex items-center gap-2">
                      <span className="px-2 py-1 bg-slate-900/80 text-white text-xs rounded">
                        {'tags' in manga && manga.tags?.[0] ? manga.tags[0].substring(0, 2) : '--'}
                      </span>
                    </div>
                  </div>
                  <h4 className="text-white font-semibold text-sm line-clamp-2 mb-2">{manga.title}</h4>
                  <p className="text-gray-400 text-xs line-clamp-2">
                    {'description' in manga ? (manga.description || 'Description non disponible') : 'Description non disponible'}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Staff Picks - Horizontal Carousel */}
      <section className="py-16 bg-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Staff Picks</h2>
          
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {popularMangas.slice(4, 8).map((manga) => (
              <a key={manga.id} href={`/${locale}/gallery/${manga.id}`} className="flex-shrink-0 w-48">
                <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-slate-700/60">
                  <img 
                    src={manga.cover} 
                    alt={manga.title} 
                    className="w-full h-48 object-cover rounded-lg mb-3"
                    loading="lazy"
                  />
                  <h4 className="text-white font-semibold text-sm line-clamp-2">{manga.title}</h4>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Self-Published - Horizontal Carousel */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Self-Published</h2>
          
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {popularMangas.slice(8, 13).map((manga) => (
              <a key={manga.id} href={`/${locale}/gallery/${manga.id}`} className="flex-shrink-0 w-48">
                <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-slate-700/60">
                  <img 
                    src={manga.cover} 
                    alt={manga.title} 
                    className="w-full h-48 object-cover rounded-lg mb-3"
                    loading="lazy"
                  />
                  <h4 className="text-white font-semibold text-sm line-clamp-2 mb-2">{manga.title}</h4>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-xs line-clamp-2">{manga.description || 'Description non disponible'}</p>
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded border border-blue-500/30">
                      EN
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Featured / Seasonal: Summer 2025 - Horizontal Carousel */}
      <section className="py-16 bg-slate-800/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">
            Featured / Seasonal: <span className="text-orange-400">Summer 2025</span>
          </h2>
          
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {popularMangas.slice(13, 18).map((manga) => (
              <a key={manga.id} href={`/${locale}/gallery/${manga.id}`} className="flex-shrink-0 w-48">
                <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-slate-700/60">
                  <img 
                    src={manga.cover} 
                    alt={manga.title} 
                    className="w-full h-48 object-cover rounded-lg mb-3"
                    loading="lazy"
                  />
                  <h4 className="text-white font-semibold text-sm line-clamp-2 mb-2">{manga.title}</h4>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-xs line-clamp-2">{manga.description || 'Description non disponible'}</p>
                    <span className="px-2 py-1 bg-green-500/20 text-green-300 text-xs rounded border border-green-500/30">
                      JP
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Recently Added - Horizontal Carousel */}
      <section className="py-16 bg-slate-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Recently Added</h2>
          
          <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
            {popularMangas.slice(18, 23).map((manga) => (
              <a key={manga.id} href={`/${locale}/gallery/${manga.id}`} className="flex-shrink-0 w-48">
                <div className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:bg-slate-700/60">
                  <img 
                    src={manga.cover} 
                    alt={manga.title} 
                    className="w-full h-48 object-cover rounded-lg mb-3"
                    loading="lazy"
                  />
                  <h4 className="text-white font-semibold text-sm line-clamp-2 mb-2">{manga.title}</h4>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-400 text-xs line-clamp-2">{manga.description || 'Description non disponible'}</p>
                    <span className="px-2 py-1 bg-purple-500/20 text-purple-300 text-xs rounded border border-purple-500/30">
                      JP
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Category Navigation */}
      <CategoryNavigation locale={locale} />
    </div>
  );
}