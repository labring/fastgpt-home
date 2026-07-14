import { siteConfig } from '@/config/site';
import { getAttributionPayload, trackVisit } from '@/lib/leadAttribution';

const CAMPAIGN_KEYS = ['search', 'bd_vid', 'msclkid', 'k'] as const;

function appendAttributionParams(params: URLSearchParams) {
  trackVisit();
  const source = getAttributionPayload();
  if (source.visitor_id) params.set('source', JSON.stringify(source));
}

export function buildCloudEntryUrl(
  source: string,
  search = '',
  targetUrl = siteConfig.userUrl
) {
  const incoming = new URLSearchParams(search);
  const forwarded = new URLSearchParams();

  CAMPAIGN_KEYS.forEach((key) => {
    const value = incoming.get(key);
    if (value) forwarded.set(key, value);
  });
  forwarded.set('fastgpt_source', source);
  appendAttributionParams(forwarded);

  const separator = targetUrl.includes('?') ? '&' : '?';
  return `${targetUrl}${separator}${forwarded.toString()}`;
}
