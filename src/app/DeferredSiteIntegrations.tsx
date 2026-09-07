'use client';

import { useEffect, useState, type ComponentType } from 'react';
import { runAfterIdle } from '@/lib/runAfterIdle';

export default function DeferredSiteIntegrations() {
  const [Analytics, setAnalytics] = useState<ComponentType | null>(null);
  const [SiteIntegrations, setSiteIntegrations] = useState<ComponentType | null>(null);

  useEffect(() => {
    let active = true;
    // Start analytics during hydration while keeping its SDK loader out of the initial bundle.
    if (window.location.hostname === 'fastgpt.cn') {
      void import('./SiteAnalytics').then(({ default: Content }) => {
        if (active) setAnalytics(() => Content);
      });
    }
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

  return (
    <>
      {Analytics && <Analytics />}
      {SiteIntegrations && <SiteIntegrations />}
    </>
  );
}
