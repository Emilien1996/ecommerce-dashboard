'use client';

import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { BilboardColumn, columns } from '@/components/bilboards/columns';
import { DataTable } from '@/components/ui/data-table';
import { Plus } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { ApiList } from '@/components/ui/api-list';

interface BilboardClientParams {
  data: BilboardColumn[];
}

export const BilboardClient: React.FC<BilboardClientParams> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className='flex items-center justify-between'>
        <Heading
          title={`Bilboards ${data.length}`}
          description='Manage bilboards of your store'
        />
        <Button onClick={() => router.push(`/${params.storeId}/bilboards/new`)}>
          <Plus className='mr-2 h-4 w-4' />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey='label' columns={columns} data={data} />
      <Heading title='API' description='API calls for Bilboards' />
      <Separator />
      <ApiList entityName='bilboards' entityIdName='bilboardId' />
    </>
  );
};
