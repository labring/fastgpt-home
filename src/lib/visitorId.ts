import { emitStorageDiagnostics, getStorageOptions } from '@/lib/attribution/config';
import {
  getAttributionStorageStatus,
  loadStoredVisitorId
} from '@/lib/attribution/storage/adapter';
import { LEGACY_VISITOR_ID_KEY } from '@/lib/attribution/storage/local-storage';

const VISITOR_ID_MAX_LENGTH = 64;
const VISITOR_ID_PATTERN = /^[A-Za-z0-9._~-]{1,64}$/;

let generatedVisitorId: string | null = null;

function createVisitorId(): string {
  const cryptoApi = globalThis.crypto;
  if (cryptoApi && typeof cryptoApi.randomUUID === 'function') {
    return cryptoApi.randomUUID();
  }

  const random = Math.random().toString(36).slice(2, 12);
  return `fg_${Date.now().toString(36)}_${random}`;
}

function normalizeVisitorId(value?: string | null): string {
  const visitorId = value?.trim() || '';
  return visitorId.length <= VISITOR_ID_MAX_LENGTH && VISITOR_ID_PATTERN.test(visitorId)
    ? visitorId
    : '';
}

function getIncomingVisitorId(): string {
  try {
    return normalizeVisitorId(new URLSearchParams(window.location.search).get('visitor_id'));
  } catch {
    return '';
  }
}

function syncVisitorId(visitorId: string): void {
  try {
    window.localStorage.setItem(LEGACY_VISITOR_ID_KEY, visitorId);
  } catch {
    /* ignore */
  }
}

export function resetGeneratedVisitorId(): void {
  generatedVisitorId = null;
}

export function getVisitorId(): string {
  if (typeof window === 'undefined') return '';

  try {
    const storedVisitorId = normalizeVisitorId(loadStoredVisitorId(getStorageOptions()));
    emitStorageDiagnostics(getAttributionStorageStatus());
    if (storedVisitorId) {
      syncVisitorId(storedVisitorId);
      return storedVisitorId;
    }

    const incomingVisitorId = getIncomingVisitorId();
    if (incomingVisitorId) {
      syncVisitorId(incomingVisitorId);
      return incomingVisitorId;
    }

    if (!generatedVisitorId) generatedVisitorId = createVisitorId();
    syncVisitorId(generatedVisitorId);
    return generatedVisitorId;
  } catch {
    return '';
  }
}
