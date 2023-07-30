'use client';

import { Billboard } from '@prisma/client';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
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
import { AlertModal } from '@/components//modals/alert-modal';
import { useOrigin } from '@/hooks/use-origin';
import ImageUpload from '../image-upload';

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1),
});

type BilboardFormValues = z.infer<typeof formSchema>;

interface IBillboardFormProps {
  initialData: Billboard | null | undefined;
}

const BilboardForm: React.FC<IBillboardFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();
  const form = useForm<BilboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      imageUrl: '',
      label: '',
    },
  });

  const title = initialData ? 'Edit bilboard' : 'Create bilboard';
  const description = initialData ? 'Edit a bilboard' : 'Add a new bilboard';
  const toastMessage = initialData ? 'Bilboard updated' : 'Bilboard created';
  const action = initialData ? 'Edit bilboard' : 'Create bilboard';

  const onSubmit = async (values: BilboardFormValues) => {
    try {
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/bilboards/${params.bilboardId}`,
          values
        );
      } else {
        await axios.post(`/api/${params.storeId}/bilboards`, values);
      }
      router.refresh();
      router.push(`/${params.storeId}/bilboards`)
      toast.success(toastMessage);
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
      await axios.delete(
        `/api/${params.storeId}/bilboards/${params.bilboardId}`
      );
      router.refresh();
      router.push('/');
      toast.success('Bilboard deleted');
    } catch (e) {
      toast.error('Make sure you removed all categories using this bilboard first');
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
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant='destructive'
            size='icon'
            onClick={() => setOpen(true)}
          >
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='w-full space-y-8'
        >
          <FormField
            control={form.control}
            name='label'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Bilboard label'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name='imageUrl'
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Background Image</FormLabel>
                  <FormControl>
                    <ImageUpload
                      disabled={loading}
                      value={field.value ? [field.value] : []}
                      onChange={(url) => field.onChange(url)}
                      onRemove={(url) => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button
            type='submit'
            disabled={loading}
            className='ml-auto disabled:bg-muted-foreground'
          >
            {action}
          </Button>
        </form>
      </Form>
      <Separator />
    </>
  );
};

export default BilboardForm;
