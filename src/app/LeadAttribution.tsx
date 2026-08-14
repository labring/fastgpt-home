'use client';

import { useEffect } from 'react';
import { runAfterIdle } from '@/lib/runAfterIdle';

const LeadAttribution = () => {
  useEffect(() => {
    return runAfterIdle(() => {
      void import('@/lib/leadAttribution').then(
        ({ configureAttribution, reportAnonymousAttribution }) => {
          configureAttribution({
            cookieDomain: process.env.NEXT_PUBLIC_ATTRIBUTION_COOKIE_DOMAIN?.trim() || undefined
          });
          void reportAnonymousAttribution();
        }
      );
    });
  }, []);

  return null;
};

export default LeadAttribution;
