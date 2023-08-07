import { BilboardClient } from '@/components/bilboards/client';
import prismadb from '@/lib/prismadb';
import {format} from 'date-fns'

const BillboardsPage = async ({
  params,
}: {
  params: {
    storeId: string;
  };
}) => {
  const bilboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
  const formattedBilboard = bilboards.map((bilboard) => ({
    id : bilboard.id,
    label : bilboard.label,
    createdAt : format(bilboard.createdAt, "MMMM do,yyyy")

  }))
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BilboardClient data={formattedBilboard} />
      </div>
    </div>
  );
};

export default BillboardsPage;
