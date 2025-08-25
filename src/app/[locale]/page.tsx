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

      {/* Popular New Titles - Modern Grid Layout */}
      <section className="py-20 bg-gradient-to-br from-slate-900/50 via-purple-900/20 to-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              🔥 <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 bg-clip-text text-transparent">
                Popular New Titles
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Les mangas les plus populaires du moment, mis à jour en temps réel
            </p>
          </div>
          
          {/* Featured Hero Section */}
          <div className="mb-16">
            <div className="relative group">
              <a href={`/${locale}/gallery/${featuredManga?.id}`} className="block">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/90 to-slate-700/90 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/60 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/20">
                  
                  {/* Background Pattern */}
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500 animate-pulse"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.4),transparent_50%)]"></div>
                  </div>

                  <div className="relative z-10 flex flex-col lg:flex-row min-h-[500px]">
                    {/* Image Section with Enhanced Effects */}
                    <div className="lg:w-1/2 relative overflow-hidden">
                      <img 
                        src={featuredManga?.cover} 
                        alt={featuredManga?.title} 
                        className="w-full h-full object-cover min-h-[350px] lg:min-h-[500px] transition-transform duration-1000 group-hover:scale-110"
                        loading="lazy"
                      />
                      
                      {/* Multiple Overlay Layers */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-transparent to-transparent"></div>
                      
                      {/* Floating Stats Cards */}
                      <div className="absolute top-6 left-6 space-y-3">
                        <div className="bg-black/70 backdrop-blur-md rounded-2xl px-4 py-3 border border-purple-500/30">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                            <span className="text-white text-sm font-semibold">En cours</span>
                          </div>
                        </div>
                        
                        <div className="bg-gradient-to-r from-yellow-500/90 to-orange-500/90 backdrop-blur-md rounded-2xl px-4 py-3 border border-yellow-400/30">
                          <div className="flex items-center gap-2">
                            <span className="text-black text-sm font-bold">⭐ 4.9</span>
                          </div>
                        </div>
                      </div>

                      {/* Chapter & Views Info */}
                      <div className="absolute bottom-6 left-6 space-y-3">
                        <div className="bg-black/70 backdrop-blur-md rounded-2xl px-4 py-3 border border-purple-500/30">
                          <div className="flex items-center gap-2 text-white">
                            <span className="text-sm font-medium">📚 156 chapitres</span>
                          </div>
                        </div>
                        
                        <div className="bg-black/70 backdrop-blur-md rounded-2xl px-4 py-3 border border-purple-500/30">
                          <div className="flex items-center gap-2 text-white">
                            <span className="text-sm font-medium">👁️ 1.2M vues</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Content Section */}
                    <div className="lg:w-1/2 p-10 lg:p-12 flex flex-col justify-center">
                      <div className="mb-8">
                        {/* Rank Badge */}
                        <div className="inline-flex items-center gap-3 mb-6">
                          <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-bold text-lg px-4 py-2 rounded-full flex items-center gap-2 shadow-lg">
                            <span className="text-2xl">🔥</span>
                            NO. {featuredIndex + 1}
                          </div>
                          <div className="bg-purple-500/20 text-purple-300 text-sm px-3 py-2 rounded-full border border-purple-500/30 backdrop-blur-sm">
                            POPULAIRE
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-700">
                          {featuredManga?.title}
                        </h3>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-3 mb-6">
                          {featuredManga?.tags?.slice(0, 4).map((tag: string, tagIndex: number) => (
                            <span 
                              key={tagIndex}
                              className="px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-sm font-medium rounded-full border border-purple-500/40 hover:border-purple-400/60 hover:bg-purple-500/30 transition-all duration-300 backdrop-blur-sm"
                            >
                              {tag.toUpperCase()}
                            </span>
                          ))}
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-300 text-lg leading-relaxed line-clamp-4 group-hover:text-gray-200 transition-colors duration-500">
                          {featuredManga?.description || 'Description non disponible'}
                        </p>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="space-y-4">
                        {/* Main CTA */}
                        <div className="inline-flex items-center justify-center w-full px-8 py-4 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 text-white font-bold text-lg rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-purple-800 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 group-hover:shadow-purple-500/50">
                          <span className="mr-3">📖</span>
                          Lire le Manga
                          <span className="ml-3 transform group-hover:translate-x-2 transition-transform duration-500">→</span>
                        </div>

                        {/* Secondary Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <button className="p-3 rounded-xl bg-slate-700/50 hover:bg-red-500/20 border border-slate-600/50 hover:border-red-500/50 transition-all duration-300 group-hover:bg-slate-600/50 backdrop-blur-sm">
                              <span className="text-2xl">❤️</span>
                            </button>
                            
                            <button className="p-3 rounded-xl bg-slate-700/50 hover:bg-blue-500/20 border border-slate-600/50 hover:border-blue-500/50 transition-all duration-300 group-hover:bg-slate-600/50 backdrop-blur-sm">
                              <span className="text-2xl">🔖</span>
                            </button>
                            
                            <button className="p-3 rounded-xl bg-slate-700/50 hover:bg-green-500/20 border border-slate-600/50 hover:border-green-500/50 transition-all duration-300 group-hover:bg-slate-600/50 backdrop-blur-sm">
                              <span className="text-2xl">📤</span>
                            </button>
                          </div>

                          {/* Quick Stats */}
                          <div className="flex items-center gap-6 text-sm text-gray-400">
                            <div className="flex items-center gap-2">
                              <span>👁️ 1.2M</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span>⭐ 4.9</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Navigation Controls */}
                  <div className="absolute top-6 right-6">
                    <div className="flex gap-3">
                      <button className="w-12 h-12 bg-slate-800/80 text-white rounded-2xl flex items-center justify-center hover:bg-purple-600 hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-slate-700/50">
                        ←
                      </button>
                      <button className="w-12 h-12 bg-slate-800/80 text-white rounded-2xl flex items-center justify-center hover:bg-purple-600 hover:scale-110 transition-all duration-300 backdrop-blur-sm border border-slate-700/50">
                        →
                      </button>
                    </div>
                  </div>

                  {/* Hover Effects */}
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-3xl" />
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000 rounded-3xl blur-xl" />
                </div>
              </a>
            </div>
          </div>
          
          {/* Popular Grid Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sidebarMangas.slice(0, 12).map((manga, index) => (
              <div key={manga.id} className="group">
                <a href={`/${locale}/gallery/${manga.id}`} className="block">
                  <div className="relative bg-gradient-to-br from-slate-800/70 to-slate-700/70 backdrop-blur-sm rounded-2xl p-5 border border-slate-700/50 hover:border-purple-500/40 transition-all duration-500 hover:bg-slate-700/70 hover:shadow-xl hover:shadow-purple-500/10 transform hover:-translate-y-2 overflow-hidden">
                    
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5 rounded-2xl">
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-blue-500"></div>
                    </div>

                    <div className="relative z-10 space-y-4">
                      {/* Cover Image */}
                      <div className="relative">
                        <img 
                          src={manga.cover} 
                          alt={manga.title} 
                          className="w-full h-48 object-cover rounded-xl shadow-lg group-hover:shadow-purple-500/20 transition-all duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        
                        {/* Rank Badge */}
                        <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg">
                          #{index + 2}
                        </div>

                        {/* Rating Overlay */}
                        <div className="absolute bottom-2 left-2 bg-black/70 backdrop-blur-sm rounded-lg px-2 py-1">
                          <div className="flex items-center gap-1">
                            <span className="text-yellow-400 text-xs">⭐</span>
                            <span className="text-white text-xs font-semibold">4.{Math.floor(Math.random() * 5) + 5}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="space-y-3">
                        {/* Title */}
                        <h4 className="text-white font-bold text-lg leading-tight group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-500 line-clamp-2">
                          {manga.title}
                        </h4>
                        
                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {manga.tags?.slice(0, 2).map((tag, tagIndex) => (
                            <span 
                              key={tagIndex} 
                              className="px-2.5 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 text-xs font-medium rounded-full border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300"
                            >
                              {tag.toUpperCase()}
                            </span>
                          ))}
                        </div>
                        
                        {/* Description */}
                        <p className="text-gray-400 text-sm leading-relaxed line-clamp-2 group-hover:text-gray-300 transition-colors duration-300">
                          {manga.description || 'Description non disponible'}
                        </p>
                        
                        {/* Stats Row */}
                        <div className="flex items-center justify-between text-xs text-gray-400 pt-2 border-t border-slate-600/30">
                          <div className="flex items-center gap-1">
                            <span>👁️ {(Math.random() * 500000 + 100000).toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <span>📚 {Math.floor(Math.random() * 100) + 20} ch.</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Hover Effects */}
                    <div className="absolute inset-0 bg-gradient-to-t from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                  </div>
                </a>
              </div>
            ))}
          </div>
          
          {/* View All Button */}
          <div className="text-center mt-12">
            <a 
              href={`/${locale}/popular`}
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold text-lg rounded-2xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/25"
            >
              Voir Tous les Mangas Populaires
              <span className="ml-2">→</span>
            </a>
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