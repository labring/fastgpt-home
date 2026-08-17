import type { Metadata } from 'next';

import { GuideArticleRoute } from '@/components/guide/GuideArticleRoute';
import { guideSlugs } from '@/content/guides/registry';
import { resolveGuideLocale, getGuideArticleMetadata } from '@/lib/guideSeo';
import { defaultLocale } from '@/lib/i18n';

const locale = resolveGuideLocale(defaultLocale) || 'en';
export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GuideArticleRoute locale={locale} slug={slug} />;
}

export function generateStaticParams() {
  return guideSlugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getGuideArticleMetadata(locale, slug);
}
