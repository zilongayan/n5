import {NextRequest, NextResponse} from 'next/server';
import {readSession} from '@/lib/auth';
import {db} from '@/lib/db';

export async function POST(
  request: NextRequest,
  {params}: {params: Promise<{id: string}>}
) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const {id} = await params;
  const {itemId} = await request.json();

  try {
    // Check if collection exists and belongs to user
    const collection = await db.collection.findFirst({
      where: {
        id,
        userId: session.userId
      }
    });

    if (!collection) {
      return NextResponse.json({error: 'Collection not found'}, {status: 404});
    }

    // Add item to collection
    const collectionItem = await db.collectionItem.create({
      data: {
        collectionId: id,
        itemId
      }
    });

    return NextResponse.json(collectionItem);
  } catch (error) {
    if (error.code === 'P2002') {
      return NextResponse.json({error: 'Item already in collection'}, {status: 400});
    }
    return NextResponse.json({error: 'Failed to add item to collection'}, {status: 500});
  }
}

export async function DELETE(
  request: NextRequest,
  {params}: {params: Promise<{id: string}>}
) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const {id} = await params;
  const {itemId} = await request.json();

  try {
    // Check if collection exists and belongs to user
    const collection = await db.collection.findFirst({
      where: {
        id,
        userId: session.userId
      }
    });

    if (!collection) {
      return NextResponse.json({error: 'Collection not found'}, {status: 404});
    }

    // Remove item from collection
    await db.collectionItem.delete({
      where: {
        collectionId_itemId: {
          collectionId: id,
          itemId
        }
      }
    });

    return NextResponse.json({success: true});
  } catch (error) {
    return NextResponse.json({error: 'Failed to remove item from collection'}, {status: 500});
  }
}
