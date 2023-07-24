'use client';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Badge, BadgeProps } from '@/components/ui/badge';
import { Copy, Server } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'react-hot-toast';

interface ApiAlertProps {
  title: string;
  description: string;
  variant: 'public' | 'admin';
}

type TVariant<T = string> = Record<ApiAlertProps['variant'], T>;

const textMap: TVariant = {
  admin: 'Admin',
  public: 'Public',
};

const variantMap: TVariant<BadgeProps['variant']> = {
  admin: 'secondary',
  public: 'destructive',
};

export const ApiAlert: React.FC<ApiAlertProps> = ({
  description,
  title,
  variant = 'public',
}) => {
  const onCopy = () => {
    navigator.clipboard.writeText(description);
    toast.success('API Route copied to the clipboard');
  };

  return (
    <Alert>
      <Server className='h-4 w-4' />
      <AlertTitle className='flex items-center gap-x-2'>
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>
      <AlertDescription className='mt-7 flex items-center justify-between'>
        <code className='relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold'>
          {description}
        </code>
        <Button variant='outline' size='icon' onClick={onCopy}>
          <Copy className='h-4 w-4' />
        </Button>
      </AlertDescription>
    </Alert>
  );
};
