export const ATTRIBUTION_QUERY_KEYS = Object.freeze([
  'source',
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'click_id'
]);

export const ATTRIBUTION_QUERY_VALUE_CAPS = Object.freeze({
  source: 128,
  utm_source: 128,
  utm_medium: 128,
  utm_campaign: 256,
  utm_term: 256,
  utm_content: 256,
  click_id: 256
});

export function getForwardedAttributionQuery(search = '') {
  const incoming = new URLSearchParams(search);
  const forwarded = new URLSearchParams();

  for (const key of ATTRIBUTION_QUERY_KEYS) {
    const value = incoming.get(key)?.trim().slice(0, ATTRIBUTION_QUERY_VALUE_CAPS[key]);
    if (value) forwarded.set(key, value);
  }

  return forwarded.toString();
}

export function appendForwardedAttributionQuery(path, search = '') {
  const hashIndex = path.indexOf('#');
  const hash = hashIndex === -1 ? '' : path.slice(hashIndex);
  const pathname = (hashIndex === -1 ? path : path.slice(0, hashIndex)).split('?')[0];
  const query = getForwardedAttributionQuery(search);

  return `${pathname}${query ? `?${query}` : ''}${hash}`;
}
