import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';
import Link from 'next/link';
import {getChapterPageUrls, getMangaChapters} from '@/data/catalog';

export default async function ReaderPage({
  params,
}: {
  params: Promise<{ mangaId: string; chapterId: string; locale: string }>;
}) {
  const { mangaId, chapterId, locale } = await params;

  const pages = await getChapterPageUrls(chapterId, true);
  const chapters = await getMangaChapters(mangaId, 100);
  const currentIndex = chapters.findIndex((c) => c.id === chapterId);
  const prev = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;
  const next = currentIndex > 0 ? chapters[currentIndex - 1] : null;

  return (
    <div className="min-h-screen bg-black">
      <AgeGate />
      <NavBar />
      <main className="pt-16">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between text-white">
          <Link href={`/${locale}/gallery/${mangaId}`} className="hover:underline">← Retour à la galerie</Link>
          <div className="flex items-center gap-3 text-sm">
            {prev ? (
              <Link href={`/${locale}/reader/${mangaId}/${prev.id}`} className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700">Chapitre précédent</Link>
            ) : (
              <span className="px-3 py-1 bg-gray-900 rounded opacity-50">Chapitre précédent</span>
            )}
            {next ? (
              <Link href={`/${locale}/reader/${mangaId}/${next.id}`} className="px-3 py-1 bg-gray-800 rounded hover:bg-gray-700">Chapitre suivant</Link>
            ) : (
              <span className="px-3 py-1 bg-gray-900 rounded opacity-50">Chapitre suivant</span>
            )}
          </div>
        </div>
        <div className="max-w-3xl mx-auto px-2 pb-16">
          <div className="space-y-2">
            {pages.map((src, i) => (
              <img key={i} src={src} alt={`Page ${i + 1}`} className="w-full h-auto" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
