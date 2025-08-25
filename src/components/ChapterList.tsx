'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

export type ChapterRow = {
  id: string;
  number: string;
  title: string;
  language: string;
  groups?: string[];
  readableAt?: string;
};

function formatTimeAgo(date?: string) {
  if (!date) return '';
  const d = new Date(date);
  const diff = Math.floor((Date.now() - d.getTime()) / 1000);
  if (diff < 60) return `${diff}s`;
  const m = Math.floor(diff / 60);
  if (m < 60) return `${m}m`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h`;
  const days = Math.floor(h / 24);
  return `${days}d`;
}

export function ChapterList({
  mangaId,
  chapters,
  locale,
  className = ''
}: {
  mangaId: string;
  chapters: ChapterRow[];
  locale: string;
  className?: string;
}) {
  const [sortDesc, setSortDesc] = useState(true);

  const grouped = useMemo(() => {
    const map = new Map<string, ChapterRow[]>();
    chapters.forEach((c) => {
      const key = c.language.toUpperCase();
      if (!map.has(key)) map.set(key, []);
      map.get(key)!.push(c);
    });
    for (const list of map.values()) {
      list.sort((a, b) => (Number(a.number) || 0) - (Number(b.number) || 0));
      if (sortDesc) list.reverse();
    }
    return Array.from(map.entries()).sort((a, b) => a[0].localeCompare(b[0]));
  }, [chapters, sortDesc]);

  // If no chapters, show informative message
  if (chapters.length === 0) {
    return (
      <div className={className}>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold">Chapitres</h3>
        </div>
        
        <div className="text-center py-12 bg-gray-50 dark:bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-600">
          <div className="text-6xl mb-4">📚</div>
          <h4 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Aucun chapitre disponible
          </h4>
          <p className="text-gray-500 dark:text-gray-400 mb-4 max-w-md mx-auto">
            Ce manga n'a pas encore de chapitres publiés ou les chapitres ne sont pas accessibles via l'API MangaDex.
          </p>
          <div className="text-sm text-gray-400 dark:text-gray-500">
            <p>• Vérifiez sur <a href={`https://mangadex.org/title/${mangaId}`} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">MangaDex.org</a></p>
            <p>• Les chapitres peuvent être en cours de traduction</p>
            <p>• Certains mangas sont des one-shots sans chapitres</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg font-semibold">Chapitres ({chapters.length})</h3>
        <button
          onClick={() => setSortDesc((s) => !s)}
          className="text-sm text-blue-500 hover:underline"
        >
          Trier: {sortDesc ? 'Desc' : 'Asc'}
        </button>
      </div>

      {grouped.map(([lang, list]) => (
        <div key={lang} className="mb-4">
          <div className="text-xs text-gray-400 mb-1">{lang}</div>
          <div className="rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
            {list.map((c, idx) => (
              <Link
                key={c.id}
                href={`/${locale}/reader/${mangaId}/${c.id}`}
                className={`grid grid-cols-[auto_1fr_auto] gap-3 items-center px-3 py-2 hover:bg-gray-50 dark:hover:bg-gray-900/40 ${idx !== list.length - 1 ? 'border-b border-gray-100 dark:border-gray-800' : ''}`}
              >
                <div className="text-xs px-2 py-1 rounded bg-gray-200 dark:bg-gray-700">Ch. {c.number || '-'}</div>
                <div className="text-sm truncate">
                  <span className="mr-2">{c.title || '—'}</span>
                  {c.groups && c.groups.length > 0 && (
                    <span className="text-xs text-gray-500">[{c.groups.slice(0,2).join(', ')}{c.groups.length>2?'…':''}]</span>
                  )}
                </div>
                <div className="text-xs text-gray-500">{formatTimeAgo(c.readableAt)}</div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
