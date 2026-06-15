'use client';

import { useEffect, useState } from 'react';
import { buildCloudEntryUrl } from '@/lib/cloudEntryUrl';

export function useStartUrl(source: string, targetUrl?: string): string {
  const [url, setUrl] = useState<string>(() => buildCloudEntryUrl(source, '', targetUrl));

  useEffect(() => {
    if (typeof window === 'undefined') return;
    queueMicrotask(() => {
      setUrl(buildCloudEntryUrl(source, window.location.search, targetUrl));
    });
  }, [source, targetUrl]);

  return url;
}

export const CONSULT_URL =
  'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=C2&hide_S=1';
