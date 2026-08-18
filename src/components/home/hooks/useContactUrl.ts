'use client';

import { useSyncExternalStore } from 'react';
import { useParams } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';
import { getContactUrl } from '@/lib/contact';

function subscribeToLocationSearch(onChange: () => void) {
  window.addEventListener('popstate', onChange);
  return () => window.removeEventListener('popstate', onChange);
}

function getLocationSearch() {
  return window.location.search;
}

function getServerLocationSearch() {
  return '';
}

export function useContactUrl(locale?: string): string {
  const params = useParams<{ lang?: string }>();
  const search = useSyncExternalStore(
    subscribeToLocationSearch,
    getLocationSearch,
    getServerLocationSearch
  );

  return getContactUrl(locale || params?.lang || defaultLocale, search);
}
