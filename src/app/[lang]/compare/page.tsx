import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ComparisonHubRoute, getComparisonHubMetadata } from '@/components/compare/ComparisonHubRoute';

export default async function CompareHubLocalizedPage({
  params
}: {
  params: Promise<{ lang?: string }>;
}) {
  const { lang } = await params;
  if ((lang || 'zh') !== 'zh') notFound();
  return <ComparisonHubRoute locale="zh" />;
}

export async function generateStaticParams() {
  return [{ lang: 'zh' }];
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if ((lang || 'zh') !== 'zh') {
    return { title: 'Comparison hub not found', robots: { index: false, follow: false } };
  }
  return getComparisonHubMetadata('zh', { indexable: false });
}
