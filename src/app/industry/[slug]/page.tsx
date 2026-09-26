import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { IndustryArticleRoute } from '@/components/industry/IndustryArticleRoute';
import { getIndustryArticleForRoot, getIndustryOwnerParams } from '@/lib/industryContent';
import { getIndustryArticleMetadata } from '@/lib/industrySeo';
import { currentSiteVariant } from '@/lib/siteRouting';

export default async function IndustryArticlePage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getIndustryArticleForRoot(slug);
  if (!article) notFound();
  return <IndustryArticleRoute article={article} />;
}

export function generateStaticParams() {
  return getIndustryOwnerParams(currentSiteVariant);
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getIndustryArticleForRoot(slug);
  return article ? getIndustryArticleMetadata(article) : { title: 'Industry article not found' };
}
