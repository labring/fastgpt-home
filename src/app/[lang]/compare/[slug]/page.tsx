import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComparisonRoute, getComparisonMetadata } from '@/components/compare/ComparisonRoute';
import { comparisonSlugs } from '@/content/competitor';

export default async function CompetitorComparisonPage({
  params
}: {
  params: Promise<{ lang?: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const langName = lang || 'zh';
  if (langName !== 'zh') notFound();
  return <ComparisonRoute locale="zh" slug={slug} />;
}

export async function generateStaticParams() {
  return comparisonSlugs.map((slug) => ({ lang: 'zh', slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const langName = lang || 'zh';
  if (langName !== 'zh') {
    return { title: 'Comparison page not found', robots: { index: false, follow: false } };
  }
  return getComparisonMetadata('zh', slug, { indexable: false });
}
