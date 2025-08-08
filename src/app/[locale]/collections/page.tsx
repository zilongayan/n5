import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';
import {readSession} from '@/lib/auth';
import {db} from '@/lib/db';
import {notFound} from 'next/navigation';
import Link from 'next/link';

export default async function CollectionsPage({
  params
}: {
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const session = await readSession();
  if (!session || !session.userId) {
    return notFound();
  }
  
  const collections = await db.collection.findMany({
    where: {userId: session.userId},
    include: {
      _count: {
        select: {items: true}
      }
    }
  });
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <AgeGate />
      <NavBar />
      <main className="max-w-6xl mx-auto w-full p-6 pt-20">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-primary mb-2">📚 Mes Collections</h1>
          <p className="text-secondary">Organisez vos galeries favorites</p>
        </div>
        
        {collections.length === 0 ? (
          <div className="theme-card p-8 text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-primary mb-2">Aucune collection</h2>
            <p className="text-secondary mb-6">Vous n'avez pas encore créé de collections</p>
            <Link 
              href={`/${locale}`}
              className="theme-button-primary px-6 py-3 rounded-xl font-medium"
            >
              Découvrir des galeries
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection) => (
              <Link
                key={collection.id}
                href={`/${locale}/collections/${collection.id}`}
                className="group theme-card overflow-hidden hover:scale-105 transition-all duration-300"
              >
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-primary mb-2 group-hover:text-accent transition-colors">
                    {collection.name}
                  </h3>
                  {collection.description && (
                    <p className="text-secondary text-sm mb-4 line-clamp-2">
                      {collection.description}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted">
                      {collection._count.items} galerie{collection._count.items > 1 ? 's' : ''}
                    </span>
                    <span className="text-2xl">📚</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
