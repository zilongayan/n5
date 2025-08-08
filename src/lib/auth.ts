import bcrypt from 'bcryptjs';
import {cookies} from 'next/headers';
import {db} from './db';

export const SESSION_COOKIE = 'session';

export type Session = {userId: string; email: string} | null;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

export async function readSession(): Promise<Session> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;
  if (!raw) return null;
  try {
    return JSON.parse(Buffer.from(raw, 'base64').toString('utf8')) as Session;
  } catch {
    return null;
  }
}

export async function writeSession(userId: string, email: string) {
  const store = await cookies();
  const payload = Buffer.from(JSON.stringify({userId, email}), 'utf8').toString('base64');
  store.set(SESSION_COOKIE, payload, {path: '/', maxAge: 60 * 60 * 24 * 30});
}

export async function clearSession() {
  const store = await cookies();
  store.set(SESSION_COOKIE, '', {path: '/', maxAge: 0});
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await hashPassword(password);
  return db.user.create({
    data: {
      email,
      password: hashedPassword,
    },
  });
}

export async function verifyUser(email: string, password: string) {
  const user = await db.user.findUnique({
    where: {email},
  });
  if (!user) return null;
  
  const isValid = await verifyPassword(password, user.password);
  if (!isValid) return null;
  
  return user;
}
