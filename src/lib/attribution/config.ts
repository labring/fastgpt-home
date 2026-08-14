import type { AttributionAdapterOptions } from '@/lib/attribution/storage/adapter';

export interface AttributionConfiguration {
  cookieDomain?: string;
}

let attributionConfiguration: AttributionConfiguration = {};

export function configureAttribution(options: AttributionConfiguration = {}): void {
  attributionConfiguration = { ...attributionConfiguration, ...options };
}

export function getConfiguredCookieDomain(): string | undefined {
  return attributionConfiguration.cookieDomain;
}

export function getStorageOptions(): AttributionAdapterOptions {
  return {
    configuredDomain: attributionConfiguration.cookieDomain,
    currentHostname: typeof window === 'undefined' ? undefined : window.location.hostname
  };
}
