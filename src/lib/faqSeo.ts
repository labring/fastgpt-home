import 'server-only';

import type { Metadata } from 'next';
import { faqContentLocaleCodes, getFaqRouteKey, resolveFaqLocale } from '@/faq';
import { getLocaleHreflang, getOwnedFaqUrl, isPreviewSite } from '@/lib/siteRouting';
import { getDefaultLocalePath } from '@/lib/clientNavigation';
import type { LanguageSwitchPaths } from '@/lib/languageNavigation';

/** Project the same FAQ identity authority into interactive navigation URLs. */
export function getFaqLanguageSwitchPaths(
  contentId: string,
  availableLocales: readonly string[]
): LanguageSwitchPaths {
  return Object.fromEntries(
    availableLocales.flatMap((locale) => {
      const routeKey = getFaqRouteKey(contentId, locale);
      if (!routeKey) return [];
      return [
        [
          locale,
          isPreviewSite
            ? getDefaultLocalePath(locale, `/faq/${encodeURIComponent(routeKey)}`)
            : getOwnedFaqUrl(locale, routeKey)
        ]
      ];
    })
  );
}

/** Generate FAQ canonical and hreflang metadata from the FAQ identity authority. */
export function getFaqAlternates(
  lang: string,
  contentId?: string,
  availableLocales: readonly string[] = faqContentLocaleCodes
): Metadata['alternates'] {
  const currentLocale = resolveFaqLocale(lang);
  const publishedLocales = Array.from(
    new Set(
      availableLocales
        .map((locale) => resolveFaqLocale(locale))
        .filter((locale) => faqContentLocaleCodes.includes(locale))
    )
  );
  if (!publishedLocales.includes(currentLocale)) publishedLocales.push(currentLocale);

  const routeKey = contentId ? getFaqRouteKey(contentId, currentLocale) : undefined;
  if (contentId && !routeKey) {
    throw new Error(`FAQ alternate identity is unpublished: ${contentId} (${currentLocale})`);
  }

  const canonical = getOwnedFaqUrl(currentLocale, routeKey);
  const languages = publishedLocales.reduce((acc, locale) => {
    const targetRouteKey = contentId ? getFaqRouteKey(contentId, locale) : undefined;
    if (contentId && !targetRouteKey) return acc;
    acc[getLocaleHreflang(locale)] = getOwnedFaqUrl(locale, targetRouteKey);
    return acc;
  }, {} as Record<string, string>);

  const englishRouteKey = contentId
    ? getFaqRouteKey(contentId, 'en')
    : publishedLocales.includes('en')
    ? undefined
    : null;
  if (contentId ? englishRouteKey : publishedLocales.includes('en')) {
    languages['x-default'] = getOwnedFaqUrl('en', englishRouteKey || undefined);
  }

  return {
    canonical,
    languages
  };
}
