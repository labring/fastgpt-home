import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GuideArticleRoute } from '@/components/guide/GuideArticleRoute';
import { guideSlugs } from '@/content/guides/registry';
import { getGuideArticleMetadata, getGuideBuildLocales, resolveGuideLocale } from '@/lib/guideSeo';

export default async function LocalizedGuideArticlePage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = resolveGuideLocale(lang);
  if (!locale || !guideSlugs.includes(slug)) notFound();

  return <GuideArticleRoute locale={locale} slug={slug} />;
}

export function generateStaticParams() {
  return getGuideBuildLocales().flatMap((lang) => guideSlugs.map((slug) => ({ lang, slug })));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveGuideLocale(lang);
  if (!locale || !guideSlugs.includes(slug)) {
    return { title: 'Guide article not found', robots: { index: false, follow: false } };
  }

  return getGuideArticleMetadata(locale, slug, { indexable: false });
}
