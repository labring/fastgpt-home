import registry from './registry.json';

export const GUIDE_LOCALES = ['zh', 'en'] as const;
export type GuideLocale = (typeof GUIDE_LOCALES)[number];
export const GUIDE_SCHEMA_TYPES = ['Article', 'BreadcrumbList', 'HowTo'] as const;
export type GuideSchemaType = (typeof GUIDE_SCHEMA_TYPES)[number];

export type GuideAssetPolicy =
  | { status: 'none' | 'requested-unapproved' | 'source-exception' }
  | { status: 'required'; path: string; alt: string };

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
}

export interface GuideEntry {
  slug: string;
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

function validateSnapshot(slug: string, locale: GuideLocale, value: unknown): asserts value is GuideSourceSnapshot {
  if (!value || typeof value !== 'object') fail(`${slug}:${locale}: missing source snapshot`);
  const snapshot = value as Record<string, unknown>;
  if (!isBasename(snapshot.sourceName)) fail(`${slug}:${locale}: sourceName must be a basename`);
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
  if (
    !Array.isArray(snapshot.schemaTokens) ||
    snapshot.schemaTokens.length < 2 ||
    snapshot.schemaTokens.some((token) => !GUIDE_SCHEMA_TYPES.includes(token as GuideSchemaType))
  ) {
    fail(`${slug}:${locale}: invalid schema tokens`);
  }
  if (!Array.isArray(snapshot.sourceInternalLinkLabels) || !Array.isArray(snapshot.configuredInternalLinks)) {
    fail(`${slug}:${locale}: invalid link directives`);
  }
  const policy = snapshot.assetPolicy as Record<string, unknown> | undefined;
  if (!policy || !['none', 'requested-unapproved', 'source-exception', 'required'].includes(String(policy.status))) {
    fail(`${slug}:${locale}: invalid asset policy`);
  }
  if (policy.status === 'required') {
    if (
      typeof policy.path !== 'string' ||
      !policy.path.startsWith('/') ||
      policy.path.includes('..') ||
      typeof policy.alt !== 'string' ||
      !policy.alt.trim()
    ) {
      fail(`${slug}:${locale}: required asset needs a contained public path and alt`);
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
  if (!value || typeof value !== 'object' || !Array.isArray((value as { entries?: unknown }).entries)) {
    fail('missing entries');
  }
  const entries = (value as { entries: unknown[] }).entries;
  if (entries.length !== 8) fail(`expected eight entries, received ${entries.length}`);
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
    if (keys !== 'en,slug,zh') fail(`${record.slug}: exact zh/en locale pair required`);
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
