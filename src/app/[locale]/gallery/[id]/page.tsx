import {AgeGate} from '@/components/AgeGate';
import {NavBar} from '@/components/NavBar';
import {GalleryContent} from '@/components/GalleryContent';
import {getItemById, getCatalogPage, getMangaChapters, getChapterPageUrls} from '@/data/catalog';
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

  // Chapters (desc by chapter number)
  const chapters = await getMangaChapters(id, 100);
  
  // Pick a readable chapter (has pages from at-home)
  let preview: string[] = [];
  for (const ch of chapters) {
    try {
      const pages = await getChapterPageUrls(ch.id, true);
      if (pages && pages.length) {
        preview = pages.slice(0, 12);
        break;
      }
    } catch {
      // try next
    }
  }

  // Related items
  const {popular} = await getCatalogPage({page: 1});
  const related = popular.filter(i => i.id !== id).slice(0, 6);

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <AgeGate />
      <NavBar />
      <GalleryContent item={item} related={related} chapters={chapters} preview={preview} />
    </div>
  );
}


