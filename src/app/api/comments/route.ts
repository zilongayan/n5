import {NextRequest, NextResponse} from 'next/server';
import {readSession} from '@/lib/auth';
import {db} from '@/lib/db';

export async function GET(request: NextRequest) {
  const {searchParams} = new URL(request.url);
  const itemId = searchParams.get('itemId');

  if (!itemId) {
    return NextResponse.json({error: 'Item ID is required'}, {status: 400});
  }

  try {
    const comments = await db.comment.findMany({
      where: {itemId},
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        }
      },
      orderBy: {createdAt: 'desc'}
    });

    return NextResponse.json(comments);
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch comments'}, {status: 500});
  }
}

export async function POST(request: NextRequest) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const {content, itemId} = await request.json();

    if (!content || !itemId) {
      return NextResponse.json({error: 'Content and itemId are required'}, {status: 400});
    }

    const comment = await db.comment.create({
      data: {
        content,
        itemId,
        userId: session.userId
      },
      include: {
        user: {
          select: {
            id: true,
            email: true
          }
        }
      }
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json({error: 'Failed to create comment'}, {status: 500});
  }
}
