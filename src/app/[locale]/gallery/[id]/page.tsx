import Link from 'next/link';
import {AgeGate} from '@/components/AgeGate';
import {NavBar} from '@/components/NavBar';
import {FavoriteButton, FavoriteButtonCompact} from '@/components/FavoriteButton';
import {getItemById, getCatalogPage} from '@/data/catalog';
import {notFound} from 'next/navigation';
import {Comments} from '@/components/Comments';

export default async function GalleryPage({
  params
}: {
  params: Promise<{id: string; locale: string}>;
}) {
  const {id, locale} = await params;
  const item = await getItemById(id);
  
  if (!item) {
    return notFound();
  }

  // Get related items
  const {popular} = await getCatalogPage({page: 1});
  const related = popular.filter(i => i.id !== id).slice(0, 6);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <AgeGate />
      <NavBar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Gallery Header */}
        <div className="theme-card p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cover Image */}
            <div className="lg:col-span-1">
              <div className="relative group">
                <img
                  src={item.cover}
                  alt={item.title}
                  className="w-full aspect-[3/4] object-cover rounded-xl shadow-2xl group-hover:scale-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FavoriteButton 
                    itemId={item.id} 
                    className="w-full bg-white/90 hover:bg-white text-gray-800 shadow-lg"
                  />
                </div>
              </div>
            </div>

            {/* Gallery Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-primary mb-4">{item.title}</h1>
                <p className="text-secondary leading-relaxed">
                  Une galerie captivante présentant des illustrations époustouflantes et une narration captivante. 
                  Cette collection présente le meilleur du contenu avec des illustrations de haute qualité 
                  et des récits engageants qui vous divertiront pendant des heures.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-surface-elevated rounded-lg p-4 text-center hover-card transition-colors">
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-sm text-muted">Pages</div>
                </div>
                <div className="bg-surface-elevated rounded-lg p-4 text-center hover-card transition-colors">
                  <div className="text-2xl font-bold text-primary">4.8</div>
                  <div className="text-sm text-muted">Rating</div>
                </div>
                <div className="bg-surface-elevated rounded-lg p-4 text-center hover-card transition-colors">
                  <div className="text-2xl font-bold text-primary">1.2K</div>
                  <div className="text-sm text-muted">Views</div>
                </div>
                <div className="bg-surface-elevated rounded-lg p-4 text-center hover-card transition-colors">
                  <div className="text-2xl font-bold text-primary">89</div>
                  <div className="text-sm text-muted">Favorites</div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-semibold text-primary mb-3">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {item.tags && item.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/en/search?tags=${tag}`}
                      className="tag-primary px-3 py-1 rounded-full transition-all duration-300 text-sm"
                    >
                      #{tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-4">
                <button className="theme-button-primary px-6 py-3 rounded-xl">
                  📖 Lire maintenant
                </button>
                <FavoriteButton 
                  itemId={item.id} 
                  className="theme-button-secondary"
                />
                <button className="theme-button-secondary px-6 py-3 rounded-xl">
                  📥 Télécharger
                </button>
                <button className="theme-button-secondary px-6 py-3 rounded-xl">
                  📤 Partager
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gallery Preview */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Gallery Preview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array.from({length: 12}, (_, i) => (
              <div key={i} className="aspect-[3/4] bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-200 dark:hover:bg-gray-600 transition-all duration-300 hover:scale-105">
                <img
                  src={`https://picsum.photos/300/400?random=${i + 100}`}
                  alt={`Page ${i + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Related Galleries */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Related Galleries</h2>
            <Link 
              href="/en/popular" 
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors"
            >
              View all →
            </Link>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {related.map((relatedItem, index) => (
              <Link
                key={relatedItem.id}
                href={`/en/gallery/${relatedItem.id}`}
                className="group block bg-white dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="relative">
                  <img
                    src={relatedItem.cover}
                    alt={relatedItem.title}
                    className="aspect-[3/4] object-cover w-full group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                    {Math.floor(Math.random() * 100)}%
                  </div>
                  <div className="absolute top-2 left-2">
                    <FavoriteButtonCompact itemId={relatedItem.id} />
                  </div>
                </div>
                <div className="p-3">
                  <div className="text-sm text-gray-900 dark:text-white line-clamp-2 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {relatedItem.title}
                  </div>
                  <div className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
                    {relatedItem.tags && relatedItem.tags.slice(0, 2).join(', ')}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg border border-gray-200 dark:border-gray-700 rounded-2xl p-8">
          <Comments itemId={item.id} />
        </div>
      </main>
    </div>
  );
}


