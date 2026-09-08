import type { Metadata } from 'next';

import {
  GuidePathRoute,
  getGuidePathParams,
  getGuidePathMetadata
} from '@/components/guide/GuidePathRoute';
import { resolveGuideLocale } from '@/lib/guideSeo';
import { defaultLocale } from '@/lib/i18n';

const locale = resolveGuideLocale(defaultLocale) || 'en';
export default async function GuideArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <GuidePathRoute locale={locale} slug={slug} />;
}

export function generateStaticParams() {
  return getGuidePathParams(false);
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return getGuidePathMetadata(locale, slug, true);
}
