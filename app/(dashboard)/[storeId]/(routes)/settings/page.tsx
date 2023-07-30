import SettingsForm from '@/components/settings-form';
import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
 
  const store = await prisma?.store.findFirst({
    where: {
      id: params.storeId,
      userId,
    },
  });

  if (!store) {
    redirect('/');
  }

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <SettingsForm initialData={store}/>
      </div>   
    </div>
  );
};

export default SettingsPage;
