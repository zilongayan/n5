import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';
import {readSession} from '@/lib/auth';
import {db} from '@/lib/db';
import {getItemById} from '@/data/catalog';
import {notFound} from 'next/navigation';
import Link from 'next/link';

export default async function FavoritesPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const session = await readSession();
  if (!session || !session.userId) {
    return notFound();
  }
  
  const favorites = await db.favorite.findMany({
    where: {userId: session.userId}
  });
  
  // Get item data for each favorite
  const favoritesWithItems = await Promise.all(
    favorites.map(async (favorite) => {
      const item = await getItemById(favorite.itemId);
      return item ? { ...favorite, item } : null;
    })
  );
  
  const validFavorites = favoritesWithItems.filter(Boolean);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <AgeGate />
      <NavBar />
      <main className="max-w-6xl mx-auto w-full p-6 pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">❤️ Mes Favoris</h1>
          <p className="text-secondary">Vos galeries préférées</p>
        </div>
        
        {validFavorites.length === 0 ? (
          <div className="theme-card p-8 text-center">
            <div className="text-6xl mb-4">💔</div>
            <h2 className="text-2xl font-bold text-primary mb-2">Aucun favori</h2>
            <p className="text-secondary mb-6">Vous n'avez pas encore ajouté de galeries à vos favoris</p>
            <Link 
              href={`/${locale}`}
              className="theme-button-primary px-6 py-3 rounded-xl font-medium"
            >
              Découvrir des galeries
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {validFavorites.map((favorite) => (
              <Link
                key={favorite.id}
                href={`/${locale}/gallery/${favorite.item.id}`}
                className="group theme-card overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <div className="relative">
                  <img
                    src={favorite.item.cover}
                    alt={favorite.item.title}
                    className="aspect-[3/4] w-full object-cover group-hover:brightness-110 transition-all duration-300"
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full">
                    ❤️
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                    {favorite.item.title}
                  </h3>
                  <p className="text-secondary text-sm line-clamp-2">
                    {favorite.item.tags?.join(', ')}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


