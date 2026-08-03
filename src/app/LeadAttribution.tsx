'use client';

import { useEffect } from 'react';
import { runAfterIdle } from '@/lib/runAfterIdle';

const LeadAttribution = () => {
  useEffect(() => {
    return runAfterIdle(() => {
      void import('@/lib/leadAttribution').then(({ reportAnonymousAttribution }) =>
        reportAnonymousAttribution()
      );
    });
  }, []);

  return null;
};

export default LeadAttribution;
