import type { StoredAttribution } from '../../leadAttribution';
import type { StoredAttributionV1 } from '../primitives/envelope';
import {
  LEGACY_ATTRIBUTION_KEY,
  LEGACY_VISITOR_ID_KEY,
  clearLegacyAttribution,
  readLegacyAttribution,
  writeLegacyAttribution
} from './local-storage';
import type { StorageStatus } from './status';
import type {
  AttributionSnapshotResult,
  AttributionStorageOptions,
  AttributionStorageReason,
  AttributionStorageScope
} from './migration';
import {
  cleanupAttributionState,
  resolveAttributionSnapshot,
  writeAttributionCookiePair
} from './migration';

export interface AttributionStorageStatusSnapshot {
  status: StorageStatus;
  reason: AttributionStorageReason;
  scope: AttributionStorageScope;
}

export type AttributionAdapterOptions = AttributionStorageOptions;

const defaultStatus: AttributionStorageStatusSnapshot = {
  status: 'unavailable',
  reason: 'localStorage-missing',
  scope: 'unknown'
};

let currentStatus: AttributionStorageStatusSnapshot = { ...defaultStatus };

function setCurrentStatus(result: AttributionSnapshotResult): AttributionSnapshotResult {
  currentStatus = { status: result.status, reason: result.reason, scope: result.scope };
  return result;
}

export function loadAttributionSnapshot(
  options: AttributionAdapterOptions = {}
): AttributionSnapshotResult {
  return setCurrentStatus(resolveAttributionSnapshot(options));
}

export function loadStoredVisitorId(options: AttributionAdapterOptions = {}): string | null {
  const snapshot = loadAttributionSnapshot(options);
  if (snapshot.value?.visitor_id) return snapshot.value.visitor_id;
  if (typeof window === 'undefined') return null;
  try {
    const storedVisitorId = window.localStorage.getItem(LEGACY_VISITOR_ID_KEY);
    if (storedVisitorId && /^[A-Za-z0-9._~-]{1,64}$/.test(storedVisitorId)) return storedVisitorId;
    const rawAttribution = window.localStorage.getItem(LEGACY_ATTRIBUTION_KEY);
    if (!rawAttribution) return null;
    const parsed = JSON.parse(rawAttribution) as { visitor_id?: unknown };
    return typeof parsed.visitor_id === 'string' &&
      /^[A-Za-z0-9._~-]{1,64}$/.test(parsed.visitor_id)
      ? parsed.visitor_id
      : null;
  } catch {
    return null;
  }
}

export function getAttributionStorageStatus(): AttributionStorageStatusSnapshot {
  return { ...currentStatus };
}

export function saveAttributionSnapshot(
  snapshot: StoredAttribution,
  options: AttributionAdapterOptions = {}
): AttributionSnapshotResult {
  const written = writeAttributionCookiePair(snapshot, options);
  if (written.status === 'cookie' && written.value) {
    void clearLegacyAttribution();
    return setCurrentStatus(written);
  }

  const legacy = writeLegacyAttribution(snapshot);
  if (legacy.ok) {
    return setCurrentStatus({
      status: 'localStorage-fallback',
      reason: written.reason,
      value: { ...snapshot, v: 1 } as StoredAttributionV1,
      scope: written.scope === 'unknown' ? 'host' : written.scope
    });
  }

  return setCurrentStatus({
    status: 'unavailable',
    reason: written.reason,
    value: null,
    scope: written.scope
  });
}

export function clearAttribution(
  options: AttributionAdapterOptions = {}
): AttributionSnapshotResult {
  return setCurrentStatus(cleanupAttributionState(options));
}
