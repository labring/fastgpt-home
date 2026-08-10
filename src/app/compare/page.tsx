import type { Metadata } from 'next';
import { ComparisonHubRoute, getComparisonHubMetadata } from '@/components/compare/ComparisonHubRoute';
import { resolveCompareLocale } from '@/content/competitor';
import { defaultLocale } from '@/lib/i18n';

export default async function CompareHubPage() {
  return <ComparisonHubRoute locale={resolveCompareLocale(defaultLocale)} />;
}

export async function generateMetadata(): Promise<Metadata> {
  return getComparisonHubMetadata(resolveCompareLocale(defaultLocale));
}
