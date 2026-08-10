export function canonicalizeUrl(value: string): string {
  if (typeof value !== 'string' || !value) return '';
  try {
    const url = new URL(value);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return '';
    return `${url.origin}${url.pathname}`;
  } catch {
    return '';
  }
}
