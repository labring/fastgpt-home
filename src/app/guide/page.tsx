import type { Metadata } from 'next';

import { GuideHubRoute } from '@/components/guide/GuideHubRoute';
import { defaultLocale } from '@/lib/i18n';
import { getGuideHubMetadata, resolveGuideLocale } from '@/lib/guideSeo';

const locale = resolveGuideLocale(defaultLocale) || 'en';

export default async function GuideHubRootPage() {
  return <GuideHubRoute locale={locale} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return getGuideHubMetadata(locale);
}
