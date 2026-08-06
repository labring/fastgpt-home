import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import type { ComparisonPage as ComparisonPageData, ComparisonTable, MarkdownBlock } from '@/content/competitor';
import { getDefaultLocalePath, getFaqPath } from '@/lib/localizedRoutes';
import ComparisonTables from './ComparisonTables';

function getInternalLinkHref(target: string, locale: string) {
  const path = locale === 'zh' && target.startsWith('/zh/') ? target.slice('/zh'.length) : target;
  return getDefaultLocalePath(locale, path);
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
          预览页面 · 等待产品、销售、法务三方签发 · 页面暂不进入公开分发
        </div>
      )}
      <div className="comparison-page-inner">
        <Link href={getFaqPath('zh')} className="comparison-back-link">
          <span aria-hidden="true">←</span>
          <span>{homeLabel}</span>
        </Link>
        <header className="comparison-hero">
          <p className="comparison-eyebrow">FastGPT · 选型研究</p>
          <h1>{page.title}</h1>
          <p className="comparison-dek">{page.description}</p>
          <div className="comparison-meta-line">
            <span>核验日期 {page.dates.sourceVerifiedOn}</span>
            <span>版本 {page.draftVersion}</span>
            <span>中文内容页</span>
          </div>
        </header>

        <PageImage page={page} />

        <div className="comparison-intro">
          {page.intro.map((block, index) => renderBlock(block, `intro-${index}`))}
        </div>

        <div className="comparison-sections">
          {page.sections.map((section) => (
            <section className="comparison-section" key={section.id}>
              <h2>{section.title}</h2>
              <div className="comparison-section-content">
                {section.blocks.map((block, index) => renderBlock(block, `${section.id}-${index}`))}
              </div>
            </section>
          ))}
        </div>

        <aside className="comparison-link-panel">
          <h3>继续核验</h3>
          <p>把页面里的判断放回真实部署、许可与同条件 POC 环境，沿着这些站内入口继续取证。</p>
          <div className="comparison-link-grid">
            {page.internalLinks.map((link) => (
              <a href={getInternalLinkHref(link.target, link.locale)} key={`${link.target}-${link.label}`}>
                <span>{link.label}</span>
                <ExternalLink aria-hidden="true" size={16} />
              </a>
            ))}
          </div>
        </aside>

        <footer className="comparison-source-footer">
          <h3>事实来源与复核</h3>
          <dl>
            <div><dt>事实来源</dt><dd>{page.sourceFooter.source}</dd></div>
            <div><dt>核验日期</dt><dd>{page.sourceFooter.verifiedOn}</dd></div>
            <div><dt>版本与套餐</dt><dd>{page.sourceFooter.version}</dd></div>
            <div><dt>更新记录</dt><dd>{page.sourceFooter.updateRecord}</dd></div>
          </dl>
          <div className="comparison-official-sources">
            <span>官方资料入口</span>
            {page.officialSources.map((source) => <a href={source} key={source} rel="noreferrer">{source}<ExternalLink aria-hidden="true" size={14} /></a>)}
          </div>
          <p className="comparison-review-note">下一次复核日期：{page.dates.nextReviewOn}。页面状态：{page.status === 'published' ? '已发布' : '预览审核中'}。</p>
        </footer>
      </div>
    </>
  );
}

export { renderBlock };
