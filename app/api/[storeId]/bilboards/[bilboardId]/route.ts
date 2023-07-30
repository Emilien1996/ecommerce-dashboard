import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  {
    params,
  }: {
    params: {
      bilboardId: string;
    };
  }
) {
  try {
    if (!params.bilboardId) {
      return new NextResponse('Bilboard id is required', { status: 400 });
    }

    const bilboard = await prismadb?.billboard.findUnique({
      where: {
        id: params.bilboardId,
      },
    });
    return NextResponse.json(bilboard);
  } catch (e) {
    console.log('Bilboard_GET', e);
    return new NextResponse('internal Error', { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { bilboardId: string; storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { label, imageUrl } = body;
    if (!userId) {
      return new NextResponse('Unanthenficated', { status: 401 });
    }
    if (!label) {
      return new NextResponse('Label is required', { status: 400 });
    }
    if (!imageUrl) {
      return new NextResponse('Image url is required', { status: 400 });
    }
    if (!params.bilboardId) {
      return new NextResponse('Bilboard id is required', { status: 400 });
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
    const store = await prismadb?.billboard.updateMany({
      where: {
        id: params.bilboardId,
      },
      data: {
        label,
        imageUrl,
      },
    });
    return NextResponse.json(store);
  } catch (e) {
    console.log('store_patch', e);
    return new NextResponse('internal Error', { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: {
      bilboardId: string;
      storeId: string;
    };
  }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse('Unanthenficated', { status: 401 });
    }
    if (!params.bilboardId) {
      return new NextResponse('Bilboard id is required', { status: 400 });
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
    const bilboard = await prismadb?.billboard.deleteMany({
      where: {
        id: params.bilboardId,
      },
    });
    return NextResponse.json(bilboard);
  } catch (e) {
    console.log('Bilboard_Delete', e);
    return new NextResponse('internal Error', { status: 500 });
  }
}
