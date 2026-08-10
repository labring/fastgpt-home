import type { StoredAttribution } from '../../leadAttribution';
import {
  validateStoredAttribution,
  type StoredAttributionV1,
  type ValidationFailureReason
} from './envelope';

export type DecodeResult =
  | { ok: true; value: StoredAttributionV1 }
  | { ok: false; reason: ValidationFailureReason | 'invalid-encoding' | 'invalid-json' };

export function encodeAttribution(value: StoredAttribution): string {
  const result = validateStoredAttribution(value);
  if (!result.ok) throw new TypeError(`Invalid attribution envelope: ${result.reason}`);
  return encodeURIComponent(JSON.stringify(result.value));
}

function parseJsonCandidate(candidate: string): { ok: true; value: unknown } | { ok: false } {
  try {
    return { ok: true, value: JSON.parse(candidate) as unknown };
  } catch {
    return { ok: false };
  }
}

export function decodeAttribution(encoded: string): DecodeResult {
  const raw = parseJsonCandidate(encoded);
  if (raw.ok) {
    const result = validateStoredAttribution(raw.value);
    return result.ok ? result : { ok: false, reason: result.reason };
  }

  let decoded: string;
  try {
    decoded = decodeURIComponent(encoded);
  } catch {
    return { ok: false, reason: 'invalid-encoding' };
  }

  const parsed = parseJsonCandidate(decoded);
  if (!parsed.ok) return { ok: false, reason: 'invalid-json' };
  const result = validateStoredAttribution(parsed.value);
  return result.ok ? result : { ok: false, reason: result.reason };
}
