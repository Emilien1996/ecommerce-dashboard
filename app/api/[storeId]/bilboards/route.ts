import { auth } from '@clerk/nextjs';
import { NextRequest, NextResponse } from 'next/server';
import prismadb from '@/lib/prismadb';

export async function POST(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;
    if (!userId) {
      return new NextResponse('Unauthenticated', { status: 401 });
    }
    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse('Image url is required', { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse('store id is required', { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeId,
        userId,
      },
    });
    if (!storeByUserId) {
      return new NextResponse('Unauthenticated', { status: 403 });
    }
    const billboard = await prismadb?.billboard.create({
      data: {
        label,
        imageUrl,
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboard);
  } catch (e) {
    console.log('bilboards_Post', e);
    return new NextResponse('internal Error', { status: 500 });
  }
}

export async function GET(
  req: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    if (!params.storeId) {
      return new NextResponse('store id is required', { status: 400 });
    }

    const billboards = await prismadb?.billboard.findMany({
      where: {
        storeId: params.storeId,
      },
    });
    return NextResponse.json(billboards);
  } catch (e) {
    console.log('bilboards_Post', e);
    return new NextResponse('internal Error', { status: 500 });
  }
}
