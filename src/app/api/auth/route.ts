import {NextResponse} from 'next/server';
import {readSession} from '@/lib/auth';

export async function GET() {
  try {
    const session = await readSession();
    
    if (!session) {
      return NextResponse.json({authenticated: false});
    }
    
    return NextResponse.json({
      authenticated: true,
      user: {
        id: session.userId,
        email: session.email
      }
    });
  } catch (error) {
    console.error('Auth check error:', error);
    return NextResponse.json({authenticated: false});
  }
}
