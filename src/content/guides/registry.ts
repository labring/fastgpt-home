import policy from './policy.json';
import registry from './registry.json';

export const GUIDE_LOCALES = policy.locales as unknown as readonly ['zh', 'en'];
export type GuideLocale = (typeof GUIDE_LOCALES)[number];
export const GUIDE_PUBLICATION_GROUPS = policy.publicationGroups as unknown as readonly [
  'decision',
  'implementation',
  'industry'
];
export type GuidePublicationGroup = (typeof GUIDE_PUBLICATION_GROUPS)[number];
export type GuideIsoDate = `${number}-${number}-${number}`;
export const GUIDE_ASSET_STATUSES = policy.assetStatuses as unknown as readonly [
  'none',
  'requested-unapproved',
  'source-exception',
  'required'
];
export type GuideAssetStatus = (typeof GUIDE_ASSET_STATUSES)[number];
export const GUIDE_SCHEMA_TYPES = policy.schemaTypes as unknown as readonly [
  'Article',
  'BreadcrumbList',
  'HowTo'
];
export type GuideSchemaType = (typeof GUIDE_SCHEMA_TYPES)[number];
export const GUIDE_ENTRY_COUNT = policy.entryCount;

export type GuideAssetPolicy =
  | { status: Exclude<GuideAssetStatus, 'required'> }
  | { status: 'required'; path: string; alt: string; width: number; height: number };

export interface GuideInternalLinkMapping {
  label: string;
  target: string;
}

export interface GuideSourceSnapshot {
  sourceName: string;
  sourceSha256: string;
  bodySha256: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonical: string;
  hreflang: string;
  schemaTokens: GuideSchemaType[];
  sourceSchema: string;
  sourceImageDirective: string;
  sourceInternalLinkLabels: string[];
  assetPolicy: GuideAssetPolicy;
  configuredInternalLinks: GuideInternalLinkMapping[];
  datePublished: GuideIsoDate;
  dateModified: GuideIsoDate;
}

export interface GuideEntry {
  slug: string;
  group: GuidePublicationGroup;
  zh: GuideSourceSnapshot;
  en: GuideSourceSnapshot;
}

function fail(message: string): never {
  throw new Error(`Guide registry: ${message}`);
}

function isBasename(value: unknown): value is string {
  return (
    typeof value === 'string' &&
    value.length > 0 &&
    value === value.split('/').pop() &&
    !value.includes('\\') &&
    !value.includes('..')
  );
}

function isGuideSourceName(slug: string, locale: GuideLocale, value: unknown): value is string {
  return isBasename(value) && value === `${slug}.${locale}.md`;
}

function isGuideIsoDate(value: unknown): value is GuideIsoDate {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split('-').map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));
  return (
    date.getUTCFullYear() === year && date.getUTCMonth() === month - 1 && date.getUTCDate() === day
  );
}

