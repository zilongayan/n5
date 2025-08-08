import Link from 'next/link';
import {AgeGate} from '@/components/AgeGate';
import {NavBar} from '@/components/NavBar';
import {getCatalogPage, searchItems} from '@/data/catalog';

export default async function SearchPage({
  params,
  searchParams
}: {
  params: Promise<{locale: string}>;
  searchParams: Promise<{q?: string; tags?: string; artists?: string; page?: string}>;
}) {
  const {q = '', tags = '', artists = '', page = '1'} = await searchParams;
  const pageNum = Number(page) || 1;

  const results = searchItems({query: q, tags, artists, page: pageNum});
  const totalPages = Math.ceil(results.length / 24);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <AgeGate />
      <NavBar />
      
      <main className="max-w-6xl mx-auto w-full p-6 space-y-8">
        {/* Search Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-white">Search Results</h1>
          {q && (
            <p className="text-gray-300">
              Found {results.length} results for "{q}"
            </p>
          )}
        </div>

        {/* Advanced Filters */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-white mb-4">Advanced Filters</h2>
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search Query</label>
              <input
                type="text"
                name="q"
                defaultValue={q}
                placeholder="Enter search terms..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Tags</label>
              <input
                type="text"
                name="tags"
                defaultValue={tags}
                placeholder="Filter by tags..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Artists</label>
              <input
                type="text"
                name="artists"
                defaultValue={artists}
                placeholder="Filter by artists..."
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="md:col-span-3 flex gap-4">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
              >
                Search
              </button>
              <Link
                href="/en/search"
                className="px-6 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Clear
              </Link>
            </div>
          </form>
        </div>

        {/* Quick Filters */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-white">Popular Tags</h3>
          <div className="flex flex-wrap gap-2">
            {['action', 'romance', 'comedy', 'drama', 'fantasy', 'sci-fi', 'horror', 'slice-of-life'].map((tag) => (
              <Link
                key={tag}
                href={`/en/search?tags=${tag}`}
                className="px-3 py-1 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all duration-300 text-sm"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        {/* Results */}
        {results.length > 0 ? (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Results ({results.length})</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span>Sort by:</span>
                <select className="bg-white/10 border border-white/20 rounded px-2 py-1 text-white">
                  <option>Relevance</option>
                  <option>Date</option>
                  <option>Popularity</option>
                  <option>Title</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {results.map((item, index) => (
                <Link
                  key={item.id}
                  href={`/en/gallery/${item.id}`}
                  className="group block bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                  style={{animationDelay: `${index * 50}ms`}}
                >
                  <div className="relative">
                    <img
                      src={item.cover}
                      alt={item.title}
                      className="aspect-[3/4] object-cover w-full group-hover:brightness-110 transition-all duration-300"
                    />
                    <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                      {Math.floor(Math.random() * 100)}%
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-sm text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
                      {item.title}
                    </div>
                    <div className="mt-1 text-xs text-gray-400 line-clamp-1">
                      {item.tags.slice(0, 2).join(', ')}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center space-x-2">
                {Array.from({length: totalPages}, (_, i) => i + 1).map((pageNum) => (
                  <Link
                    key={pageNum}
                    href={`/en/search?q=${q}&tags=${tags}&artists=${artists}&page=${pageNum}`}
                    className={`px-3 py-2 rounded ${
                      pageNum === pageNum 
                        ? 'bg-purple-600 text-white' 
                        : 'bg-white/10 text-white hover:bg-white/20'
                    } transition-all duration-300`}
                  >
                    {pageNum}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-white mb-2">No results found</h3>
            <p className="text-gray-400 mb-6">Try adjusting your search terms or filters</p>
            <Link 
              href="/en" 
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Browse All
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}


