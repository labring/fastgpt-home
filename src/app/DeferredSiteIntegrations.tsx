'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { runAfterIdle } from '@/lib/runAfterIdle';

export default function DeferredSiteIntegrations() {
  const [Analytics, setAnalytics] = useState<ComponentType | null>(null);
  const [Attribution, setAttribution] = useState<ComponentType | null>(null);

  useEffect(() => {
    let active = true;
    // Keep the script loader out of the initial bundle; providers own their loading strategy.
    void import('./SiteAnalytics').then(({ default: Content }) => {
      if (active) setAnalytics(() => Content);
    });
    const cancel = runAfterIdle(() => {
      void import('./LeadAttribution').then(({ default: Content }) => {
        if (active) setAttribution(() => Content);
      });
    });

    return () => {
      active = false;
      cancel();
    };
  }, []);

  return (
    <>
      {Analytics && <Analytics />}
      {Attribution && <Attribution />}
    </>
  );
}
