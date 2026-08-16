'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { runAfterIdle } from '@/lib/runAfterIdle';

export default function DeferredSiteIntegrations() {
  const [SiteIntegrations, setSiteIntegrations] = useState<ComponentType | null>(null);

  useEffect(() => {
    let active = true;
    const cancel = runAfterIdle(() => {
      void import('./DeferredSiteIntegrationsContent').then(({ default: Content }) => {
        if (active) setSiteIntegrations(() => Content);
      });
    });

    return () => {
      active = false;
      cancel();
    };
  }, []);

  return SiteIntegrations ? <SiteIntegrations /> : null;
}
