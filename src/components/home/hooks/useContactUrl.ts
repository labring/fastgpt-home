'use client';

import { useParams } from 'next/navigation';
import { defaultLocale } from '@/lib/i18n';
import { getContactUrl } from '@/lib/contact';

export function useContactUrl(): string {
  const params = useParams<{ lang?: string }>();
  return getContactUrl(params?.lang || defaultLocale);
}
