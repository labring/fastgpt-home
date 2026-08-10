import { decodeAttribution } from '../primitives/codec';
import { encodeWithinBudget } from '../primitives/capacity';
import type { StoredAttributionV1 } from '../primitives/envelope';
import type { StoredAttribution } from '../../leadAttribution';
import {
  LEGACY_ATTRIBUTION_KEY,
  LEGACY_VISITOR_ID_KEY,
  clearLegacyAttribution,
  readLegacyAttribution
} from './local-storage';
import { readCookieValues, removeCookieValue, writeCookieValue } from './cookie';
import type { StorageStatus, StorageStatusReason } from './status';

export interface AttributionStorageOptions {
  configuredDomain?: string;
  currentHostname?: string;
}

export type AttributionStorageReason =
  | StorageStatusReason
  | 'cookie-pair-valid'
  | 'cookie-pair-missing'
  | 'cookie-pair-partial'
  | 'cookie-pair-mismatched'
  | 'legacy-pair-valid'
  | 'legacy-pair-promoted'
  | 'legacy-promotion-blocked'
  | 'cleanup-complete';

export type AttributionStorageScope = 'shared' | 'host' | 'both' | 'unknown';

export interface AttributionSnapshotResult {
  status: StorageStatus;
  reason: AttributionStorageReason;
  value: StoredAttributionV1 | null;
  scope: AttributionStorageScope;
}

const VISITOR_COOKIE = LEGACY_VISITOR_ID_KEY;
const ATTRIBUTION_COOKIE = LEGACY_ATTRIBUTION_KEY;

function buildSnapshotResult(
  status: StorageStatus,
  reason: AttributionStorageReason,
  value: StoredAttributionV1 | null,
  scope: AttributionStorageScope = 'unknown'
): AttributionSnapshotResult {
  return { status, reason, value, scope };
}

export function readAttributionCookiePair(
  cookieString = typeof document === 'undefined' ? '' : document.cookie
): AttributionSnapshotResult {
  const visitorValues = readCookieValues(VISITOR_COOKIE, cookieString);
  const attributionValues = readCookieValues(ATTRIBUTION_COOKIE, cookieString);

  if (visitorValues.length === 0 && attributionValues.length === 0) {
    return buildSnapshotResult('unavailable', 'cookie-pair-missing', null);
  }

  for (const visitorId of visitorValues) {
    for (const rawAttribution of attributionValues) {
      const decoded = decodeAttribution(rawAttribution);
      if (!decoded.ok) continue;
      if (decoded.value.visitor_id !== visitorId) continue;
      return buildSnapshotResult('cookie', 'cookie-pair-valid', decoded.value);
    }
  }

  if (visitorValues.length === 0 || attributionValues.length === 0) {
    return buildSnapshotResult('unavailable', 'cookie-pair-partial', null);
  }

  return buildSnapshotResult('unavailable', 'cookie-pair-mismatched', null);
}

export function writeAttributionCookiePair(
  snapshot: StoredAttribution | StoredAttributionV1,
  options: AttributionStorageOptions = {}
): AttributionSnapshotResult {
  const capacity = encodeWithinBudget({ ...snapshot, v: 1 } as StoredAttributionV1);
  if (capacity.status === 'overflow') {
    return buildSnapshotResult('unavailable', 'cookie-budget-overflow', null);
  }

  const encoded = capacity.encoded;
  const value = capacity.value;
  const attrWrite = writeCookieValue(ATTRIBUTION_COOKIE, encoded, options);
  if (!attrWrite.ok)
    return buildSnapshotResult('unavailable', attrWrite.reason, null, attrWrite.scope);

  const visitorWrite = writeCookieValue(VISITOR_COOKIE, value.visitor_id, options);
  if (!visitorWrite.ok)
    return buildSnapshotResult('unavailable', visitorWrite.reason, null, visitorWrite.scope);

  const cookieString = typeof document === 'undefined' ? '' : document.cookie;
  if (
    !readCookieValues(ATTRIBUTION_COOKIE, cookieString).includes(encoded) ||
    !readCookieValues(VISITOR_COOKIE, cookieString).includes(value.visitor_id)
  ) {
    return buildSnapshotResult('unavailable', 'cookie-pair-mismatched', null, attrWrite.scope);
  }

  const decoded = decodeAttribution(encoded);
  if (!decoded.ok)
    return buildSnapshotResult('unavailable', 'cookie-pair-mismatched', null, attrWrite.scope);
  return buildSnapshotResult(
    'cookie',
    capacity.status === 'degraded' ? 'cookie-budget-degraded' : 'cookie-pair-valid',
    decoded.value,
    attrWrite.scope
  );
}

export function promoteLegacyState(
  snapshot: StoredAttributionV1,
  options: AttributionStorageOptions = {}
): AttributionSnapshotResult {
  const written = writeAttributionCookiePair(snapshot, options);
  if (written.status !== 'cookie' || !written.value) {
    return buildSnapshotResult(
      'localStorage-fallback',
      'legacy-promotion-blocked',
      snapshot,
      written.scope
    );
  }

  void clearLegacyAttribution();
  return buildSnapshotResult(
    'cookie',
    written.reason === 'cookie-budget-degraded' ? 'cookie-budget-degraded' : 'legacy-pair-promoted',
    written.value,
    written.scope
  );
}

export function resolveAttributionSnapshot(
  options: AttributionStorageOptions = {}
): AttributionSnapshotResult {
  const cookieState = readAttributionCookiePair();
  if (cookieState.status === 'cookie' && cookieState.value) {
    return cookieState;
  }

  const legacyState = readLegacyAttribution();
  if (!legacyState.ok || !legacyState.value) {
    return buildSnapshotResult(
      'unavailable',
      cookieState.reason === 'cookie-pair-missing' ? legacyState.reason : cookieState.reason,
      null,
      cookieState.scope
    );
  }

  const promoted = promoteLegacyState(legacyState.value, options);
  if (promoted.status === 'cookie' && promoted.value) {
    return promoted;
  }

  return buildSnapshotResult(
    'localStorage-fallback',
    promoted.reason,
    legacyState.value,
    promoted.scope
  );
}

export function cleanupAttributionState(
  options: AttributionStorageOptions = {}
): AttributionSnapshotResult {
  removeCookieValue(VISITOR_COOKIE, options);
  removeCookieValue(ATTRIBUTION_COOKIE, options);
  removeCookieValue(VISITOR_COOKIE, { ...options, scope: 'host' });
  removeCookieValue(ATTRIBUTION_COOKIE, { ...options, scope: 'host' });
  clearLegacyAttribution();
  return buildSnapshotResult('unavailable', 'cleanup-complete', null, 'both');
}
