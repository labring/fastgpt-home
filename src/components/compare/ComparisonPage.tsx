import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import type { ComparisonPage as ComparisonPageData, MarkdownBlock } from '@/content/competitor';
import { getDefaultLocalePath, getFaqPath } from '@/lib/localizedRoutes';
import ComparisonTables from './ComparisonTables';
import { getComparisonCopy } from './comparisonCopy';

function getInternalLinkHref(target: string, locale: string) {
  const path = locale === 'zh' && target.startsWith('/zh/') ? target.slice('/zh'.length) : target;
  return getDefaultLocalePath(locale, path);
}

function sectionAnchorId(index: number) {
  return `comparison-section-${index + 1}`;
}

function sectionNavLabel(title: string) {
  return title.replace(/^\d+\.\s*/, '').split(/[:：]/)[0] || title;
}

function renderBlock(block: MarkdownBlock, key: string, locale: ComparisonPageData['lang']) {
  if (block.type === 'paragraph') return <p key={key}>{block.text}</p>;
  if (block.type === 'quote') return <blockquote key={key}>{block.text}</blockquote>;
  if (block.type === 'list') {
    return <ul key={key}>{block.items?.map((item, index) => <li key={`${key}-${index}`}>{item}</li>)}</ul>;
  }
  if (block.type === 'heading') {
    const Heading = block.level === 3 ? 'h3' : 'h4';
    return <Heading key={key}>{block.text}</Heading>;
  }
  if (block.type === 'table' && block.table) return <ComparisonTables key={key} table={block.table} locale={locale} />;
  return null;
}

function PageImage({ page }: { page: ComparisonPageData }) {
  return (
    <figure className="comparison-hero-figure">
      <Image src={page.asset.path} alt={page.asset.alt} width={page.asset.width} height={page.asset.height} priority />
      <figcaption>{page.asset.alt}</figcaption>
    </figure>
  );
}

export default function ComparisonPage({ page }: { page: ComparisonPageData }) {
  const copy = getComparisonCopy(page.lang);
  const pageCopy = page.ctaCopy || {};

  return (
    <>
      {page.status === 'preview' && (
        <div className="comparison-preview-banner" role="status">
          {copy.previewBanner}
        </div>
      )}
      <div className="comparison-page-inner">
        <div className="comparison-topline">
          <Link href={getFaqPath(page.lang)} className="comparison-back-link">
            <ArrowLeft aria-hidden="true" size={15} />
            <span>{copy.backLabel}</span>
          </Link>
          <span className="comparison-topline-code">FASTGPT / COMPARE</span>
        </div>

        <header className="comparison-hero">
          <div className="comparison-hero-copy">
            <p className="comparison-eyebrow">
              <span className="comparison-eyebrow-mark" aria-hidden="true" />
              <span>{copy.heroEyebrow}</span>
            </p>
            <h1>{page.title}</h1>
            <p className="comparison-dek">{page.heroSummary}</p>
            <div className="comparison-hero-actions">
              <a className="comparison-button comparison-button-primary" href={`#${sectionAnchorId(1)}`}>
                <span>{pageCopy.primaryHeroCta || copy.primaryHeroCta}</span>
                <ArrowDownRight aria-hidden="true" size={16} />
              </a>
              <a
                className="comparison-button comparison-button-secondary"
                href={page.officialSource}
                target="_blank"
                rel="noreferrer"
              >
                <span>{pageCopy.secondaryHeroCta || copy.secondaryHeroCta}</span>
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            </div>
            {!!page.trustSignals?.length && (
              <div className="comparison-trust-strip" aria-label={copy.trustStripAriaLabel}>
                {page.trustSignals.map((signal) => (
                  <span key={signal}>{signal}</span>
                ))}
              </div>
            )}
          </div>
          <div className="comparison-hero-side">
            <div className="comparison-hero-side-head">
              <span>{copy.heroSideLabel}</span>
              <span>01—{String(page.sections.length).padStart(2, '0')}</span>
            </div>
            <div className="comparison-hero-highlights">
              {page.heroHighlights.map((highlight) => (
                <div key={`${highlight.label}-${highlight.value}`}>
                  <span>{highlight.label}</span>
                  <strong>{highlight.value}</strong>
                </div>
              ))}
            </div>
            <PageImage page={page} />
          </div>
        </header>

        <nav className="comparison-toc" aria-label={copy.tocAriaLabel}>
          <span className="comparison-toc-label">{copy.tocLabel}</span>
          {page.sections.map((section, index) => (
            <a href={`#${sectionAnchorId(index)}`} key={section.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {sectionNavLabel(section.title)}
            </a>
          ))}
        </nav>

        <div className="comparison-intro-grid">
          <aside className="comparison-intro-lead">
            <span className="comparison-section-kicker">{copy.coreKicker}</span>
            <h3>{copy.coreTitle}</h3>
          </aside>
          <div className="comparison-intro">
            {page.intro.map((block, index) => renderBlock(block, `intro-${index}`, page.lang))}
            {!!page.contextualLinks?.length && (
              <nav className="comparison-context-links" aria-label={copy.contextLinksAriaLabel}>
                <span>{copy.contextLinksLabel}</span>
                <div>
                  {page.contextualLinks.map((link) => (
                    <a href={getInternalLinkHref(link.target, link.locale)} key={`${link.target}-${link.label}`}>
                      {link.label}
                      <ArrowRight aria-hidden="true" size={14} />
                    </a>
                  ))}
                </div>
              </nav>
            )}
          </div>
        </div>

        <div className="comparison-sections">
          {page.sections.map((section, index) => (
            <section className="comparison-section" id={sectionAnchorId(index)} key={section.id}>
              <div className="comparison-section-lead">
                <span className="comparison-section-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="comparison-section-kicker">{sectionNavLabel(section.title)}</span>
                <h2>{section.title}</h2>
              </div>
              <div className="comparison-section-content">
                {section.blocks.map((block, blockIndex) => renderBlock(block, `${section.id}-${blockIndex}`, page.lang))}
              </div>
            </section>
          ))}
        </div>

        <section className="comparison-link-panel" aria-labelledby="comparison-next-step">
          <div className="comparison-link-lead">
            <span className="comparison-section-kicker">{copy.nextStepKicker}</span>
            <h3 id="comparison-next-step">{pageCopy.nextStepTitle || copy.nextStepTitle}</h3>
          </div>
          <div className="comparison-link-content">
            <p>{pageCopy.nextStepDescription || copy.nextStepDescription}</p>
            <div className="comparison-link-grid">
              {page.internalLinks.map((link) => (
                <a href={getInternalLinkHref(link.target, link.locale)} key={`${link.target}-${link.label}`}>
                  <span>{link.label}</span>
                  <ArrowRight aria-hidden="true" size={16} />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="comparison-cta" aria-label={copy.ctaAriaLabel}>
          <div>
            <span className="comparison-section-kicker">{copy.ctaKicker}</span>
            <h3>{pageCopy.ctaTitle || copy.ctaTitle}</h3>
          </div>
          <div className="comparison-cta-actions">
            <a className="comparison-button comparison-button-primary" href={`#${sectionAnchorId(3)}`}>
              <span>{pageCopy.ctaButton || copy.ctaButton}</span>
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a className="comparison-cta-text-link" href={page.officialSource} target="_blank" rel="noreferrer">
              {copy.officialSourceLink}
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
