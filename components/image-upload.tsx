'use client';

import { useIsClient } from '@/hooks/use-client';
import { Button } from '@/components/ui/button';
import { ImagePlus, TrashIcon } from 'lucide-react';
import Image from 'next/image';
import { CldUploadWidget } from 'next-cloudinary';

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onChange,
  onRemove,
  value,
  disabled,
}) => {
  const isMounted = useIsClient();
  if (!isMounted) return null;
  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };
  console.log({ value });
  return (
    <div>
      <div className='mb-4 flex items-center gap-4'>
        {value.map((url) => {
          return (
            <div
              key={url}
              className='relative h-[200px] w-[200px] overflow-hidden rounded-md'
            >
              <div className='absolute right-2 top-2 z-10'>
                <Button variant='destructive' size='icon'>
                  <TrashIcon
                    className='h-4 w-4'
                    onClick={() => onRemove(url)}
                  />
                </Button>
              </div>
              <Image
                src={url}
                className='object-cover'
                alt='bilboard-image'
                fill
              />
            </div>
          );
        })}
      </div>
      <CldUploadWidget onUpload={onUpload} uploadPreset='ztn9uvnl'>
        {({ open }) => {
          const widgetHandler = () => {
            open();
          };
          return (
            <Button
              type='button'
              variant='secondary'
              disabled={disabled}
              onClick={widgetHandler}
            >
              <ImagePlus className='mr-2 h-4 w-4' />
              Upload an Image
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
