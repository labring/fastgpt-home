import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { IndustryHubRoute } from '@/components/industry/IndustryHubRoute';
import { getIndustryHubParams, resolveIndustryLocale } from '@/lib/industryContent';
import { getIndustryHubMetadata } from '@/lib/industrySeo';
import { currentSiteVariant } from '@/lib/siteRouting';

export default async function LocalizedIndustryHubPage({
  params
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = resolveIndustryLocale(lang);
  if (!locale) notFound();
  return <IndustryHubRoute locale={locale} />;
}

export function generateStaticParams() {
  return getIndustryHubParams(currentSiteVariant);
}

export const dynamicParams = false;

export async function generateMetadata({
  params
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const locale = resolveIndustryLocale(lang);
  return locale
    ? getIndustryHubMetadata(locale, { indexable: false })
    : { title: 'Industry hub not found', robots: { index: false, follow: false } };
}
