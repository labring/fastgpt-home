import type { Metadata } from 'next';
import { ComparisonRoute, getComparisonMetadata } from '@/components/compare/ComparisonRoute';
import { comparisonSlugs, resolveCompareLocale } from '@/content/competitor';
import { defaultLocale } from '@/lib/i18n';
import { createRootTechArticleRoute } from '@/app/tech-article-route';

const technicalRoute = createRootTechArticleRoute('compare');

export default async function CompetitorComparisonPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!comparisonSlugs.some((comparisonSlug) => comparisonSlug === slug)) {
    return technicalRoute.Page({ params });
  }
  return <ComparisonRoute locale={resolveCompareLocale(defaultLocale)} slug={slug} />;
}

export function generateStaticParams() {
  return [...comparisonSlugs.map((slug) => ({ slug })), ...technicalRoute.generateStaticParams()];
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!comparisonSlugs.some((comparisonSlug) => comparisonSlug === slug)) {
    return technicalRoute.generateMetadata({ params });
  }
  return getComparisonMetadata(resolveCompareLocale(defaultLocale), slug);
}
