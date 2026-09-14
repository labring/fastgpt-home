import 'server-only';

import { adsLandingPages, type AdsLandingPage } from '@/content/ads/pages';
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
const ALLOWED_READING_HOSTS = new Set(['fastgpt.cn', 'solutions.fastgpt.cn']);

function fail(slug: string, detail: string): never {
  throw new Error(`[ads] Invalid landing registry entry "${slug}": ${detail}`);
}

function requireText(slug: string, field: string, value: unknown) {
  if (typeof value !== 'string' || !value.trim()) {
    fail(slug, `${field} must be a non-empty string`);
  }
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
    requireText(slug, `readingLinks[${index}].url`, link?.url);
    let parsed: URL;
    try {
      parsed = new URL(link.url);
    } catch {
      return fail(slug, `readingLinks[${index}].url must be an absolute URL`);
    }
    if (parsed.protocol !== 'https:' || !ALLOWED_READING_HOSTS.has(parsed.hostname)) {
      fail(
        slug,
        `readingLinks[${index}].url must be a public https URL on ${[...ALLOWED_READING_HOSTS].join(' or ')}`
      );
    }
  });
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
