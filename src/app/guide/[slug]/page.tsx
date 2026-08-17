import type { Metadata } from 'next';

import { GuideArticleRoute } from '@/components/guide/GuideArticleRoute';
import { resolveGuideLocale, getGuideArticleMetadata } from '@/lib/guideSeo';
import { defaultLocale } from '@/lib/i18n';

const locale = resolveGuideLocale(defaultLocale) || 'en';
const tracerSlug = 'saas-platform-enterprise-gaps';

export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GuideArticleRoute locale={locale} slug={slug} />;
}

export function generateStaticParams() {
  return [{ slug: tracerSlug }];
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
