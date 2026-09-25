import type { Metadata } from 'next';

import { IndustryHubRoute } from '@/components/industry/IndustryHubRoute';
import { resolveIndustryLocale } from '@/lib/industryContent';
import { getIndustryHubMetadata } from '@/lib/industrySeo';
import { currentSiteVariant, getDefaultLocaleForSiteVariant } from '@/lib/siteRouting';

const locale = resolveIndustryLocale(getDefaultLocaleForSiteVariant(currentSiteVariant)) || 'en';

export default function IndustryHubPage() {
  return <IndustryHubRoute locale={locale} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return getIndustryHubMetadata(locale);
}
