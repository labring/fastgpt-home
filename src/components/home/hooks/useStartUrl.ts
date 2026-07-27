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

export const CONSULT_URL =
  'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=C2&hide_S=1';