function validateSnapshot(
  slug: string,
  locale: GuideLocale,
  value: unknown
): asserts value is GuideSourceSnapshot {
  if (!value || typeof value !== 'object') fail(`${slug}:${locale}: missing source snapshot`);
  const snapshot = value as Record<string, unknown>;
  if (!isGuideSourceName(slug, locale, snapshot.sourceName)) {
    fail(`${slug}:${locale}: sourceName must be ${slug}.${locale}.md`);
  }
  for (const field of [
    'sourceSha256',
    'bodySha256',
    'h1',
    'metaTitle',
    'metaDescription',
    'keywords',
    'canonical',
    'hreflang',
    'sourceSchema',
    'sourceImageDirective'
  ]) {
    if (typeof snapshot[field] !== 'string') fail(`${slug}:${locale}: invalid ${field}`);
  }
  if (!isGuideIsoDate(snapshot.datePublished)) fail(`${slug}:${locale}: invalid datePublished`);
  if (!isGuideIsoDate(snapshot.dateModified)) fail(`${slug}:${locale}: invalid dateModified`);
  if (snapshot.dateModified < snapshot.datePublished) {
    fail(`${slug}:${locale}: dateModified precedes datePublished`);
  }
  if (
    !Array.isArray(snapshot.schemaTokens) ||
    snapshot.schemaTokens.length < 2 ||
    snapshot.schemaTokens.some((token) => !GUIDE_SCHEMA_TYPES.includes(token as GuideSchemaType))
  ) {
    fail(`${slug}:${locale}: invalid schema tokens`);
  }
  if (
    !Array.isArray(snapshot.sourceInternalLinkLabels) ||
    !Array.isArray(snapshot.configuredInternalLinks)
  ) {
    fail(`${slug}:${locale}: invalid link directives`);
  }
  const policy = snapshot.assetPolicy as Record<string, unknown> | undefined;
  if (!policy || !GUIDE_ASSET_STATUSES.includes(policy.status as GuideAssetStatus)) {
    fail(`${slug}:${locale}: invalid asset policy`);
  }
  if (policy.status === 'required') {
    if (
      typeof policy.path !== 'string' ||
      !policy.path.startsWith('/') ||
      policy.path.includes('..') ||
      typeof policy.alt !== 'string' ||
      !policy.alt.trim() ||
      typeof policy.width !== 'number' ||
      typeof policy.height !== 'number' ||
      !Number.isInteger(policy.width) ||
      !Number.isInteger(policy.height) ||
      policy.width <= 0 ||
      policy.height <= 0
    ) {
      fail(
        `${slug}:${locale}: required asset needs a contained public path, alt, and positive dimensions`
      );
    }
  }
  for (const mapping of snapshot.configuredInternalLinks as unknown[]) {
    if (!mapping || typeof mapping !== 'object') fail(`${slug}:${locale}: invalid configured link`);
    const link = mapping as Record<string, unknown>;
    if (
      typeof link.label !== 'string' ||
      !snapshot.sourceInternalLinkLabels.includes(link.label) ||
      typeof link.target !== 'string'
    ) {
      fail(`${slug}:${locale}: configured link needs an exact source label and target`);
    }
  }
}

function validateRegistry(value: unknown): asserts value is { entries: GuideEntry[] } {
  if (
    !value ||
    typeof value !== 'object' ||
    !Array.isArray((value as { entries?: unknown }).entries)
  ) {
    fail('missing entries');
  }
  const entries = (value as { entries: unknown[] }).entries;
  if (entries.length !== GUIDE_ENTRY_COUNT) {
    fail(`expected ${GUIDE_ENTRY_COUNT} entries, received ${entries.length}`);
  }
  const slugs = new Set<string>();
  for (const entry of entries) {
    if (!entry || typeof entry !== 'object') fail('invalid entry');
    const record = entry as Record<string, unknown>;
    if (typeof record.slug !== 'string' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug)) {
      fail('slug must be lower-case kebab-case');
    }
    if (slugs.has(record.slug)) fail(`${record.slug}: duplicate slug`);
    slugs.add(record.slug);
    const keys = Object.keys(record).sort().join(',');
    if (keys !== 'en,group,slug,zh')
      fail(`${record.slug}: exact zh/en locale pair and group required`);
    if (!GUIDE_PUBLICATION_GROUPS.includes(record.group as GuidePublicationGroup)) {
      fail(`${record.slug}: invalid publication group`);
    }
    for (const locale of GUIDE_LOCALES) validateSnapshot(record.slug, locale, record[locale]);
  }
}

validateRegistry(registry);

export const guideEntries = registry.entries as GuideEntry[];
export const guideSlugs = guideEntries.map((entry) => entry.slug);

export function getGuideEntry(slug: string): GuideEntry | undefined {
  return guideEntries.find((entry) => entry.slug === slug);
}

export function getGuideSource(slug: string, locale: GuideLocale): GuideSourceSnapshot | undefined {
  return getGuideEntry(slug)?.[locale];
}
