import type { DomainReason } from '../primitives/domain';

export type StorageStatus = 'cookie' | 'localStorage-fallback' | 'unavailable';

export type StorageStatusReason =
  | DomainReason
  | 'default-domain'
  | 'matched-domain'
  | 'forced-host-only'
  | 'cookie-write-blocked'
  | 'cookie-read-mismatch'
  | 'cookie-budget-degraded'
  | 'cookie-budget-overflow'
  | 'cookie-removed'
  | 'cookie-remove-blocked'
  | 'localStorage-read'
  | 'localStorage-write'
  | 'localStorage-missing'
  | 'localStorage-malformed'
  | 'localStorage-blocked'
  | 'localStorage-cleared'
  | 'localStorage-cleanup-blocked';

export interface StorageResult<T> {
  ok: boolean;
  status: StorageStatus;
  reason: StorageStatusReason;
  value: T | null;
}
