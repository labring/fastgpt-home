import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownRight, ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import type { ComparisonPage as ComparisonPageData, MarkdownBlock } from '@/content/competitor';
import { getDefaultLocalePath, getFaqPath } from '@/lib/localizedRoutes';
import ComparisonTables from './ComparisonTables';

function getInternalLinkHref(target: string, locale: string) {
  const path = locale === 'zh' && target.startsWith('/zh/') ? target.slice('/zh'.length) : target;
  return getDefaultLocalePath(locale, path);
}

function sectionAnchorId(index: number) {
  return `comparison-section-${index + 1}`;
}

function sectionNavLabel(title: string) {
  return title.replace(/^\d+\.\s*/, '').split('：')[0] || title;
}

function renderBlock(block: MarkdownBlock, key: string) {
  if (block.type === 'paragraph') return <p key={key}>{block.text}</p>;
  if (block.type === 'quote') return <blockquote key={key}>{block.text}</blockquote>;
  if (block.type === 'list') {
    return <ul key={key}>{block.items?.map((item, index) => <li key={`${key}-${index}`}>{item}</li>)}</ul>;
  }
  if (block.type === 'heading') {
    const Heading = block.level === 3 ? 'h3' : 'h4';
    return <Heading key={key}>{block.text}</Heading>;
  }
  if (block.type === 'table' && block.table) return <ComparisonTables key={key} table={block.table} />;
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

export default function ComparisonPage({ page, homeLabel }: { page: ComparisonPageData; homeLabel: string }) {
  return (
    <>
      {page.status === 'preview' && (
        <div className="comparison-preview-banner" role="status">
          内容预览 · 页面状态待确认
        </div>
      )}
      <div className="comparison-page-inner">
        <div className="comparison-topline">
          <Link href={getFaqPath('zh')} className="comparison-back-link">
            <ArrowLeft aria-hidden="true" size={15} />
            <span>{homeLabel}</span>
          </Link>
          <span className="comparison-topline-code">FASTGPT / COMPARE</span>
        </div>

        <header className="comparison-hero">
          <div className="comparison-hero-copy">
            <p className="comparison-eyebrow">
              <span className="comparison-eyebrow-mark" aria-hidden="true" />
              <span>FastGPT 选型指南</span>
            </p>
            <h1>{page.title}</h1>
            <p className="comparison-dek">{page.heroSummary}</p>
            <div className="comparison-hero-actions">
              <a className="comparison-button comparison-button-primary" href={`#${sectionAnchorId(1)}`}>
                <span>查看能力矩阵</span>
                <ArrowDownRight aria-hidden="true" size={16} />
              </a>
              <a
                className="comparison-button comparison-button-secondary"
                href={page.officialSource}
                target="_blank"
                rel="noreferrer"
              >
                <span>打开官方资料</span>
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            </div>
          </div>
          <div className="comparison-hero-side">
            <div className="comparison-hero-side-head">
              <span>选型速览</span>
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

        <nav className="comparison-toc" aria-label="页面章节导航">
          <span className="comparison-toc-label">比较维度</span>
          {page.sections.map((section, index) => (
            <a href={`#${sectionAnchorId(index)}`} key={section.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {sectionNavLabel(section.title)}
            </a>
          ))}
        </nav>

        <div className="comparison-intro-grid">
          <aside className="comparison-intro-lead">
            <span className="comparison-section-kicker">核心判断</span>
            <h3>按项目约束做选择</h3>
          </aside>
          <div className="comparison-intro">
            {page.intro.map((block, index) => renderBlock(block, `intro-${index}`))}
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
                {section.blocks.map((block, blockIndex) => renderBlock(block, `${section.id}-${blockIndex}`))}
              </div>
            </section>
          ))}
        </div>

        <section className="comparison-link-panel" aria-labelledby="comparison-next-step">
          <div className="comparison-link-lead">
            <span className="comparison-section-kicker">继续核对</span>
            <h3 id="comparison-next-step">查看部署与采购细节</h3>
          </div>
          <div className="comparison-link-content">
            <p>从私有化、许可和 POC 清单继续核对落地条件。</p>
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

        <section className="comparison-cta" aria-label="继续核验">
          <div>
            <span className="comparison-section-kicker">FastGPT / compare</span>
            <h3>把关键指标写进验收表</h3>
          </div>
          <div className="comparison-cta-actions">
            <a className="comparison-button comparison-button-primary" href={`#${sectionAnchorId(3)}`}>
              <span>设计同条件 POC</span>
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a className="comparison-cta-text-link" href={page.officialSource} target="_blank" rel="noreferrer">
              官方资料入口
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
