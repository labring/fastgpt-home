import { encodeAttribution } from './codec';
import type { StoredAttributionV1 } from './envelope';

export const DEFAULT_ENCODED_BYTE_BUDGET = 3800;

export function encodedByteLength(value: string): number {
  return new TextEncoder().encode(value).byteLength;
}

type CapacityResult =
  | { status: 'ok' | 'degraded'; value: StoredAttributionV1; encoded: string; bytes: number }
  | { status: 'overflow'; value: null; encoded: null; bytes: number };

function clearFields(
  value: StoredAttributionV1,
  fields: string[],
  touches: ('first' | 'last')[]
): void {
  for (const touchName of touches) {
    const target = value[touchName] as unknown as Record<string, unknown>;
    for (const field of fields) {
      if (field in target) target[field] = '';
    }
  }
}

export function encodeWithinBudget(
  input: StoredAttributionV1,
  budget = DEFAULT_ENCODED_BYTE_BUDGET
): CapacityResult {
  const candidate = structuredClone(input);
  let encoded = encodeAttribution(candidate);
  let bytes = encodedByteLength(encoded);
  if (bytes <= budget) return { status: 'ok', value: candidate, encoded, bytes };

  const degradationSteps = [
    { touches: ['last'] as const, fields: ['landing_url', 'referrer'] as const },
    {
      touches: ['last'] as const,
      fields: [
        'utm_campaign',
        'utm_term',
        'utm_content',
        'click_id',
        'utm_source',
        'utm_medium'
      ] as const
    },
    { touches: ['first'] as const, fields: ['landing_url', 'referrer'] as const },
    {
      touches: ['first'] as const,
      fields: [
        'utm_campaign',
        'utm_term',
        'utm_content',
        'click_id',
        'utm_source',
        'utm_medium'
      ] as const
    }
  ];
  for (const step of degradationSteps) {
    clearFields(candidate, [...step.fields], [...step.touches]);
    encoded = encodeAttribution(candidate);
    bytes = encodedByteLength(encoded);
    if (bytes <= budget) return { status: 'degraded', value: candidate, encoded, bytes };
  }
  return { status: 'overflow', value: null, encoded: null, bytes };
}
