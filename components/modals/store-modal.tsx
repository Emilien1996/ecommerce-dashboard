'use Client';

import * as z from 'zod';
import { useStorModal } from '@/hooks/use-store-modal';
import { Modal } from '../ui/modal';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const formSchema = z.object({
  name: z.string().min(1),
});

export const StoreModal = () => {
  const { isOpen, onClose } = useStorModal();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <Modal
      title='Future Create Store'
      description='Add a new store to manage'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='space-y-4 py-2 pb-4'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name='name'
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder='E-commerce' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <div className='flex w-full items-center justify-end space-x-2 pt-6'>
              <Button variant='outline' onClick={onClose}>
                Cancel
              </Button>
              <Button type='submit'>Continue</Button>
            </div>
          </form>
        </Form>
      </div>
    </Modal>
  );
};
