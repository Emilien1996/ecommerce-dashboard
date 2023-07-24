'use client';

import { useIsClient } from '@/hooks/use-client';
import { Modal } from '@/components/ui/modal';
import { Button } from '@/components/ui/button';

interface AlerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

export const AlertModal: React.FC<AlerModalProps> = ({
  isOpen,
  loading,
  onClose,
  onConfirm,
}) => {
  const isMounted = useIsClient();
  if (!isMounted) return null;
  return (
    <Modal
      title='Are you sure?'
      description='This action cannot be undone'
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className='flex w-full items-center justify-end space-x-2 pt-6'>
        <Button disabled={loading} variant='outline' onClick={onClose}>
          Cancel
        </Button>
        <Button disabled={loading} variant='destructive' onClick={onConfirm}>
          Continue
        </Button>
      </div>
    </Modal>
  );
};
