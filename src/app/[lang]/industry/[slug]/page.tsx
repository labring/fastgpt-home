import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { IndustryArticleRoute } from '@/components/industry/IndustryArticleRoute';
import {
  getIndustryArticle,
  getIndustryReviewParams,
  resolveIndustryLocale
} from '@/lib/industryContent';
import { getIndustryArticleMetadata } from '@/lib/industrySeo';
import { currentSiteVariant } from '@/lib/siteRouting';

export default async function LocalizedIndustryArticlePage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = resolveIndustryLocale(lang);
  if (!locale) notFound();
  return <IndustryArticleRoute locale={locale} slug={slug} />;
}

export function generateStaticParams() {
  return getIndustryReviewParams(currentSiteVariant);
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveIndustryLocale(lang);
  const article = locale ? getIndustryArticle(locale, slug) : undefined;
  return article
    ? getIndustryArticleMetadata(article, false)
    : { title: 'Industry article not found', robots: { index: false, follow: false } };
}
