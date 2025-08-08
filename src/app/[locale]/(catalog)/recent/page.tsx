import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';
import {getCatalogPage} from '@/data/catalog';
import Link from 'next/link';

export default async function RecentPage({
  searchParams
}: {
  searchParams: Promise<{page?: string}>;
}) {
  const {page = '1'} = await searchParams;
  const pageNum = Number(page) || 1;
  const {recent, total} = await getCatalogPage({page: pageNum});
  const totalPages = Math.ceil(total / 24);
  return (
    <div>
      <AgeGate />
      <NavBar />
      <main className="max-w-6xl mx-auto w-full p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Recent</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {recent.map((item) => (
            <Link
              key={item.id}
              href={`../gallery/${item.id}`}
              className="group block border rounded overflow-hidden bg-white/5 hover:shadow"
            >
              <img src={item.cover} alt={item.title} className="aspect-[3/4] w-full object-cover" />
              <div className="p-2 text-sm line-clamp-2 group-hover:underline">
                {item.title}
              </div>
            </Link>
          ))}
        </div>
        <Pagination page={pageNum} totalPages={totalPages} basePath="recent" />
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
    <div className="flex items-center gap-2">
      {prev && (
        <Link href={prev} className="px-2 py-1 border rounded text-sm">
          Prev
        </Link>
      )}
      <span className="text-sm">
        {page} / {totalPages}
      </span>
      {next && (
        <Link href={next} className="px-2 py-1 border rounded text-sm">
          Next
        </Link>
      )}
    </div>
  );
}


