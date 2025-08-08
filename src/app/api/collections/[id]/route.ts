import {NextRequest, NextResponse} from 'next/server';
import {readSession} from '@/lib/auth';
import {db} from '@/lib/db';

export async function GET(
  request: NextRequest,
  {params}: {params: Promise<{id: string}>}
) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const {id} = await params;

  try {
    const collection = await db.collection.findFirst({
      where: {
        id,
        userId: session.userId
      },
      include: {
        items: {
          orderBy: {addedAt: 'desc'}
        },
        _count: {
          select: {items: true}
        }
      }
    });

    if (!collection) {
      return NextResponse.json({error: 'Collection not found'}, {status: 404});
    }

    return NextResponse.json(collection);
  } catch (error) {
    return NextResponse.json({error: 'Failed to fetch collection'}, {status: 500});
  }
}

export async function PUT(
  request: NextRequest,
  {params}: {params: Promise<{id: string}>}
) {
  const session = await readSession();
  if (!session) {
    return NextResponse.json({error: 'Unauthorized'}, {status: 401});
  }

  const {id} = await params;
  const {name, description, isPublic} = await request.json();

  try {
    const collection = await db.collection.update({
      where: {
        id,
        userId: session.userId
      },
      data: {
        name,
        description,
        isPublic
      }
    });

    return NextResponse.json(collection);
  } catch (error) {
    return NextResponse.json({error: 'Failed to update collection'}, {status: 500});
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

  try {
    await db.collection.delete({
      where: {
        id,
        userId: session.userId
      }
    });

    return NextResponse.json({success: true});
  } catch (error) {
    return NextResponse.json({error: 'Failed to delete collection'}, {status: 500});
  }
}
