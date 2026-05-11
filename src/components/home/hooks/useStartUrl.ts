'use client';

import { useEffect, useState } from 'react';
import { siteConfig } from '@/config/site';

const CAMPAIGN_KEYS = ['search', 'bd_vid', 'msclkid', 'k'] as const;

export function useStartUrl(): string {
  const [url, setUrl] = useState<string>(siteConfig.userUrl);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    queueMicrotask(() => {
      const incoming = new URLSearchParams(window.location.search);
      const forwarded = new URLSearchParams();
      CAMPAIGN_KEYS.forEach((key) => {
        const value = incoming.get(key);
        if (value) forwarded.set(key, value);
      });
      const qs = forwarded.toString();
      setUrl(qs ? `${siteConfig.userUrl}?${qs}` : siteConfig.userUrl);
    });
  }, []);

  return url;
}

export const CONSULT_URL =
  'https://fael3z0zfze.feishu.cn/share/base/form/shrcnjJWtKqjOI9NbQTzhNyzljc?prefill_S=C2&hide_S=1';
