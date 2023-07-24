'use client';

import { useEffect, useState } from 'react';

import { StoreModal } from '@/components/modals/store-modal';
import { useIsClient } from '@/hooks/use-client';

export const ModalProvider = () => {
  const isMounted = useIsClient()

  if (!isMounted) {
    return null;
  }
  return <StoreModal />;
};
