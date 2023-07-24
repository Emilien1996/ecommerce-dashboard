import { useIsClient } from './use-client';

export function useOrigin() {
  const isMounted = useIsClient();
  const origin = typeof window !== 'undefined' ? window.location.origin : '';

  if (!isMounted) {
    return '';
  }
  return origin;
}
