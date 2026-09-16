import 'server-only';

import {
  adsLandingPages,
  type AdsCaseSection,
  type AdsComparisonTable,
  type AdsLandingPage,
  type AdsWhySection
} from '@/content/ads/pages';
import { getSiteBaseUrl } from '@/lib/siteRouting';

/**
 * Build-time gate for the Bing Ads landing registry. Invalid registry data must
 * fail the build here so half-finished pages never reach the static export.
 *
 * The ads group is a paid-traffic surface: every build variant renders the
 * routes (static export requires non-empty static params), and the io
 * (international) export is stripped of /ads/ afterwards by
 * scripts/clean-locale-output.js.
 */

const ADS_SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const ALLOWED_PUBLIC_HOSTS = new Set(['fastgpt.cn', 'solutions.fastgpt.cn']);

function fail(slug: string, detail: string): never {
  throw new Error(`[ads] Invalid landing registry entry "${slug}": ${detail}`);
}

function requireText(slug: string, field: string, value: unknown) {
  if (typeof value !== 'string' || !value.trim()) {
    fail(slug, `${field} must be a non-empty string`);
  }
}

function requirePublicUrl(slug: string, field: string, value: unknown) {
  requireText(slug, field, value);
  let parsed: URL;
  try {
    parsed = new URL(value as string);
  } catch {
    return fail(slug, `${field} must be an absolute URL`);
  }
  if (parsed.protocol !== 'https:' || !ALLOWED_PUBLIC_HOSTS.has(parsed.hostname)) {
    fail(slug, `${field} must be a public https URL on ${[...ALLOWED_PUBLIC_HOSTS].join(' or ')}`);
  }
}

function validateComparisonTable(slug: string, table: AdsComparisonTable) {
  if (!Array.isArray(table.rows) || table.rows.length === 0) {
    fail(slug, 'comparisonTable.rows must hold at least one dimension');
  }
  table.rows.forEach((row, index) => {
    requireText(slug, `comparisonTable.rows[${index}].dimension`, row?.dimension);
    requireText(slug, `comparisonTable.rows[${index}].dify`, row?.dify);
    requireText(slug, `comparisonTable.rows[${index}].fastgpt`, row?.fastgpt);
  });
  requireText(slug, 'comparisonTable.sourceNote', table.sourceNote);
  requireText(slug, 'comparisonTable.sourceLabel', table.sourceLabel);
  requirePublicUrl(slug, 'comparisonTable.sourceUrl', table.sourceUrl);
}

function validateWhySection(slug: string, why: AdsWhySection) {
  if (why.title !== undefined) requireText(slug, 'why.title', why.title);
  if (why.subtitle !== undefined) requireText(slug, 'why.subtitle', why.subtitle);
  if (!Array.isArray(why.cards) || why.cards.length !== 3) {
    fail(slug, 'why.cards must contain exactly 3 capability cards');
  }
  why.cards.forEach((card, index) => {
    requireText(slug, `why.cards[${index}].title`, card?.title);
    requireText(slug, `why.cards[${index}].body`, card?.body);
    if (card?.verdict !== undefined) {
      requireText(slug, `why.cards[${index}].verdict`, card.verdict);
    }
  });
}

function validateCaseSection(slug: string, cases: AdsCaseSection) {
  if (cases.badge !== undefined) requireText(slug, 'cases.badge', cases.badge);
  if (cases.title !== undefined) requireText(slug, 'cases.title', cases.title);
  if (cases.subtitle !== undefined) requireText(slug, 'cases.subtitle', cases.subtitle);
  if (!Array.isArray(cases.cards) || cases.cards.length !== 3) {
    fail(slug, 'cases.cards must contain exactly 3 published customer cases');
  }
  cases.cards.forEach((card, index) => {
    if (card?.org !== undefined) requireText(slug, `cases.cards[${index}].org`, card.org);
    requireText(slug, `cases.cards[${index}].title`, card?.title);
    requireText(slug, `cases.cards[${index}].metrics`, card?.metrics);
    requireText(slug, `cases.cards[${index}].image`, card?.image);
    if (card?.url !== undefined) {
      requirePublicUrl(slug, `cases.cards[${index}].url`, card.url);
    }
  });
}

function validateAdsLandingPage(page: AdsLandingPage) {
  const { slug } = page;
  requireText(slug, 'slug', slug);

  if (!ADS_SLUG_PATTERN.test(slug)) {
    fail(slug, 'slug must be lowercase kebab-case');
  }

  requireText(slug, 'category', page.category);
  requireText(slug, 'keywordGroup', page.keywordGroup);
  requireText(slug, 'h1', page.h1);
  requireText(slug, 'subtitle', page.subtitle);
  if (page.checklistSubtitle !== undefined) {
    requireText(slug, 'checklistSubtitle', page.checklistSubtitle);
  }
  requireText(slug, 'trustLine', page.trustLine);
  requireText(slug, 'leadMagnet', page.leadMagnet);
  requireText(slug, 'updatedAt', page.updatedAt);
  requireText(slug, 'form.title', page.form?.title);
  requireText(slug, 'form.subtitle', page.form?.subtitle);
  requireText(slug, 'form.button', page.form?.button);

  if (!Array.isArray(page.sections) || page.sections.length !== 3) {
    fail(slug, 'sections must contain exactly 3 progressive paragraphs');
  }
  page.sections.forEach((section, index) => {
    requireText(slug, `sections[${index}].heading`, section?.heading);
    requireText(slug, `sections[${index}].body`, section?.body);
  });

  if (!Array.isArray(page.readingLinks) || page.readingLinks.length !== 3) {
    fail(slug, 'readingLinks must contain exactly 3 deep-reading entries');
  }
  page.readingLinks.forEach((link, index) => {
    requireText(slug, `readingLinks[${index}].label`, link?.label);
    requirePublicUrl(slug, `readingLinks[${index}].url`, link?.url);
  });

  if (page.comparisonTable) validateComparisonTable(slug, page.comparisonTable);
  if (page.why) validateWhySection(slug, page.why);
  if (page.cases) validateCaseSection(slug, page.cases);
}

const slugSeen = new Set<string>();
adsLandingPages.forEach(validateAdsLandingPage);
adsLandingPages.forEach(({ slug }) => {
  if (slugSeen.has(slug)) fail(slug, 'slug is duplicated in the ads registry');
  slugSeen.add(slug);
});

/** All registered landing slugs; the /ads/[slug] static-param source. */
export function getAdsPageSlugs(): string[] {
  return adsLandingPages.map((page) => page.slug);
}

/** Resolve one landing page by slug; unknown slugs render via notFound(). */
export function getAdsPage(slug: string): AdsLandingPage | undefined {
  return adsLandingPages.find((page) => page.slug === slug);
}

/**
 * Canonical URL always points at the China-site production owner, even in
 * preview builds, matching the owned-URL convention of the other review surfaces.
 */
export function getAdsCanonicalUrl(slug: string): string {
  return `${getSiteBaseUrl('cn')}/ads/${slug}`;
}
