import type {
  AttributionAdapterOptions,
  AttributionStorageMode
} from '@/lib/attribution/storage/adapter';

export interface AttributionConfiguration {
  cookieDomain?: string;
  storageMode?: AttributionStorageMode;
}

let attributionConfiguration: AttributionConfiguration = {
  storageMode: 'cookie'
};

export function configureAttribution(options: AttributionConfiguration = {}): void {
  attributionConfiguration = { ...attributionConfiguration, ...options };
}

export function getConfiguredCookieDomain(): string | undefined {
  return attributionConfiguration.cookieDomain;
}

function resolveStorageMode(): AttributionStorageMode {
  return attributionConfiguration.storageMode ?? 'cookie';
}

export function getStorageOptions(): AttributionAdapterOptions {
  return {
    configuredDomain: attributionConfiguration.cookieDomain,
    currentHostname: typeof window === 'undefined' ? undefined : window.location.hostname,
    storageMode: resolveStorageMode()
  };
}
