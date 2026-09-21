import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import AdsLandingPage from '@/components/ads/AdsLandingPage';
import { getAdsCanonicalUrl, getAdsPage, getAdsPageSlugs } from '@/content/ads/loader';
import { getRobotsPolicy } from '@/lib/seo';

/**
 * Bing Ads one-keyword-one-page landings (/ads/{slug}).
 *
 * Paid-traffic pages: noindex,follow, self-canonical on the China production
 * owner, absent from the sitemap and site navigation (see ADR 0013).
 *
 * All build variants render these routes because a static export build fails
 * when generateStaticParams() returns an empty array ("With output: export, at
 * least one route must be generated"); scripts/clean-locale-output.js strips
 * /ads/ from the io (international) export afterwards, so the io artifact
 * ships none.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return getAdsPageSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getAdsPage(slug);
  if (!page) {
    return { robots: getRobotsPolicy(false, false) };
  }

  return {
    title: `${page.h1} · FastGPT`,
    description: page.subtitle,
    robots: getRobotsPolicy(false, true),
    alternates: { canonical: getAdsCanonicalUrl(slug) },
    // The root layout ships site-wide OpenGraph/Twitter cards; the approved ad
    // landing design carries none of them.
    openGraph: null,
    twitter: null
  };
}

export default async function AdsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const page = getAdsPage(slug);
  if (!page) notFound();

  return <AdsLandingPage page={page} />;
}
