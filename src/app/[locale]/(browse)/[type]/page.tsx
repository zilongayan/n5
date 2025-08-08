import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';
import Link from 'next/link';

export default async function BrowseByType({
  params
}: {
  params: Promise<{type: 'series' | 'tags' | 'characters' | 'artists' | 'groups'}>;
}) {
  const {type} = await params;
  // Mock lists
  const data = Array.from({length: 60}).map((_, i) => `${i % 2 ? 'alpha' : 'beta'}-${i}`);
  return (
    <div>
      <AgeGate />
      <NavBar />
      <main className="max-w-6xl mx-auto w-full p-6 space-y-6">
        <h1 className="text-2xl font-semibold capitalize">Browse</h1>
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {data.map((x) => (
            <li key={x}>
              <Link href={`../../search?q=${encodeURIComponent(x)}`} className="block px-2 py-1 border rounded text-sm hover:bg-black/10">
                {x}
              </Link>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}


