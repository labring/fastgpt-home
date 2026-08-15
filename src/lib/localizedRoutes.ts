import { buildDefaultLocale, getDefaultLocalePath } from '@/lib/clientNavigation';
import { getFaqRouteKey, resolveFaqContentId, resolveFaqLocale } from '@/faq';

export { buildDefaultLocale, getDefaultLocalePath };

export function getFaqPath(locale: string, id?: string) {
  if (!id) return getDefaultLocalePath(locale, '/faq');

  const faqLocale = resolveFaqLocale(locale);
  const contentId = resolveFaqContentId(id, faqLocale);
  const routeKey = contentId ? getFaqRouteKey(contentId, faqLocale) : undefined;
  if (!contentId || !routeKey) {
    throw new Error(`Unknown FAQ route identity: ${id} (${faqLocale})`);
  }

  const path = `/faq/${encodeURIComponent(routeKey)}`;
  return getDefaultLocalePath(locale, path);
}
