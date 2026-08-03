import { siteConfig } from '@/config/site';
import { getVisitorId } from '@/lib/visitorId';

const CAMPAIGN_KEYS = ['search', 'bd_vid', 'msclkid', 'k'] as const;

function appendVisitorId(params: URLSearchParams) {
  const visitorId = getVisitorId();
  if (visitorId) params.set('visitor_id', visitorId);
}

export function buildCloudEntryUrl(search = '', targetUrl = siteConfig.userUrl) {
  const incoming = new URLSearchParams(search);
  const forwarded = new URLSearchParams();

  CAMPAIGN_KEYS.forEach((key) => {
    const value = incoming.get(key);
    if (value) forwarded.set(key, value);
  });
  appendVisitorId(forwarded);

  const separator = targetUrl.includes('?') ? '&' : '?';
  return `${targetUrl}${separator}${forwarded.toString()}`;
}
