"use client"

import { useStorModal } from '@/hooks/use-store-modal';
import { useEffect } from 'react';

export default function Home() {
  const { isOpen, onOpen } = useStorModal();

  useEffect(() => {
    if (!isOpen) {
      onOpen();
    }
  }, [isOpen, onOpen]);

  return <main className='p-4'>Root page</main>;
}
