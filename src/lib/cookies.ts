import {cookies} from 'next/headers';

export const SESSION_COOKIE = 'session';
export const FAVORITES_COOKIE = 'favorites';

export type Session = {email: string} | null;

export function readSession(): Session {
  const store = cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, 'base64').toString('utf8')) as Session;
  } catch {
    return null;
  }
}

export function writeSession(email: string) {
  const store = cookies();
  const payload = Buffer.from(JSON.stringify({email}), 'utf8').toString('base64');
  store.set(SESSION_COOKIE, payload, {path: '/', maxAge: 60 * 60 * 24 * 30});
}

export function clearSession() {
  cookies().set(SESSION_COOKIE, '', {path: '/', maxAge: 0});
}

export function readFavorites(): string[] {
  const raw = cookies().get(FAVORITES_COOKIE)?.value ?? '';
  if (!raw) return [];
  return raw.split(',').filter(Boolean);
}

export function writeFavorites(ids: string[]) {
  cookies().set(FAVORITES_COOKIE, ids.join(','), {path: '/', maxAge: 60 * 60 * 24 * 365});
}


