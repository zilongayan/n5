import {AgeGate} from '@/components/AgeGate';
import {NavBar} from '@/components/NavBar';
import {GalleryContent} from '@/components/GalleryContent';
import {getItemById, getCatalogPage} from '@/data/catalog';
import {notFound} from 'next/navigation';

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
      <GalleryContent item={item} related={related} />
    </div>
  );
}


