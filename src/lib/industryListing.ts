export const INDUSTRY_AREAS = {
  finance: { en: 'Finance', zh: '金融' },
  biomed: { en: 'Biopharma', zh: '生物医药' },
  research: { en: 'Scientific Research', zh: '科研' }
} as const;

export type IndustryArea = keyof typeof INDUSTRY_AREAS;
export type IndustrySelection = IndustryArea | 'all';
export type IndustryAreaCounts = Record<IndustrySelection, number>;
export type IndustryBrowseState = { industry: IndustrySelection; page: number };
export type IndustrySummary = {
  slug: string;
  area: IndustryArea;
  title: string;
  description: string;
  href: string;
};

export const INDUSTRY_PAGE_SIZE = 12;

export function isIndustryArea(value: string): value is IndustryArea {
  return Object.hasOwn(INDUSTRY_AREAS, value);
}

export function getIndustryAreaCounts(entries: IndustrySummary[]): IndustryAreaCounts {
  const counts = { all: entries.length, finance: 0, biomed: 0, research: 0 };
  for (const entry of entries) counts[entry.area] += 1;
  return counts;
}

export function getIndustryListing(entries: IndustrySummary[], params: URLSearchParams) {
  const requestedArea = params.get('industry') || 'all';
  const industry: IndustrySelection =
    isIndustryArea(requestedArea) && entries.some((entry) => entry.area === requestedArea)
      ? requestedArea
      : 'all';
  const matching =
    industry === 'all' ? entries : entries.filter((entry) => entry.area === industry);
  const pages = Math.max(1, Math.ceil(matching.length / INDUSTRY_PAGE_SIZE));
  const requestedPage = params.get('page') || '';
  const page =
    /^\d+$/.test(requestedPage) && Number(requestedPage) > 0
      ? Math.min(Number(requestedPage), pages)
      : 1;
  return {
    industry,
    page,
    total: matching.length,
    pages,
    entries: matching.slice((page - 1) * INDUSTRY_PAGE_SIZE, page * INDUSTRY_PAGE_SIZE)
  };
}

export function getIndustryBrowseHref(url: URL, state: IndustryBrowseState) {
  const next = new URL(url);
  if (state.industry === 'all') next.searchParams.delete('industry');
  else next.searchParams.set('industry', state.industry);
  if (state.page === 1) next.searchParams.delete('page');
  else next.searchParams.set('page', String(state.page));
  return `${next.pathname}${next.search}${next.hash}`;
}

/** Validate summaries independently of the cached HTML's publication snapshot. */
export function isIndustrySummaryIndex(
  value: unknown,
  articlePrefix: string
): value is IndustrySummary[] {
  if (!Array.isArray(value)) return false;
  const slugs = new Set<string>();
  for (const entry of value) {
    if (
      !entry ||
      typeof entry !== 'object' ||
      typeof entry.slug !== 'string' ||
      !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.slug) ||
      slugs.has(entry.slug) ||
      typeof entry.area !== 'string' ||
      !isIndustryArea(entry.area) ||
      typeof entry.title !== 'string' ||
      !entry.title.trim() ||
      typeof entry.description !== 'string' ||
      !entry.description.trim() ||
      entry.href !== `${articlePrefix}${entry.slug}`
    )
      return false;
    slugs.add(entry.slug);
  }
  return true;
}
