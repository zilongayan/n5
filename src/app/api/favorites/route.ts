import {NextRequest, NextResponse} from 'next/server';
import {readSession} from '@/lib/auth';
import {db} from '@/lib/db';

export async function GET() {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const favorites = await db.favorite.findMany({
      where: {userId: session.userId},
      select: {itemId: true}
    });

    return NextResponse.json(favorites);
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch favorites'}, {status: 500});
  }
}

export async function POST(request: NextRequest) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const {itemId} = await request.json();

    if (!itemId) {
      return NextResponse.json({error: 'Item ID is required'}, {status: 400});
    }

    const favorite = await db.favorite.create({
      data: {
        userId: session.userId,
        itemId
      }
    });

    return NextResponse.json(favorite);
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({error: 'Item already favorited'}, {status: 400});
    }
    return NextResponse.json({error: 'Failed to add to favorites'}, {status: 500});
  }
}

export async function DELETE(request: NextRequest) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  try {
    const {itemId} = await request.json();

    if (!itemId) {
      return NextResponse.json({error: 'Item ID is required'}, {status: 400});
    }

    await db.favorite.delete({
      where: {
        userId_itemId: {
          userId: session.userId,
          itemId
        }
      }
    });

    return NextResponse.json({success: true});
  } catch (error) {
    return NextResponse.json({error: 'Failed to remove from favorites'}, {status: 500});
  }
}


