import { buildDefaultLocale, getDefaultLocalePath } from '@/lib/clientNavigation';

export { buildDefaultLocale, getDefaultLocalePath };

export function getFaqPath(locale: string, id?: string) {
  if (!id) return getDefaultLocalePath(locale, '/faq');

  // Server FAQ routes resolve contentId with resolveFaqContentId/getFaqRouteKey and reject
  // Unknown FAQ route identity values before rendering.
  const path = `/faq/${encodeURIComponent(id)}`;
  return getDefaultLocalePath(locale, path);
}
