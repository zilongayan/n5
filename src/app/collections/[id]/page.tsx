import Link from 'next/link';
import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';
import {readSession} from '@/lib/auth';
import {db} from '@/lib/db';
import {getItemById} from '@/data/catalog';
import {notFound} from 'next/navigation';
import {CollectionActions} from '@/components/CollectionActions';

export default async function CollectionPage({
  params
}: {
  params: Promise<{id: string}>;
}) {
  const {id} = await params;
  const session = await readSession();
  
  if (!session) {
    return notFound();
  }

  const collection = await db.collection.findFirst({
    where: {
      id,
      userId: session.userId
    },
    include: {
      items: {
        orderBy: {addedAt: 'desc'}
      },
      _count: {
        select: {items: true}
      }
    }
  });

  if (!collection) {
    return notFound();
  }

  // Get actual item data for each collection item
  const items = await Promise.all(
    collection.items.map(async (item) => {
      const itemData = getItemById(item.itemId);
      return itemData ? { ...itemData, addedAt: item.addedAt } : null;
    })
  );
  const validItems = items.filter(Boolean);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <AgeGate />
      <NavBar />
      
      <main className="max-w-6xl mx-auto w-full p-6 space-y-8">
        {/* Collection Header */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-white mb-2">{collection.name}</h1>
              {collection.description && (
                <p className="text-gray-300 mb-4">{collection.description}</p>
              )}
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <span>{collection._count.items} items</span>
                <span>Created {new Date(collection.createdAt).toLocaleDateString()}</span>
                <span className={`px-2 py-1 rounded-full ${
                  collection.isPublic 
                    ? 'bg-green-500/20 text-green-300' 
                    : 'bg-gray-500/20 text-gray-300'
                }`}>
                  {collection.isPublic ? 'Public' : 'Private'}
                </span>
              </div>
            </div>
            <CollectionActions collection={collection} />
          </div>
        </div>

        {/* Collection Items */}
        {validItems.length === 0 ? (
          <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h3 className="text-xl font-semibold text-white mb-2">Collection is empty</h3>
            <p className="text-gray-400 mb-6">Start adding galleries to your collection!</p>
            <Link 
              href="/en" 
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Browse Gallery
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-white">Items ({validItems.length})</h2>
              <Link 
                href="/en" 
                className="px-4 py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300 border border-white/20"
              >
                Add More
              </Link>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {validItems.map((item, index) => (
                <div key={item.id} className="group relative">
                  <Link
                    href={`/en/gallery/${item.id}`}
                    className="block bg-white/5 rounded-xl overflow-hidden hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-up"
                    style={{animationDelay: `${index * 50}ms`}}
                  >
                    <div className="relative">
                      <img
                        src={item.cover}
                        alt={item.title}
                        className="aspect-[3/4] object-cover w-full group-hover:brightness-110 transition-all duration-300"
                      />
                      <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
                        {new Date(item.addedAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="p-3">
                      <div className="text-sm text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
                        {item.title}
                      </div>
                      <div className="mt-1 text-xs text-gray-400 line-clamp-1">
                        {item.tags && item.tags.slice(0, 2).join(', ')}
                      </div>
                    </div>
                  </Link>
                  
                  {/* Remove from collection button */}
                  <button
                    onClick={async () => {
                      try {
                        const res = await fetch(`/api/collections/${id}/items`, {
                          method: 'DELETE',
                          headers: {'Content-Type': 'application/json'},
                          body: JSON.stringify({itemId: item.id})
                        });
                        if (res.ok) {
                          window.location.reload();
                        }
                      } catch (error) {
                        console.error('Failed to remove item');
                      }
                    }}
                    className="absolute top-2 left-2 w-6 h-6 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-xs hover:bg-red-700"
                    title="Remove from collection"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Collection Stats */}
        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Collection Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{validItems.length}</div>
              <div className="text-sm text-gray-400">Total Items</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {Math.floor((Date.now() - new Date(collection.createdAt).getTime()) / (1000 * 60 * 60 * 24))}
              </div>
              <div className="text-sm text-gray-400">Days Old</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {validItems.length > 0 ? Math.floor(validItems.length / 7) : 0}
              </div>
              <div className="text-sm text-gray-400">Avg per Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-white">
                {collection.isPublic ? 'Public' : 'Private'}
              </div>
              <div className="text-sm text-gray-400">Visibility</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
