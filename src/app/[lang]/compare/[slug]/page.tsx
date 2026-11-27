import type { Metadata } from 'next';
import { ComparisonRoute, getComparisonMetadata } from '@/components/compare/ComparisonRoute';
import { comparisonSlugs } from '@/content/competitor';
import TechArticleRoute, {
  generateMetadata as generateTechArticleMetadata
} from '@/app/[lang]/[section]/[slug]/page';
import { getTechArticleReviewParams } from '@/lib/tech-center-content';

export default async function CompetitorComparisonPage({
  params
}: {
  params: Promise<{ lang?: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const langName = lang || 'zh';
  if (langName === 'zh' && comparisonSlugs.some((comparisonSlug) => comparisonSlug === slug)) {
    return <ComparisonRoute locale="zh" slug={slug} />;
  }
  return TechArticleRoute({
    params: Promise.resolve({ lang: langName, section: 'compare', slug })
  });
}

export async function generateStaticParams() {
  return [
    ...comparisonSlugs.map((slug) => ({ lang: 'zh', slug })),
    ...getTechArticleReviewParams().filter(({ section }) => section === 'compare')
  ];
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang?: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const langName = lang || 'zh';
  if (langName === 'zh' && comparisonSlugs.some((comparisonSlug) => comparisonSlug === slug)) {
    return getComparisonMetadata('zh', slug, { indexable: false });
  }
  return generateTechArticleMetadata({
    params: Promise.resolve({ lang: langName, section: 'compare', slug })
  });
}
