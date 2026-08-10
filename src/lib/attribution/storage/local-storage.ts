import { decodeAttribution } from '../primitives/codec';
import type { StoredAttribution } from '../../leadAttribution';
import type { StoredAttributionV1 } from '../primitives/envelope';
import type { StorageResult } from './status';

export const LEGACY_ATTRIBUTION_KEY = 'xs_attr';
export const LEGACY_VISITOR_ID_KEY = 'fastgpt_visitor_id';

export type LegacyAttributionValue = StoredAttribution | StoredAttributionV1;

function getStorage(): Storage | null {
  if (typeof window === 'undefined') return null;
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

function buildSuccess<T>(reason: StorageResult<T>['reason'], value: T): StorageResult<T> {
  return {
    ok: true,
    status: 'localStorage-fallback',
    reason,
    value
  };
}

function buildFailure<T>(reason: StorageResult<T>['reason']): StorageResult<T> {
  return {
    ok: false,
    status: 'unavailable',
    reason,
    value: null
  };
}

export function readLegacyAttribution(): StorageResult<StoredAttributionV1> {
  const storage = getStorage();
  if (!storage) return buildFailure('localStorage-blocked');
  try {
    const raw = storage.getItem(LEGACY_ATTRIBUTION_KEY);
    if (raw === null) return buildFailure('localStorage-missing');
    const decoded = decodeAttribution(raw);
    if (!decoded.ok) return buildFailure('localStorage-malformed');
    return buildSuccess('localStorage-read', decoded.value);
  } catch {
    return buildFailure('localStorage-blocked');
  }
}

export function writeLegacyAttribution(
  value: LegacyAttributionValue
): StorageResult<LegacyAttributionValue> {
  const storage = getStorage();
  if (!storage) return buildFailure('localStorage-blocked');
  try {
    const serialized = JSON.stringify(value);
    storage.setItem(LEGACY_ATTRIBUTION_KEY, serialized);
    storage.setItem(LEGACY_VISITOR_ID_KEY, value.visitor_id);
    return buildSuccess('localStorage-write', value);
  } catch {
    try {
      storage.removeItem(LEGACY_ATTRIBUTION_KEY);
      storage.removeItem(LEGACY_VISITOR_ID_KEY);
    } catch {
      /* ignore cleanup failure */
    }
    return buildFailure('localStorage-blocked');
  }
}

export function clearLegacyAttribution(): StorageResult<null> {
  const storage = getStorage();
  if (!storage) return buildFailure('localStorage-blocked');
  try {
    storage.removeItem(LEGACY_ATTRIBUTION_KEY);
    storage.removeItem(LEGACY_VISITOR_ID_KEY);
    return buildSuccess('localStorage-cleared', null);
  } catch {
    return buildFailure('localStorage-cleanup-blocked');
  }
}
