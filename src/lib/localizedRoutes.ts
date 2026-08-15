import { buildDefaultLocale, getDefaultLocalePath } from '@/lib/clientNavigation';
import { getEnglishFaqCanonicalSlug, resolveFaqLocale } from '@/faq';

export { buildDefaultLocale, getDefaultLocalePath };

export function getFaqPath(locale: string, id?: string) {
  const canonicalId =
    id && resolveFaqLocale(locale) === 'en' ? getEnglishFaqCanonicalSlug(id) || id : id;
  const path = canonicalId ? `/faq/${encodeURIComponent(canonicalId)}` : '/faq';
  return getDefaultLocalePath(locale, path);
}
