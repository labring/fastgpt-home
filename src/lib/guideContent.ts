import 'server-only';

import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import {
  GUIDE_LOCALES,
  getGuideSource,
  type GuideLocale,
  type GuideSourceSnapshot
} from '@/content/guides/registry';

const GUIDE_ROOT = path.join(process.cwd(), 'src', 'content', 'guides');

export interface GuideDeliveryMetadata {
  slug: string;
  canonical: string;
  hreflang: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  sourceSchema: string;
  sourceImageDirective: string;
  sourceInternalLinkLabels: string[];
}

export interface GuideDocument {
  body: string;
  metadata: GuideDeliveryMetadata;
  source: GuideSourceSnapshot;
}

function guideError(slug: string, message: string): never {
  throw new Error(`Guide ${slug}: ${message}`);
}

function sha256(value: string) {
  return crypto.createHash('sha256').update(value).digest('hex');
}

function requireField(slug: string, fields: Record<string, string>, name: string) {
  const value = fields[name];
  if (value === undefined) guideError(slug, `missing ${name}`);
  return value;
}

export function normalizeGuideSource(source: string) {
  return source.replace(/\r\n?/g, '\n');
}

export function parseGuideDeliverySource(source: string, expected: GuideSourceSnapshot): GuideDocument {
  const normalized = normalizeGuideSource(source);
  const match = normalized.match(/^(<!--[\s\S]*?-->)([\s\S]*)$/);
  if (!match || !match[2].startsWith('\n\n#')) {
    guideError(expected.sourceName, 'expected one leading delivery comment followed by \\n\\n#');
  }
  const lines = match[1].slice(4, -3).split('\n');
  const fields: Record<string, string> = {};
  for (const line of lines) {
    const colon = line.indexOf(':');
    if (colon > 0) fields[line.slice(0, colon).trim()] = line.slice(colon + 1).trim();
  }
  const body = match[2];
  const metadata: GuideDeliveryMetadata = {
    slug: requireField(expected.sourceName, fields, 'slug'),
    canonical: requireField(expected.sourceName, fields, 'canonical'),
    hreflang: requireField(expected.sourceName, fields, 'hreflang'),
    metaTitle: requireField(expected.sourceName, fields, 'Meta title'),
    metaDescription: requireField(expected.sourceName, fields, 'Meta description'),
    keywords: requireField(expected.sourceName, fields, 'keywords'),
    sourceSchema: requireField(expected.sourceName, fields, '结构化数据'),
    sourceImageDirective: requireField(expected.sourceName, fields, '配图需求'),
    sourceInternalLinkLabels: requireField(expected.sourceName, fields, '内链').split(' / ')
  };
  const h1 = body.match(/^\n\n# (.+)$/m)?.[1];
  const matches = [
    ['slug', metadata.slug, expected.canonical.split('/').pop()],
    ['canonical', metadata.canonical, expected.canonical],
    ['hreflang', metadata.hreflang, expected.hreflang],
    ['Meta title', metadata.metaTitle, expected.metaTitle],
    ['Meta description', metadata.metaDescription, expected.metaDescription],
    ['keywords', metadata.keywords, expected.keywords],
    ['schema', metadata.sourceSchema, expected.sourceSchema],
    ['image directive', metadata.sourceImageDirective, expected.sourceImageDirective],
    ['H1', h1, expected.h1],
    ['source hash', sha256(source), expected.sourceSha256],
    ['body hash', sha256(body), expected.bodySha256]
  ];
  for (const [label, actual, required] of matches) {
    if (actual !== required) guideError(expected.sourceName, `${label} differs from registry`);
  }
  if (metadata.sourceInternalLinkLabels.join('\u0000') !== expected.sourceInternalLinkLabels.join('\u0000')) {
    guideError(expected.sourceName, 'internal-link labels differ from registry');
  }
  return { body, metadata, source: expected };
}

function resolveGuidePath(slug: string, locale: GuideLocale, sourceName: string) {
  if (
    path.isAbsolute(sourceName) ||
    sourceName !== path.basename(sourceName) ||
    sourceName.includes('..') ||
    sourceName.includes('\\')
  ) {
    guideError(slug, 'unsafe source filename');
  }
  const localeRoot = path.resolve(GUIDE_ROOT, locale);
  const sourcePath = path.resolve(localeRoot, sourceName);
  if (!sourcePath.startsWith(`${localeRoot}${path.sep}`)) guideError(slug, 'source escapes locale root');
  return sourcePath;
}

export function readGuideDocument(slug: string, locale: GuideLocale): GuideDocument {
  if (!GUIDE_LOCALES.includes(locale)) guideError(slug, 'unsupported locale');
  const expected = getGuideSource(slug, locale);
  if (!expected) guideError(slug, 'unknown slug');
  const sourcePath = resolveGuidePath(slug, locale, expected.sourceName);
  let source: string;
  try {
    source = fs.readFileSync(sourcePath, 'utf8');
  } catch (error) {
    guideError(slug, `cannot read ${expected.sourceName}: ${(error as Error).message}`);
  }
  return parseGuideDeliverySource(source, expected);
}
