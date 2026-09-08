import 'server-only';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import TechArticleRoute, {
  generateMetadata as getTechnicalMetadata
} from '@/app/[lang]/[section]/[slug]/page';
import { GuideArticleRoute } from './GuideArticleRoute';
import { getGuideEntry, guideSlugs } from '@/content/guides/registry';
import { getGuideArticleMetadata, getGuideBuildLocales } from '@/lib/guideSeo';
import {
  getTechArticleOwnerParams,
  getTechArticleReviewParams,
  getTechArticle
} from '@/lib/tech-center-content';
import type { GuidePublishedLocale } from '@/lib/guideSeo';

/** Resolve shared /guide/ URLs through their authoritative content registry. */
function resolveOwner(locale: GuidePublishedLocale, slug: string) {
  const guide = getGuideEntry(slug);
  const technical = getTechArticle('guide', slug, locale);
  if (guide && technical) throw new Error(`Duplicate guide route owner: ${locale}/${slug}`);
  return guide ? 'guide' : technical ? 'technical' : null;
}

export function getGuidePathParams(localized: boolean) {
  if (localized) {
    return [
      ...getGuideBuildLocales().flatMap((lang) => guideSlugs.map((slug) => ({ lang, slug }))),
      ...getTechArticleReviewParams()
        .filter(({ section }) => section === 'guide')
        .map(({ lang, slug }) => ({ lang, slug }))
    ];
  }
  return [
    ...new Set([...guideSlugs, ...getTechArticleOwnerParams('guide').map(({ slug }) => slug)])
  ].map((slug) => ({ slug }));
}

export function GuidePathRoute({ locale, slug }: { locale: GuidePublishedLocale; slug: string }) {
  const owner = resolveOwner(locale, slug);
  if (!owner) notFound();
  return owner === 'guide' ? (
    <GuideArticleRoute locale={locale} slug={slug} />
  ) : (
    <TechArticleRoute params={Promise.resolve({ lang: locale, section: 'guide', slug })} />
  );
}

export function getGuidePathMetadata(
  locale: GuidePublishedLocale,
  slug: string,
  indexable: boolean
): Metadata | Promise<Metadata> {
  const owner = resolveOwner(locale, slug);
  if (!owner) return { title: 'Article not found', robots: { index: false, follow: false } };
  return owner === 'guide'
    ? getGuideArticleMetadata(locale, slug, { indexable })
    : getTechnicalMetadata({ params: Promise.resolve({ lang: locale, section: 'guide', slug }) });
}
