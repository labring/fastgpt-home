'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';
import { buildCloudEntryUrl } from '@/lib/cloudEntryUrl';

export function useStartUrl(targetUrl?: string): string {
  const [url, setUrl] = useState<string>(targetUrl || siteConfig.userUrl);

  useEffect(() => {
    queueMicrotask(() => {
      setUrl(buildCloudEntryUrl(window.location.search, targetUrl));
    });
  }, [targetUrl]);

  return url;
}

export const CONSULT_URL = '/contact';
