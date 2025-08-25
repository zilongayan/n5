import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const MANGADEX = 'https://api.mangadex.org';

function buildUrl(path: string, search: string) {
  const target = `${MANGADEX}/${path.replace(/^\//, '')}`;
  const u = new URL(target);
  if (search) {
    const src = new URLSearchParams(search);
    src.forEach((v, k) => u.searchParams.set(k, v));
  }
  return u.toString();
}

async function proxy(req: NextRequest, url: string, tryNum = 1): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 15_000);
  try {
    const res = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'MangaView/1.0 (+https://example.com)'
      },
      signal: controller.signal,
      cache: 'no-store',
    });

    // Backoff on 429/5xx
    if ((res.status === 429 || res.status >= 500) && tryNum <= 3) {
      const retryAfter = Number(res.headers.get('retry-after')) || 0;
      const backoff = retryAfter > 0 ? retryAfter * 1000 : 250 * Math.pow(2, tryNum - 1);
      await new Promise(r => setTimeout(r, backoff));
      return proxy(req, url, tryNum + 1);
    }

    const body = await res.arrayBuffer();
    const resp = new Response(body, {
      status: res.status,
      headers: {
        'Content-Type': res.headers.get('content-type') || 'application/json; charset=utf-8',
        'Cache-Control': 'public, max-age=300, s-maxage=600, stale-while-revalidate=300',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Expose-Headers': 'etag, cache-control',
        'ETag': res.headers.get('etag') || '',
      },
    });
    return resp;
  } finally {
    clearTimeout(timeout);
  }
}

export async function GET(req: NextRequest, { params }: { params: { path: string[] } }) {
  const { pathname, search } = new URL(req.url);
  const path = params.path.join('/');
  const target = buildUrl(path, new URLSearchParams(search).toString());
  return proxy(req, target);
}
