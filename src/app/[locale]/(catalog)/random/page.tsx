import {NavBar} from '@/components/NavBar';
import {AgeGate} from '@/components/AgeGate';
import {getRandomItem} from '@/data/catalog';
import Link from 'next/link';

export default async function RandomPage() {
  const item = await getRandomItem();
  return (
    <div>
      <AgeGate />
      <NavBar />
      <main className="max-w-4xl mx-auto w-full p-6 space-y-6">
        <h1 className="text-2xl font-semibold">Random</h1>
        <div className="border rounded overflow-hidden">
          <img src={item.cover} alt={item.title} className="w-full object-cover" />
          <div className="p-4">
            <div className="text-lg font-medium">{item.title}</div>
            <div className="text-sm text-gray-500">{item.tags.join(', ')}</div>
            <div className="mt-4 flex gap-2">
              <Link href={`../gallery/${item.id}`} className="px-3 py-1 border rounded">
                Open gallery
              </Link>
              <Link href="." className="px-3 py-1 border rounded">
                Another random
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


