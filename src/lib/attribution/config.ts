import { resolveCookieDomain } from '@/lib/attribution/primitives/domain';
import type {
  AttributionAdapterOptions,
  AttributionStorageMode,
  AttributionStorageStatusSnapshot
} from '@/lib/attribution/storage/adapter';
import type {
  AttributionSnapshotResult,
  AttributionStorageReason,
  AttributionStorageScope
} from '@/lib/attribution/storage/migration';

export type AttributionDiagnosticKind =
  | 'migration'
  | 'cookie-failure'
  | 'fallback'
  | 'overflow'
  | 'invalid-domain'
  | 'conflict'
  | 'cleanup';

export type AttributionDiagnosticScope = AttributionStorageScope;

export interface AttributionDiagnosticEvent {
  kind: AttributionDiagnosticKind;
  status: AttributionStorageStatusSnapshot['status'];
  reason: AttributionStorageReason;
  storageMode: AttributionStorageMode;
  scope: AttributionDiagnosticScope;
}

export type AttributionDiagnosticCallback = (event: AttributionDiagnosticEvent) => void;

export interface AttributionConfiguration {
  cookieDomain?: string;
  storageMode?: AttributionStorageMode;
  diagnostics?: AttributionDiagnosticCallback;
}

let attributionConfiguration: AttributionConfiguration = {
  storageMode: 'cookie'
};

const diagnosticKeys = new Set<string>();

const DIAGNOSTIC_KIND_BY_REASON: Partial<
  Record<AttributionStorageReason, AttributionDiagnosticKind>
> = {
  'invalid-empty': 'invalid-domain',
  'invalid-syntax': 'invalid-domain',
  'unsafe-scheme': 'invalid-domain',
  'unsafe-path': 'invalid-domain',
  'unsafe-port': 'invalid-domain',
  'unsafe-ip': 'invalid-domain',
  'unsafe-loopback': 'invalid-domain',
  'unsafe-localhost': 'invalid-domain',
  'public-suffix': 'invalid-domain',
  'non-suffix': 'invalid-domain',
  'invalid-current-host': 'invalid-domain',
  'cookie-write-blocked': 'cookie-failure',
  'cookie-read-mismatch': 'cookie-failure',
  'cookie-remove-blocked': 'cookie-failure',
  'cookie-pair-partial': 'conflict',
  'cookie-pair-mismatched': 'conflict',
  'cookie-budget-degraded': 'overflow',
  'cookie-budget-overflow': 'overflow',
  'legacy-pair-promoted': 'migration',
  'legacy-promotion-blocked': 'migration',
  'cleanup-complete': 'cleanup'
};

function resolveStorageMode(): AttributionStorageMode {
  return attributionConfiguration.storageMode ?? 'cookie';
}

function emitDiagnostic(
  kind: AttributionDiagnosticKind,
  input: {
    status: AttributionDiagnosticEvent['status'];
    reason: AttributionStorageReason;
    scope?: AttributionDiagnosticScope;
  }
): void {
  const callback = attributionConfiguration.diagnostics;
  if (!callback) return;
  const event: AttributionDiagnosticEvent = {
    kind,
    status: input.status,
    reason: input.reason,
    storageMode: resolveStorageMode(),
    scope: input.scope ?? 'unknown'
  };
  const key = [event.kind, event.status, event.reason, event.storageMode, event.scope].join('|');
  if (diagnosticKeys.has(key)) return;
  diagnosticKeys.add(key);
  try {
    callback(event);
  } catch {
    /* ignore */
  }
}

export function emitStorageDiagnostics(
  result: Pick<AttributionSnapshotResult, 'status' | 'reason'> & {
    scope?: AttributionDiagnosticScope;
  }
): void {
  const reasonKind = DIAGNOSTIC_KIND_BY_REASON[result.reason];
  if (reasonKind) emitDiagnostic(reasonKind, result);
  if (result.status === 'localStorage-fallback') emitDiagnostic('fallback', result);
}

function emitConfiguredDomainDiagnostic(): void {
  if (typeof window === 'undefined') return;
  try {
    const decision = resolveCookieDomain(
      attributionConfiguration.cookieDomain,
      window.location.hostname
    );
    if (decision.scope === 'host') {
      emitDiagnostic('invalid-domain', {
        status: 'unavailable',
        reason: decision.reason,
        scope: 'host'
      });
    }
  } catch {
    /* ignore */
  }
}

export function configureAttribution(options: AttributionConfiguration = {}): void {
  if (Object.prototype.hasOwnProperty.call(options, 'diagnostics')) {
    diagnosticKeys.clear();
  }
  attributionConfiguration = { ...attributionConfiguration, ...options };
  emitConfiguredDomainDiagnostic();
}

export function getConfiguredCookieDomain(): string | undefined {
  return attributionConfiguration.cookieDomain;
}

export function getStorageMode(): AttributionStorageMode {
  return resolveStorageMode();
}

export function getStorageOptions(): AttributionAdapterOptions {
  return {
    configuredDomain: attributionConfiguration.cookieDomain,
    currentHostname: typeof window === 'undefined' ? undefined : window.location.hostname,
    storageMode: resolveStorageMode()
  };
}
