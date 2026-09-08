import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  GuidePathRoute,
  getGuidePathParams,
  getGuidePathMetadata
} from '@/components/guide/GuidePathRoute';
import { resolveGuideLocale } from '@/lib/guideSeo';

export default async function LocalizedGuideArticlePage({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;
  const locale = resolveGuideLocale(lang);
  if (!locale) notFound();

  return <GuidePathRoute locale={locale} slug={slug} />;
}

export function generateStaticParams() {
  return getGuidePathParams(true);
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string; slug: string }>;
}): Promise<Metadata> {
  const { lang, slug } = await params;
  const locale = resolveGuideLocale(lang);
  if (!locale) {
    return { title: 'Guide article not found', robots: { index: false, follow: false } };
  }

  return getGuidePathMetadata(locale, slug, false);
}
