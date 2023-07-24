'use client';

import { Store } from '@prisma/client';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from './ui/separator';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { AlertModal } from './modals/alert-modal';
import { ApiAlert } from './ui/api-alert';
import { useOrigin } from '@/hooks/use-origin';

interface ISettingsForm {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingsFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<ISettingsForm> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();
  const form = useForm<SettingsFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (values: SettingsFormValues) => {
    try {
      await axios.patch(`/api/stores/${params.storeId}`, values);
      router.refresh();
      toast.success('Store Updated successfully');
    } catch (e) {
      toast.error('Something went wrong');
      console.log(e, 'submit error');
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push('/');
      toast.success('Store deleted');
    } catch (e) {
      toast.error('Make sure you removed all products and categories first');
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        loading={loading}
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={() => onDelete()}
      />
      <div className='flex items-center justify-between'>
        <Heading title='Settings' description='Manage user preferences' />
        <Button variant='destructive' size='icon' onClick={() => setOpen(true)}>
          <Trash className='h-4 w-4' />
        </Button>
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
          <div className='grid grid-cols-3  gap-8'>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder='Store name'
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>
          <Button
            type='submit'
            disabled={loading}
            className='ml-auto disabled:bg-muted-foreground'
          >
            Save Changes
          </Button>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        description={`${origin}/api/${params.storeId}`}
        title='NEXT_PUBLIC_URL'
        variant='public'
      />
    </>
  );
};

export default SettingsForm;
