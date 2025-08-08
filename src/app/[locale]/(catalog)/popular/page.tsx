import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';
import {FavoriteButtonCompact} from '@/components/FavoriteButton';
import {getCatalogPage} from '@/data/catalog';
import Link from 'next/link';

export default async function PopularPage({
  searchParams
}: {
  searchParams: Promise<{page?: string}>;
}) {
  const {page = '1'} = await searchParams;
  const pageNum = Number(page) || 1;
  const {popular, total} = await getCatalogPage({page: pageNum});
  const totalPages = Math.ceil(total / 24);
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-blue-900/20 dark:to-purple-900/20">
      <AgeGate />
      <NavBar />
      <main className="max-w-6xl mx-auto w-full p-6 space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-primary">🔥 Populaire</h1>
          <p className="text-secondary">Les galeries les plus appréciées de la communauté</p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
          {popular.map((item) => (
            <div
              key={item.id}
              className="group theme-card overflow-hidden hover:scale-105 transition-all duration-300"
            >
              <div className="relative">
                <Link href={`../gallery/${item.id}`}>
                  <img 
                    src={item.cover} 
                    alt={item.title} 
                    className="aspect-[3/4] w-full object-cover group-hover:brightness-110 transition-all duration-300" 
                  />
                </Link>
                <div className="absolute top-2 right-2">
                  <FavoriteButtonCompact itemId={item.id} />
                </div>
              </div>
              <div className="p-3">
                <Link href={`../gallery/${item.id}`}>
                  <h3 className="text-sm font-medium text-primary line-clamp-2 group-hover:text-accent transition-colors">
                    {item.title}
                  </h3>
                </Link>
              </div>
            </div>
          ))}
        </div>
        
        <Pagination page={pageNum} totalPages={totalPages} basePath="popular" />
      </main>
    </div>
  );
}

function Pagination({
  page,
  totalPages,
  basePath
}: {
  page: number;
  totalPages: number;
  basePath: string;
}) {
  const prev = page > 1 ? `${basePath}?page=${page - 1}` : null;
  const next = page < totalPages ? `${basePath}?page=${page + 1}` : null;
  return (
    <div className="flex items-center justify-center gap-4">
      {prev && (
        <Link 
          href={prev} 
          className="theme-button-secondary px-4 py-2 rounded-lg text-sm font-medium"
        >
          ← Précédent
        </Link>
      )}
      <span className="text-secondary font-medium">
        Page {page} sur {totalPages}
      </span>
      {next && (
        <Link 
          href={next} 
          className="theme-button-secondary px-4 py-2 rounded-lg text-sm font-medium"
        >
          Suivant →
        </Link>
      )}
    </div>
  );
}


