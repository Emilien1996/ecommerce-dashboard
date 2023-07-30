import BilboardForm from '@/components/bilboards/bilboard-from';

const BillboardPage = async ({
  params,
}: {
  params: { bilboardId: string };
}) => {
  const bilboard = await prisma?.billboard.findUnique({
    where: {
      id: params.bilboardId,
    },
  });
  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BilboardForm initialData={bilboard} />
      </div>
    </div>
  );
};

export default BillboardPage;
