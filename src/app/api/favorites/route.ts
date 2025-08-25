import {NextRequest, NextResponse} from 'next/server';
import {readSession} from '@/lib/auth';
import {db} from '@/lib/db';

export async function GET() {
  try {
    // En mode développement, retourner des favoris factices
    if (process.env.NODE_ENV === 'development') {
      return NextResponse.json([
        { itemId: '1' },
        { itemId: '2' },
        { itemId: '3' }
      ]);
    }

    const session = await readSession();
    if (!session) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const favorites = await db.favorite.findMany({
      where: {userId: session.userId},
      select: {itemId: true}
    });

    return NextResponse.json(favorites);
  } catch (error) {
    console.error('Favorites API error:', error);
    // En cas d'erreur, retourner une liste vide
    return NextResponse.json([]);
  }
}

export async function POST(request: NextRequest) {
  try {
    // En mode développement, simuler l'ajout aux favoris
    if (process.env.NODE_ENV === 'development') {
      const {itemId} = await request.json();
      return NextResponse.json({success: true, itemId});
    }

    const session = await readSession();
    if (!session) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

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
    console.error('Add favorite error:', error);
    if (error.code === 'P2002') {
      return NextResponse.json({error: 'Item already favorited'}, {status: 400});
    }
    return NextResponse.json({error: 'Failed to add to favorites'}, {status: 500});
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // En mode développement, simuler la suppression des favoris
    if (process.env.NODE_ENV === 'development') {
      const {itemId} = await request.json();
      return NextResponse.json({success: true, itemId});
    }

    const session = await readSession();
    if (!session) {
      return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

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
    console.error('Remove favorite error:', error);
    return NextResponse.json({error: 'Failed to remove from favorites'}, {status: 500});
  }
}


