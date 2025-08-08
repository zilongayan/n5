import {NextResponse} from 'next/server';
import {createUser, writeSession} from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const email = String(body.email || '').trim();
    const password = String(body.password || '').trim();
    
    if (!email || !password) {
      return NextResponse.json({error: 'Missing email or password'}, {status: 400});
    }
    
    if (password.length < 6) {
      return NextResponse.json({error: 'Password must be at least 6 characters'}, {status: 400});
    }
    
    const user = await createUser(email, password);
    await writeSession(user.id, user.email);
    
    return NextResponse.json({ok: true, user: {id: user.id, email: user.email}});
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({error: 'Email already exists'}, {status: 400});
    }
    console.error('Signup error:', error);
    return NextResponse.json({error: 'Signup failed'}, {status: 500});
  }
}
