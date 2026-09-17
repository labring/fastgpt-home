import { getTechnicalPageIdentity } from '@/components/tech-center/types';
import relatedLinks from '@/content/related-links.json';
import { getTechnicalReviewPath } from '@/lib/technicalRouting';

export type RelatedLink = { label: string; target: string };

const configuredLinks: Record<string, RelatedLink[]> = relatedLinks;

// Reverse links from a published page back to the tool page it explains.
// Targets are authored as locale-prefixed slugs; routes resolve per Site Variant, as stage returns do.
// ponytail: one lookup hop, move to a graph only if a page needs directed pairs.
export function getRelatedLinks(slug: string): RelatedLink[] {
  return (configuredLinks[slug] ?? []).map((link) => {
    const { locale, canonicalPath } = getTechnicalPageIdentity({ slug: link.target });
    return { label: link.label, target: getTechnicalReviewPath(locale, canonicalPath) };
  });
}
