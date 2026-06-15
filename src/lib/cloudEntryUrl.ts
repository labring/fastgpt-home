import { siteConfig } from '@/config/site';

const CAMPAIGN_KEYS = ['search', 'bd_vid', 'msclkid', 'k'] as const;

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

  const separator = targetUrl.includes('?') ? '&' : '?';
  return `${targetUrl}${separator}${forwarded.toString()}`;
}
