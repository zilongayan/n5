import {NextResponse} from 'next/server';
import {verifyUser, writeSession} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || '').trim();
    const password = String(body.password || '').trim();
    
    if (!email || !password) {
      return NextResponse.json({error: 'Missing email or password'}, {status: 400});
    }
    
    const user = await verifyUser(email, password);
    if (!user) {
      return NextResponse.json({error: 'Invalid credentials'}, {status: 401});
    }
    
    await writeSession(user.id, user.email);
    return NextResponse.json({ok: true, user: {id: user.id, email: user.email}});
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({error: 'Login failed'}, {status: 500});
  }
}


