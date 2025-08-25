import Link from 'next/link';
import {AgeGate} from '@/components/AgeGate';
import {NavBar} from '@/components/NavBar';
import {getCatalogPage, searchItems} from '@/data/catalog';
import {POPULAR_TAGS, getTagsByGroup} from '@/lib/tagMapping';
import {TagFilter} from '@/components/TagFilter';
import {ErrorState} from '@/components/ErrorState';
import {EmptyState} from '@/components/EmptyState';

export default async function SearchPage({
  params,
  searchParams
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{q?: string; tags?: string; artists?: string; page?: string}>;
}) {
  const {locale} = await params;
  const {q = '', tags = '', artists = '', page = '1'} = await searchParams;
  const pageNum = Number(page) || 1;

  let results: any[] = [];
  let totalPages = 1;

  try {
    if (q || tags || artists) {
      results = await searchItems({query: q, tags, artists, page: pageNum});
      totalPages = Math.ceil(results.length / 24);
    } else {
      // If no search query, show popular manga
      const catalogData = await getCatalogPage({ page: pageNum });
      results = catalogData.popular || [];
      totalPages = Math.ceil((catalogData.popularTotal || 0) / 24);
    }
  } catch (error) {
    console.error('Search error:', error);
    results = [];
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      <AgeGate />
      <NavBar />
      
      <main className="pt-16">
        {/* Search Header */}
        <section className="py-16 bg-gradient-to-r from-slate-800/80 via-purple-900/40 to-slate-800/80">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              🔍 Recherche de Manga
            </h1>
            {q && (
              <p className="text-xl text-gray-300">
                {results.length} résultats trouvés pour "{q}"
              </p>
            )}
          </div>
        </section>

        {/* Search Form */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-white mb-6 text-center">Filtres de Recherche</h2>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Recherche</label>
                  <input
                    type="text"
                    name="q"
                    defaultValue={q}
                    placeholder="Entrez des termes de recherche..."
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
                  <input
                    type="text"
                    name="tags"
                    defaultValue={tags}
                    placeholder="Filtrer par tags..."
                    className="w-full px-4 py-3 bg-slate-700/50 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
                  />
                </div>
                
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Rechercher
                  </button>
                  <Link
                    href={`/${locale}/search`}
                    className="px-6 py-3 bg-slate-700 text-white font-semibold rounded-lg hover:bg-slate-600 transition-colors border border-slate-600"
                  >
                    Effacer
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Results */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {results.length > 0 ? (
              <>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white">
                    Résultats ({results.length})
                  </h2>
                  <div className="text-gray-400">
                    Page {pageNum} sur {totalPages}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {results.map((manga) => (
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
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex justify-center mt-12">
                    <div className="flex gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                        <Link
                          key={pageNum}
                          href={`/${locale}/search?q=${q}&tags=${tags}&artists=${artists}&page=${pageNum}`}
                          className={`px-4 py-2 rounded-lg border transition-colors ${
                            pageNum === Number(page) 
                              ? 'bg-purple-600 text-white border-purple-600' 
                              : 'bg-slate-700 text-gray-300 border-slate-600 hover:bg-slate-600'
                          }`}
                        >
                          {pageNum}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {q ? 'Aucun résultat trouvé' : 'Commencez votre recherche'}
                </h3>
                <p className="text-gray-400 mb-8">
                  {q 
                    ? `Aucun manga trouvé pour "${q}"` 
                    : 'Utilisez les filtres ci-dessus pour trouver vos mangas préférés'
                  }
                </p>
                {!q && (
                  <Link
                    href={`/${locale}`}
                    className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                  >
                    Retour à l'accueil
                  </Link>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}


