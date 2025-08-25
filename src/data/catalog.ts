export type CatalogItem = {
  id: string;
  title: string;
  cover: string;
  tags: string[];
  description?: string;
};

import {
  fetchMangaList,
  fetchMangaById,
  fetchRandomManga,
  fetchMangaFeed,
  fetchChapterPages,
  getCoverUrl,
  extractCoverFileName,
  resolveTitle,
  resolveTags,
  resolveDescription,
  resolveGroups,
} from '@/lib/mangadex';

export type ChapterSummary = {
  id: string;
  number: string;
  title: string;
  language: string;
  pages?: number;
  readableAt?: string;
  groups?: string[];
};

function mapMangaToCatalogItem(m: any): CatalogItem {
  const coverFile = extractCoverFileName(m.relationships);
  return {
    id: m.id,
    title: resolveTitle(m),
    cover: getCoverUrl(m.id, coverFile, 512) || '/icon-192.png',
    tags: resolveTags(m),
    description: resolveDescription(m),
  };
}

export async function getCatalogPage({
  page,
  pageSize = 24,
}: {
  page: number;
  pageSize?: number;
}) {
  const offset = (page - 1) * pageSize;

  // recent = latest uploaded chapter desc
  const recentRes = await fetchMangaList({
    limit: pageSize,
    offset,
    order: { latestUploadedChapter: 'desc' },
  });

  // popular = followedCount desc (approximation to trending)
  const popularRes = await fetchMangaList({
    limit: pageSize,
    offset, // IMPORTANT: support pagination
    order: { followedCount: 'desc' },
  });

  const recent = recentRes.data.map(mapMangaToCatalogItem);
  const popular = popularRes.data.map(mapMangaToCatalogItem);

  return { recent, popular, total: recentRes.total, popularTotal: popularRes.total };
}

export async function getRandomItem(): Promise<CatalogItem> {
  const m = await fetchRandomManga(['cover_art']);
  return mapMangaToCatalogItem(m);
}

export async function getItemById(id: string): Promise<CatalogItem | null> {
  try {
    const m = await fetchMangaById(id, ['cover_art']);
    return mapMangaToCatalogItem(m);
  } catch {
    return null;
  }
}

export async function searchCatalog(query: string): Promise<CatalogItem[]> {
  const res = await fetchMangaList({ limit: 48, title: query });
  return res.data.map(mapMangaToCatalogItem);
}

export async function searchItems({
  query = '',
  tags = '',
  artists = '', // Not used with MangaDex simple search; kept for API compatibility
  page = 1,
}: {
  query?: string;
  tags?: string;
  artists?: string;
  page?: number;
}) {
  const pageSize = 24;
  const offset = (page - 1) * pageSize;

  // MangaDex expects tag UUIDs. Avoid sending non-UUIDs to prevent 400.
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
  const includedTags = tags
    ? tags
        .split(',')
        .map((t) => t.trim())
        .filter((t) => uuidRegex.test(t))
    : [];

  const res = await fetchMangaList({
    limit: pageSize,
    offset,
    title: query || undefined,
    includedTags: includedTags.length ? includedTags : undefined,
    order: query ? undefined : { latestUploadedChapter: 'desc' },
  });
  return res.data.map(mapMangaToCatalogItem);
}

export async function getMangaChapters(mangaId: string, limit = 100) : Promise<ChapterSummary[]> {
  try {
    console.log(`Fetching chapters for manga ${mangaId} with limit ${limit}`);
    
    const feed = await fetchMangaFeed(mangaId, { 
      limit, 
      order: { chapter: 'desc' }, 
      includeExternalUrl: 0, 
      includeEmptyPages: 0, 
      includeFuturePublishAt: 0 
    });
    
    console.log(`Feed response for manga ${mangaId}:`, {
      total: feed.total,
      chaptersCount: feed.data.length,
      result: feed.result
    });
    
    if (!feed.data || feed.data.length === 0) {
      console.log(`No chapters found for manga ${mangaId}`);
      return [];
    }
    
    const chapters = feed.data.map((c) => ({
      id: c.id,
      number: c.attributes.chapter || '-',
      title: c.attributes.title || '',
      language: c.attributes.translatedLanguage,
      pages: c.attributes.pages,
      readableAt: c.attributes.readableAt,
      groups: resolveGroups(c.relationships),
    }));
    
    console.log(`Processed ${chapters.length} chapters for manga ${mangaId}`);
    return chapters;
  } catch (error) {
    console.error(`Error fetching chapters for manga ${mangaId}:`, error);
    
    // Return empty array instead of throwing
    return [];
  }
}

export async function getFirstReadableChapterId(mangaId: string): Promise<string | null> {
  const chapters = await getMangaChapters(mangaId, 50);
  for (const ch of chapters) {
    try {
      const pages = await getChapterPageUrls(ch.id, true);
      if (pages && pages.length) return ch.id;
    } catch {}
  }
  return null;
}

export async function getChapterPageUrls(chapterId: string, useDataSaver = true): Promise<string[]> {
  return fetchChapterPages(chapterId, useDataSaver);
}


