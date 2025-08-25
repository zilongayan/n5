/*
  Lightweight MangaDex API client
  Docs: https://api.mangadex.org/docs/
*/

export type MangaDexTag = {
  id: string;
  attributes: {
    name: Record<string, string>;
    group?: string;
  };
};

export type MangaDexRelationship = {
  id: string;
  type: 'cover_art' | 'author' | 'artist' | 'manga' | 'scanlation_group' | string;
  attributes?: any;
};

export type MangaDexManga = {
  id: string;
  type: 'manga';
  attributes: {
    title: Record<string, string>;
    altTitles?: Array<Record<string, string>>;
    description?: Record<string, string>;
    originalLanguage?: string;
    lastVolume?: string | null;
    lastChapter?: string | null;
    contentRating?: 'safe' | 'suggestive' | 'erotica' | 'pornographic';
    tags: MangaDexTag[];
    latestUploadedChapter?: string | null;
    year?: number | null;
  };
  relationships?: MangaDexRelationship[];
};

export type MangaDexChapter = {
  id: string;
  type: 'chapter';
  attributes: {
    title: string | null;
    chapter: string | null; // chapter number as string
    volume: string | null;
    translatedLanguage: string;
    pages?: number;
    publishAt?: string;
    readableAt?: string;
  };
  relationships?: MangaDexRelationship[]; // includes manga, scanlation_group
};

export type MangaDexListResponse<T> = {
  result: 'ok' | 'error';
  response: 'collection';
  data: T[];
  limit: number;
  offset: number;
  total: number;
};

// MangaDex API client
const MANGADEX_API = process.env.NODE_ENV === 'development' 
  ? '/api/mangadex' 
  : 'https://api.mangadex.org';
const UPLOADS = 'https://uploads.mangadex.org';

function getBaseUrl(): string {
  if (typeof window !== 'undefined') return '';
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  const port = process.env.PORT || '3000';
  return `http://localhost:${port}`;
}

// Helper to build URLs with search params
function withSearchParams(baseUrl: string, params: Record<string, any>): string {
  const url = new URL(baseUrl.startsWith('/') ? `${getBaseUrl()}${baseUrl}` : baseUrl);
  
  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(v => url.searchParams.append(key, v as any));
    } else if (typeof value === 'object' && value !== null) {
      // Handle nested objects like { chapter: 'desc' }
      Object.entries(value as Record<string, unknown>).forEach(([k, v]) => {
        if (v !== undefined && v !== null) {
          url.searchParams.set(`${key}[${k}]`, String(v));
        }
      });
    } else if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value));
    }
  });
  
  const built = url.toString();
  // Return relative for client, absolute for server
  return typeof window !== 'undefined' && built.startsWith(getBaseUrl())
    ? built.replace(getBaseUrl(), '')
    : built;
}

