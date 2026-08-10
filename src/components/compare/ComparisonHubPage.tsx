import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { CompareLocale } from '@/content/competitor';
import { getComparisonPagesForLocale } from '@/content/competitor';
import { getDefaultLocalePath } from '@/lib/localizedRoutes';
import { getComparisonHubCopy } from './comparisonHubCopy';

function getHubPageHref(locale: CompareLocale, slug: string) {
  return getDefaultLocalePath(locale, `/compare/${slug}`);
}

function getHubImagePath(slug: string) {
  return `/images/compare/${slug}.svg`;
}

export default function ComparisonHubPage({ locale }: { locale: CompareLocale }) {
  const copy = getComparisonHubCopy(locale);
  const pages = getComparisonPagesForLocale(locale);
  const featuredPages = ['dify-vs-fastgpt', 'ragflow-vs-fastgpt']
    .map((slug) => pages.find((page) => page.slug === slug))
    .filter((page): page is (typeof pages)[number] => Boolean(page));

  return (
    <div className="comparison-hub-inner">
      <div className="comparison-hub-topline">
        <span className="comparison-hub-topline-code">FASTGPT / COMPARE</span>
        <span>{copy.pageCountLabel}</span>
      </div>

      <header className="comparison-hub-hero">
        <p className="comparison-eyebrow">
          <span className="comparison-eyebrow-mark" aria-hidden="true" />
          <span>{copy.heroEyebrow}</span>
        </p>
        <div className="comparison-hub-hero-grid">
          <div className="comparison-hub-hero-copy">
            <h1>{copy.heroTitle}</h1>
            <p>{copy.heroDescription}</p>
            <div className="comparison-hub-trust-strip" aria-label={copy.trustStripAriaLabel}>
              <span>{locale === 'zh' ? '基于官方公开资料' : 'Based on official public sources'}</span>
              <span>{locale === 'zh' ? '按同条件 POC 验收' : 'Validated through same-condition POC'}</span>
              <span>{locale === 'zh' ? '持续同步 canonical' : 'Canonical and hreflang aligned'}</span>
            </div>
          </div>
          <div className="comparison-hub-feature">
            <span className="comparison-section-kicker">{copy.compareLabel}</span>
            <h2>{copy.relatedTitle}</h2>
            <p>{copy.relatedDescription}</p>
            <div className="comparison-hub-mini-grid">
              {featuredPages.map((page) => (
                <Link href={getHubPageHref(locale, page.slug)} key={page.slug} className="comparison-hub-mini-card">
                  <span>{page.title}</span>
                  <ArrowRight aria-hidden="true" size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </header>

      <section className="comparison-hub-grid" aria-label={copy.compareLabel}>
        {pages.map((page, index) => (
          <Link
            href={getHubPageHref(locale, page.slug)}
            className="comparison-hub-card"
            key={page.slug}
          >
            <div className="comparison-hub-card-head">
              <span className="comparison-hub-card-index">{String(index + 1).padStart(2, '0')}</span>
              <span>{copy.cardPrefix}</span>
            </div>
            <Image
              src={getHubImagePath(page.slug)}
              alt={page.asset.alt}
              width={page.asset.width}
              height={page.asset.height}
            />
            <div className="comparison-hub-card-copy">
              <h2>{page.title}</h2>
              <p>{page.description}</p>
              <span className="comparison-hub-card-cta">
                {copy.cardCta}
                <ArrowRight aria-hidden="true" size={15} />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
