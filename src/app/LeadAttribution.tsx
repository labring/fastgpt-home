'use client';

import { useEffect } from 'react';
import { runAfterIdle } from '@/lib/runAfterIdle';

const LeadAttribution = () => {
  useEffect(() => {
    return runAfterIdle(() => {
      void import('@/lib/leadAttribution').then(
        ({ configureAttribution, reportAnonymousAttribution }) => {
          configureAttribution({
            cookieDomain:
              process.env.NEXT_PUBLIC_ATTRIBUTION_COOKIE_DOMAIN?.trim() || '.fastgpt.io',
            storageMode:
              process.env.NEXT_PUBLIC_ATTRIBUTION_STORAGE_MODE === 'localStorage'
                ? 'localStorage'
                : 'cookie',
            diagnostics:
              process.env.NEXT_PUBLIC_ATTRIBUTION_DIAGNOSTICS === 'console'
                ? (event) => console.info('FastGPT attribution diagnostic', event)
                : undefined
          });
          void reportAnonymousAttribution();
        }
      );
    });
  }, []);

  return null;
};

export default LeadAttribution;
