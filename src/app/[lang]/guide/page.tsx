import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { GuideHubRoute } from '@/components/guide/GuideHubRoute';
import { getGuideBuildLocales, getGuideHubMetadata, resolveGuideLocale } from '@/lib/guideSeo';

export default async function LocalizedGuideHubPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveGuideLocale(lang);
  if (!locale) notFound();

  return <GuideHubRoute locale={locale} />;
}

export function generateStaticParams() {
  return getGuideBuildLocales().map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveGuideLocale(lang);
  if (!locale) {
    return { title: 'Guide hub not found', robots: { index: false, follow: false } };
  }

  return getGuideHubMetadata(locale, { indexable: false });
}
