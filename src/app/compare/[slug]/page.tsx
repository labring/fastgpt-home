import type { Metadata } from 'next';
import { ComparisonRoute, getComparisonMetadata } from '@/components/compare/ComparisonRoute';
import { comparisonSlugs, resolveCompareLocale } from '@/content/competitor';
import { defaultLocale } from '@/lib/i18n';

export default async function CompetitorComparisonPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <ComparisonRoute locale={resolveCompareLocale(defaultLocale)} slug={slug} />;
}

export function generateStaticParams() {
  return comparisonSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getComparisonMetadata(resolveCompareLocale(defaultLocale), slug);
}
