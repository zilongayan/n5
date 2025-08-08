import {NextRequest, NextResponse} from 'next/server';
import {readSession} from '@/lib/auth';
import {db} from '@/lib/db';

export async function GET() {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const collections = await db.collection.findMany({
      where: {userId: session.userId},
      include: {
        _count: {
          select: {items: true}
        }
      },
      orderBy: {updatedAt: 'desc'}
    });

    return NextResponse.json(collections);
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch collections'}, {status: 500});
  }
}

export async function POST(request: NextRequest) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const {name, description, isPublic = false} = await request.json();

    if (!name) {
      return NextResponse.json({error: 'Name is required'}, {status: 400});
    }

    const collection = await db.collection.create({
      data: {
        name,
        description,
        isPublic,
        userId: session.userId
      }
    });

    return NextResponse.json(collection);
  } catch (error) {
    return NextResponse.json({error: 'Failed to create collection'}, {status: 500});
  }
}