// Generic JSON fetcher with error handling
async function getJson<T>(url: string): Promise<T> {
  try {
    const finalUrl = url.startsWith('/') ? `${getBaseUrl()}${url}` : url;
    const response = await fetch(finalUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MangaView/1.0',
      },
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch from ${url}:`, error);
    throw error;
  }
}

export function getCoverUrl(mangaId: string, fileName?: string, size: 256 | 512 = 512): string | null {
  if (!fileName) return null;
  return `${UPLOADS}/covers/${mangaId}/${fileName}.${size}.jpg`;
}

export function extractCoverFileName(relationships?: MangaDexRelationship[]): string | undefined {
  const cover = relationships?.find((r) => r.type === 'cover_art');
  return (cover?.attributes as any)?.fileName;
}

export async function fetchMangaList({
  limit = 24,
  offset = 0,
  order,
  title,
  includedTags = [],
  availableTranslatedLanguage = ['en', 'fr'],
  contentRating = ['safe', 'suggestive', 'erotica', 'pornographic'],
  includes = ['cover_art']
}: {
  limit?: number;
  offset?: number;
  order?: Record<string, 'asc' | 'desc'>; // e.g. { followedCount: 'desc' }
  title?: string;
  includedTags?: string[]; // expects tag IDs in MangaDex; we forward as-is
  availableTranslatedLanguage?: string[];
  contentRating?: Array<'safe' | 'suggestive' | 'erotica' | 'pornographic'>;
  includes?: Array<'cover_art' | 'author' | 'artist'>;
}) {
  const url = withSearchParams(`${MANGADEX_API}/manga`, {
    limit,
    offset,
    title,
    'includedTags[]': includedTags,
    'availableTranslatedLanguage[]': availableTranslatedLanguage,
    'contentRating[]': contentRating,
    'includes[]': includes,
    order,
  });
  const data = await getJson<MangaDexListResponse<MangaDexManga>>(url);
  return data;
}

export async function fetchMangaById(id: string, includes: Array<'cover_art' | 'author' | 'artist'> = ['cover_art']) {
  const url = withSearchParams(`${MANGADEX_API}/manga/${id}`, { 'includes[]': includes });
  const data = await getJson<{ result: 'ok'; response: 'entity'; data: MangaDexManga }>(url);
  return data.data;
}

export async function fetchRandomManga(includes: Array<'cover_art' | 'author' | 'artist'> = ['cover_art']) {
  try {
    const url = withSearchParams(`${MANGADEX_API}/manga/random`, { 'includes[]': includes });
    const data = await getJson<{ result: 'ok'; response: 'entity'; data: MangaDexManga }>(url);
    return data.data;
  } catch {
    const list = await fetchMangaList({ limit: 50, order: { latestUploadedChapter: 'desc' }, includes });
    return list.data[Math.floor(Math.random() * list.data.length)];
  }
}

// Fetch chapters (feed) for a manga
export async function fetchMangaFeed(mangaId: string, {
  limit = 100,
  offset = 0,
  translatedLanguage = ['en', 'fr', 'es', 'it', 'pt-br', 'ru', 'de', 'id', 'vi'],
  order = { chapter: 'desc' as const, readableAt: 'desc' as const },
  includeExternalUrl = 0,
  includeEmptyPages = 0,
  includeFuturePublishAt = 0,
}: {
  limit?: number;
  offset?: number;
  translatedLanguage?: string[];
  order?: Record<'readableAt' | 'chapter', 'asc' | 'desc'>;
  includeExternalUrl?: 0 | 1;
  includeEmptyPages?: 0 | 1;
  includeFuturePublishAt?: 0 | 1;
}) {
  try {
    // First try with specific languages
    const url = withSearchParams(`${MANGADEX_API}/manga/${mangaId}/feed`, {
      limit,
      offset,
      'translatedLanguage[]': translatedLanguage,
      'includes[]': ['scanlation_group'],
      includeExternalUrl,
      includeEmptyPages,
      includeFuturePublishAt,
      order,
    });
    
    console.log(`Fetching manga feed from: ${url}`);
    const data = await getJson<MangaDexListResponse<MangaDexChapter>>(url);
    console.log(`Manga feed response:`, { 
      total: data.total, 
      limit: data.limit, 
      offset: data.offset,
      chaptersCount: data.data.length 
    });
    
    // If we got chapters, return them
    if (data.data && data.data.length > 0) {
      return data;
    }
    
    // If no chapters with specific languages, try without language restriction
    console.log(`No chapters found with specific languages, trying without language restriction`);
    const urlNoLang = withSearchParams(`${MANGADEX_API}/manga/${mangaId}/feed`, {
      limit,
      offset,
      'includes[]': ['scanlation_group'],
      includeExternalUrl,
      includeEmptyPages,
      includeFuturePublishAt,
      order,
    });
    
    const dataNoLang = await getJson<MangaDexListResponse<MangaDexChapter>>(urlNoLang);
    console.log(`Manga feed response (no language restriction):`, { 
      total: dataNoLang.total, 
      limit: dataNoLang.limit, 
      offset: dataNoLang.offset,
      chaptersCount: dataNoLang.data.length 
    });
    
    if (dataNoLang.data && dataNoLang.data.length > 0) {
      return dataNoLang;
    }
    
    // Try a different approach: get manga with all includes and look for chapters
    console.log(`Trying alternative approach: get manga with all includes`);
    try {
      const mangaData = await getJson<{ result: 'ok'; response: 'entity'; data: MangaDexManga }>(
        `${MANGADEX_API}/manga/${mangaId}?includes[]=cover_art&includes[]=author&includes[]=artist&includes[]=chapter&includes[]=scanlation_group`
      );
      
      if (mangaData.data && mangaData.data.relationships) {
        const chapters = mangaData.data.relationships.filter(r => r.type === 'chapter');
        console.log(`Found ${chapters.length} chapter relationships in manga data`);
        
        if (chapters.length > 0) {
          // Try to get chapter details for these chapters
          const chapterIds = chapters.map(c => c.id);
          console.log(`Trying to fetch details for ${chapterIds.length} chapters`);
          
          // Try to get chapter list directly
          const chaptersUrl = withSearchParams(`${MANGADEX_API}/chapter`, {
            'manga[]': mangaId,
            limit: 100,
            offset: 0,
            'includes[]': ['scanlation_group'],
            order: { chapter: 'desc' }
          });
          
          const chaptersData = await getJson<MangaDexListResponse<MangaDexChapter>>(chaptersUrl);
          console.log(`Direct chapters fetch response:`, {
            total: chaptersData.total,
            chaptersCount: chaptersData.data.length
          });
          
          if (chaptersData.data && chaptersData.data.length > 0) {
            return chaptersData;
          }
        }
      }
    } catch (mangaError) {
      console.error(`Alternative approach failed:`, mangaError);
    }
    
    // Try one last approach: get chapters without any restrictions
    console.log(`Trying final approach: get chapters without any restrictions`);
    try {
      const finalChaptersUrl = withSearchParams(`${MANGADEX_API}/chapter`, {
        'manga[]': mangaId,
        limit: 100,
        offset: 0,
        'includes[]': ['scanlation_group', 'manga'],
        'order[chapter]': 'desc',
        'order[volume]': 'desc'
      });
      
      console.log(`Final chapters URL: ${finalChaptersUrl}`);
      const finalChaptersData = await getJson<MangaDexListResponse<MangaDexChapter>>(finalChaptersUrl);
      console.log(`Final chapters fetch response:`, {
        total: finalChaptersData.total,
        chaptersCount: finalChaptersData.data.length
      });
      
      if (finalChaptersData.data && finalChaptersData.data.length > 0) {
        return finalChaptersData;
      }
    } catch (finalError) {
      console.error(`Final approach failed:`, finalError);
    }
    
    // If still no chapters, throw error
    throw new Error('No chapters found with any approach');
    
  } catch (error) {
    console.error(`Failed to fetch manga feed for ${mangaId}:`, error);
    
    // Try alternative endpoint: /manga/{id} with includes
    try {
      console.log(`Trying alternative endpoint for manga ${mangaId}`);
      const mangaData = await getJson<{ result: 'ok'; response: 'entity'; data: MangaDexManga }>(
        `${MANGADEX_API}/manga/${mangaId}?includes[]=chapter`
      );
      
      // If we get manga data but no chapters, return empty response
      if (mangaData.data && mangaData.data.relationships) {
        const chapters = mangaData.data.relationships.filter(r => r.type === 'chapter');
        console.log(`Found ${chapters.length} chapter relationships in manga data`);
        
        return {
          result: 'ok',
          response: 'collection',
          data: [],
          total: 0,
          limit,
          offset
        };
      }
      
      throw new Error('No chapter data found in manga');
    } catch (fallbackError) {
      console.error(`Fallback also failed for manga ${mangaId}:`, fallbackError);
      
      // Return empty response instead of throwing
      return {
        result: 'ok',
        response: 'collection',
        data: [],
        total: 0,
        limit,
        offset
      };
    }
  }
}

// Fetch at-home server info for a chapter and compose page URLs
export async function fetchChapterPages(chapterId: string, useDataSaver = true) {
  try {
    const url = `${MANGADEX_API}/at-home/server/${chapterId}`;
    const data = await getJson<{ baseUrl: string; chapter: { hash: string; data: string[]; dataSaver: string[] } }>(url);
    const { baseUrl, chapter } = data;
    const files = useDataSaver ? chapter.dataSaver : chapter.data;
    const path = useDataSaver ? 'data-saver' : 'data';
    const pageUrls = files.map((file) => `${baseUrl}/${path}/${chapter.hash}/${file}`);
    return pageUrls;
  } catch (error) {
    console.error(`Failed to fetch chapter pages for ${chapterId}:`, error);
    
    // Fallback: try to get chapter info and return placeholder URLs
    try {
      const chapterInfo = await getJson<{ result: 'ok'; response: 'entity'; data: any }>(`${MANGADEX_API}/chapter/${chapterId}`);
      const pages = chapterInfo.data.attributes.pages || 6;
      
      // Return placeholder URLs that will show error state in UI
      return Array.from({ length: pages }, (_, i) => `placeholder://page-${i + 1}`);
    } catch (fallbackError) {
      console.error(`Fallback also failed for ${chapterId}:`, fallbackError);
      throw new Error(`Unable to load chapter pages. Please try again later.`);
    }
  }
}

export function resolveTitle(manga: MangaDexManga): string {
  const t = manga.attributes.title;
  return t.en || t['ja-ro'] || Object.values(t)[0] || 'Untitled';
}

export function resolveDescription(manga: MangaDexManga, preferredLangs: string[] = ['fr', 'en', 'ja-ro']): string {
  const d = manga.attributes.description || {};
  for (const lang of preferredLangs) {
    if ((d as any)[lang]) return (d as any)[lang] as string;
  }
  const anyDesc = Object.values(d)[0];
  return (typeof anyDesc === 'string' ? anyDesc : '') || '';
}

export function resolveTags(manga: MangaDexManga): string[] {
  return (manga.attributes.tags || [])
    .map((tag) => tag.attributes?.name?.en || Object.values(tag.attributes?.name || {})[0])
    .filter(Boolean) as string[];
}

export function resolveGroups(relationships?: MangaDexRelationship[]): string[] {
  return (relationships || [])
    .filter((r) => r.type === 'scanlation_group')
    .map((r) => (r.attributes?.name as string) || '')
    .filter(Boolean);
}
