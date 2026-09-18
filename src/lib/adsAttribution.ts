/**
 * Assembles the nine hidden attribution fields submitted with the Bing Ads
 * landing-page lead form (ADR 0014). URL parameters win per field; the stored
 * last-touch snapshot only fills gaps left by a parameter-less revisit.
 */

export const ADS_CONSENT_VERSION = 'bing-ads-2026-09';
export const ADS_SUBMISSION_SOURCE = 'bing_ads';

export const ADS_ATTRIBUTION_FIELDS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'source_page_path',
  'visitor_id',
  'consent_at',
  'consent_version'
] as const;

export type AdsAttributionFieldName = (typeof ADS_ATTRIBUTION_FIELDS)[number];

export type AdsAttributionFields = Record<AdsAttributionFieldName, string>;

export type AdsUtmParams = Partial<
  Record<'utm_source' | 'utm_medium' | 'utm_campaign' | 'utm_term' | 'utm_content', string>
>;

export interface AdsAttributionInput {
  /** utm parameters taken straight from the landing URL */
  urlUtm: AdsUtmParams;
  /** last-touch utm snapshot from the existing attribution storage, or null */
  storedUtm: AdsUtmParams | null;
  /** current pathname, e.g. /ads/dify-vs-fastgpt */
  sourcePagePath: string;
  visitorId: string;
  /** ISO timestamp captured when the visitor ticked the privacy checkbox */
  consentAt: string;
}

const UTM_FIELD_CAPS: Record<keyof AdsUtmParams, number> = {
  utm_source: 128,
  utm_medium: 128,
  utm_campaign: 256,
  utm_term: 256,
  utm_content: 256
};

function bounded(value: string | undefined, cap: number): string {
  return (value ?? '').trim().slice(0, cap);
}

/**
 * Build exactly the nine attribution fields for the ads lead payload.
 * `consent_version` is the fixed policy constant; every value is trimmed and
 * bounded so the CRM receives the same field shapes as the stored snapshots.
 */
export function buildAdsAttributionFields(input: AdsAttributionInput): AdsAttributionFields {
  const utm = {} as AdsAttributionFields;
  (Object.keys(UTM_FIELD_CAPS) as (keyof AdsUtmParams)[]).forEach((field) => {
    const fromUrl = bounded(input.urlUtm?.[field], UTM_FIELD_CAPS[field]);
    utm[field] = fromUrl || bounded(input.storedUtm?.[field], UTM_FIELD_CAPS[field]);
  });

  return {
    ...utm,
    source_page_path: bounded(input.sourcePagePath, 2048),
    visitor_id: bounded(input.visitorId, 64),
    consent_at: bounded(input.consentAt, 40),
    consent_version: ADS_CONSENT_VERSION
  };
}
