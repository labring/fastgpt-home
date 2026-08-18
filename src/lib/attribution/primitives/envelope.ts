import type { ChannelL1, StoredAttribution, TouchPoint } from '../../leadAttribution';

export { ATTRIBUTION_QUERY_KEYS } from '../query.mjs';

export const FIELD_CAPS = {
  visitor_id: 64,
  channel_l2: 128,
  source: 128,
  label: 160,
  utm_source: 128,
  utm_medium: 128,
  utm_campaign: 256,
  utm_term: 256,
  utm_content: 256,
  click_id: 256,
  referrer: 2048,
  landing_url: 2048,
  at: 40
} as const;

export type StoredAttributionV1 = StoredAttribution & { v: 1 };
export type ValidationFailureReason =
  | 'not-object'
  | 'unknown-version'
  | 'missing-field'
  | 'invalid-visitor-id'
  | 'invalid-channel'
  | 'invalid-paid-flag'
  | 'invalid-timestamp'
  | 'field-too-long'
  | 'invalid-field'
  | 'unknown-field'
  | 'mismatched-visitor-id';

export type ValidationResult<T> =
  | { ok: true; value: T }
  | { ok: false; reason: ValidationFailureReason; path?: string };

const CHANNELS: readonly ChannelL1[] = [
  'paid_search',
  'paid_feed',
  'paid_social',
  'organic_search',
  'organic_social',
  'llm',
  'referral',
  'owned',
  'direct'
];
const TOUCH_FIELDS = [
  'channel_l1',
  'channel_l2',
  'is_paid',
  'label',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'click_id',
  'referrer',
  'landing_url',
  'at'
] as const;
const OPTIONAL_TOUCH_FIELDS = ['source'] as const;
const TOP_LEVEL_FIELDS = ['v', 'visitor_id', 'first', 'last'] as const;
const TOUCH_EXTRA_FIELDS = ['visitor_id'] as const;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function validIso(value: string): boolean {
  return (
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d{3})?Z$/.test(value) &&
    Number.isFinite(Date.parse(value))
  );
}

function canonicalizeTouchPoint(value: Record<string, unknown>): TouchPoint {
  return {
    channel_l1: value.channel_l1 as ChannelL1,
    channel_l2: value.channel_l2 as string,
    is_paid: value.is_paid as boolean,
    label: value.label as string,
    utm_source: value.utm_source as string,
    utm_medium: value.utm_medium as string,
    utm_campaign: value.utm_campaign as string,
    utm_term: value.utm_term as string,
    utm_content: value.utm_content as string,
    click_id: value.click_id as string,
    referrer: value.referrer as string,
    landing_url: value.landing_url as string,
    at: value.at as string
  };
}

function validateTouchPoint(
  value: unknown,
  path: string,
  expectedVisitorId?: string
): ValidationResult<TouchPoint> {
  if (!isRecord(value)) return { ok: false, reason: 'not-object', path };
  for (const key of Object.keys(value)) {
    if (
      !TOUCH_FIELDS.includes(key as (typeof TOUCH_FIELDS)[number]) &&
      !OPTIONAL_TOUCH_FIELDS.includes(key as (typeof OPTIONAL_TOUCH_FIELDS)[number]) &&
      !TOUCH_EXTRA_FIELDS.includes(key as 'visitor_id')
    ) {
      return { ok: false, reason: 'unknown-field', path: `${path}.${key}` };
    }
  }
  if ('visitor_id' in value) {
    if (typeof value.visitor_id !== 'string' || !/^[A-Za-z0-9._~-]{1,64}$/.test(value.visitor_id)) {
      return { ok: false, reason: 'invalid-visitor-id', path: `${path}.visitor_id` };
    }
    if (expectedVisitorId && value.visitor_id !== expectedVisitorId) {
      return { ok: false, reason: 'mismatched-visitor-id', path: `${path}.visitor_id` };
    }
  }
  for (const key of TOUCH_FIELDS) {
    if (!(key in value)) return { ok: false, reason: 'missing-field', path: `${path}.${key}` };
  }
  if (!CHANNELS.includes(value.channel_l1 as ChannelL1))
    return { ok: false, reason: 'invalid-channel', path: `${path}.channel_l1` };
  if (typeof value.is_paid !== 'boolean')
    return { ok: false, reason: 'invalid-paid-flag', path: `${path}.is_paid` };
  for (const key of TOUCH_FIELDS) {
    if (key === 'channel_l1' || key === 'is_paid') continue;
    if (typeof value[key] !== 'string')
      return { ok: false, reason: 'invalid-field', path: `${path}.${key}` };
    const cap = FIELD_CAPS[key];
    if (value[key].length > cap)
      return { ok: false, reason: 'field-too-long', path: `${path}.${key}` };
  }
  if ('source' in value) {
    if (typeof value.source !== 'string') return { ok: false, reason: 'invalid-field', path: `${path}.source` };
    if (value.source.length > FIELD_CAPS.source) return { ok: false, reason: 'field-too-long', path: `${path}.source` };
  }
  if (!validIso(value.at as string))
    return { ok: false, reason: 'invalid-timestamp', path: `${path}.at` };
  return { ok: true, value: canonicalizeTouchPoint(value) };
}

export function validateStoredAttribution(value: unknown): ValidationResult<StoredAttributionV1> {
  if (!isRecord(value)) return { ok: false, reason: 'not-object' };
  for (const key of Object.keys(value)) {
    if (!TOP_LEVEL_FIELDS.includes(key as (typeof TOP_LEVEL_FIELDS)[number])) {
      return { ok: false, reason: 'unknown-field', path: key };
    }
  }
  if ('v' in value && value.v !== 1) return { ok: false, reason: 'unknown-version', path: 'v' };
  if (typeof value.visitor_id !== 'string' || !/^[A-Za-z0-9._~-]{1,64}$/.test(value.visitor_id)) {
    return { ok: false, reason: 'invalid-visitor-id', path: 'visitor_id' };
  }
  if (!('first' in value) || !('last' in value)) return { ok: false, reason: 'missing-field' };
  const first = validateTouchPoint(value.first, 'first', value.visitor_id);
  if (!first.ok) return first;
  const last = validateTouchPoint(value.last, 'last', value.visitor_id);
  if (!last.ok) return last;
  return {
    ok: true,
    value: { v: 1, visitor_id: value.visitor_id, first: first.value, last: last.value }
  };
}
