import {
  getIndustryHubParams,
  getIndustrySummaries,
  resolveIndustryLocale
} from '@/lib/industryContent';

export const dynamicParams = false;
export const dynamic = 'force-static';

export function generateStaticParams() {
  return getIndustryHubParams().map(({ lang }) => ({ locale: lang }));
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const resolved = resolveIndustryLocale(locale);
  return resolved
    ? Response.json(getIndustrySummaries(resolved))
    : Response.json({ error: 'Industry locale not found' }, { status: 404 });
}
