'use client';

import { ArrowUpRight, Workflow } from 'lucide-react';

import CloudEntryLink from '@/components/home/CloudEntryLink';
import { useContactUrl } from '@/components/home/hooks/useContactUrl';
import { RYBBIT_EVENTS, rybbitClickAttrs } from '@/lib/rybbitEvents';

export type ContentSidebarCtaCopy = {
  eyebrow: string;
  title: string;
  description: string;
  consultLabel: string;
  trialLabel: string;
};

type ContentSidebarCtaProps = {
  locale: string;
  copy: ContentSidebarCtaCopy;
  consultSource: string;
  trialSource: string;
  category?: string;
  slug: string;
};

const titleId = 'content-sidebar-cta-title';

const primaryLinkClassName =
  'group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[6px] bg-white px-5 py-2.5 text-[14px] font-semibold leading-5 text-[#070d1d] no-underline transition-[background-color,transform] duration-200 hover:-translate-y-0.5 hover:bg-[#f1f5f9] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#070d1d]';

const secondaryLinkClassName =
  'group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-[6px] border border-white/35 bg-white/5 px-5 py-2.5 text-[14px] font-semibold leading-5 text-white no-underline transition-[background-color,border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-white/55 hover:bg-white/10 active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-[#070d1d]';

export default function ContentSidebarCta({
  locale,
  copy,
  consultSource,
  trialSource,
  category,
  slug
}: ContentSidebarCtaProps) {
  const contactUrl = useContactUrl(locale);
  const trackingProperties = { category, slug };

  return (
    <section
      className="relative overflow-hidden rounded-[8px] bg-[#070d1d] px-6 pb-6 pt-7 text-white shadow-[0_20px_45px_rgba(15,23,42,0.16)]"
      aria-labelledby={titleId}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.45) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.45) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          maskImage: 'linear-gradient(to bottom left, black, transparent 68%)',
          WebkitMaskImage: 'linear-gradient(to bottom left, black, transparent 68%)'
        }}
        aria-hidden="true"
      />

      <div className="relative">
        <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-[8px] bg-white/10">
          <Workflow className="h-5 w-5" strokeWidth={1.7} aria-hidden="true" />
        </div>
        <p className="mb-3 text-[11px] font-semibold leading-4 text-white/60">{copy.eyebrow}</p>
        <p
          id={titleId}
          className="mb-3 text-[24px] font-semibold leading-[32px] text-white [text-wrap:balance]"
        >
          {copy.title}
        </p>
        <p className="mb-6 text-[14px] leading-[22px] text-white/65 [text-wrap:pretty]">
          {copy.description}
        </p>
        <div className="grid gap-3">
          <a
            href={contactUrl}
            data-consultation-trigger="true"
            {...rybbitClickAttrs(
              RYBBIT_EVENTS.businessConsultClick,
              consultSource,
              trackingProperties
            )}
            aria-label={`${copy.consultLabel}: ${copy.title}`}
            className={primaryLinkClassName}
          >
            <span>{copy.consultLabel}</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>
          <CloudEntryLink
            source={trialSource}
            data-rybbit-prop-category={category}
            data-rybbit-prop-slug={slug}
            rel="noopener noreferrer nofollow"
            aria-label={`${copy.trialLabel}: ${copy.title}`}
            className={secondaryLinkClassName}
          >
            <span>{copy.trialLabel}</span>
            <ArrowUpRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </CloudEntryLink>
        </div>
      </div>
    </section>
  );
}
