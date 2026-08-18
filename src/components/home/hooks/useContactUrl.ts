'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';
import { getContactUrl } from '@/lib/contact';

export function useContactUrl(locale?: string): string {
  const params = useParams<{ lang?: string }>();
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(window.location.search);
  }, []);

  return getContactUrl(locale || params?.lang || defaultLocale, search);
}
