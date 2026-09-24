'use client';

import CloudEntryLink from '@/components/home/CloudEntryLink';
import { useContactUrl } from '@/components/home/hooks/useContactUrl';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

type BlogArticleCtaProps = {
  locale: string;
  title: string;
  description: string;
  consultLabel: string;
  trialLabel: string;
  category: string;
  slug: string;
};

export default function BlogArticleCta({
  locale,
  title,
  description,
  consultLabel,
  trialLabel,
  category,
  slug
}: BlogArticleCtaProps) {
  const contactUrl = useContactUrl(locale);
  const trackingProperties = { category, slug };

  return (
    <div className="rounded-2xl bg-blue-50 p-4 text-ink shadow-sm">
      <p className="m-0 text-base font-medium text-balance">{title}</p>
      <p className="m-0 mt-2 text-sm">{description}</p>
      <div className="mt-2 flex flex-col gap-2">
        <a
          href={contactUrl}
          data-consultation-trigger="true"
          {...rybbitClickAttrs(
            RYBBIT_EVENTS.businessConsultClick,
            'blog_article_sidebar_consult',
            trackingProperties
          )}
          aria-label={`${consultLabel}: ${title}`}
          className="inline-flex min-h-8 w-full items-center justify-center rounded-full bg-btn-dark px-4 py-1.5 text-xs font-medium text-white transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-btn-dark focus-visible:ring-offset-2"
        >
          {consultLabel}
        </a>
        <CloudEntryLink
          source="blog_article_sidebar_trial"
          data-rybbit-prop-category={category}
          data-rybbit-prop-slug={slug}
          rel="noopener noreferrer nofollow"
          aria-label={`${trialLabel}: ${title}`}
          className="inline-flex min-h-8 w-full items-center justify-center rounded-full bg-white px-4 py-1.5 text-xs font-medium text-ink ring-1 ring-black/10 transition-colors hover:bg-white/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
        >
          {trialLabel}
        </CloudEntryLink>
      </div>
    </div>
  );
}
