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

const sectionLabels = ['产品重心', '能力对照', '许可与边界', '同条件验证', '选型建议'];

function sectionAnchorId(index: number) {
  return `comparison-section-${index + 1}`;
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
        <div className="comparison-topline">
          <Link href={getFaqPath('zh')} className="comparison-back-link">
            <ArrowLeft aria-hidden="true" size={15} />
            <span>{homeLabel}</span>
          </Link>
          <span className="comparison-topline-code">FASTGPT / COMPARE / {page.draftVersion}</span>
        </div>

        <header className="comparison-hero">
          <div className="comparison-hero-copy">
            <p className="comparison-eyebrow">
              <span className="comparison-eyebrow-mark" aria-hidden="true" />
              <span>对比研究 · 中文内容页</span>
            </p>
            <h1>{page.title}</h1>
            <p className="comparison-dek">{page.description}</p>
            <div className="comparison-hero-actions">
              <a className="comparison-button comparison-button-primary" href={`#${sectionAnchorId(1)}`}>
                <span>查看能力矩阵</span>
                <ArrowDownRight aria-hidden="true" size={16} />
              </a>
              <a
                className="comparison-button comparison-button-secondary"
                href={page.officialSources[0]}
                target="_blank"
                rel="noreferrer"
              >
                <span>打开官方资料</span>
                <ExternalLink aria-hidden="true" size={15} />
              </a>
            </div>
            <div className="comparison-hero-meta" aria-label="页面元信息">
              <div>
                <span>核验日期</span>
                <strong>{page.dates.sourceVerifiedOn}</strong>
              </div>
              <div>
                <span>页面版本</span>
                <strong>{page.draftVersion}</strong>
              </div>
              <div>
                <span>章节</span>
                <strong>{page.sections.length} 段</strong>
              </div>
            </div>
          </div>
          <div className="comparison-hero-side">
            <div className="comparison-hero-side-head">
              <span>快速读取</span>
              <span>01—{String(page.sections.length).padStart(2, '0')}</span>
            </div>
            <p>
              先看产品重心与责任边界，再把能力、成本和原厂支持放进同一套验证条件。
            </p>
            <div className="comparison-hero-side-facts">
              <span>能力</span>
              <span>许可证</span>
              <span>支持</span>
              <span>POC</span>
            </div>
            <PageImage page={page} />
          </div>
        </header>

        <nav className="comparison-toc" aria-label="页面章节导航">
          <span className="comparison-toc-label">页面路径</span>
          {page.sections.map((section, index) => (
            <a href={`#${sectionAnchorId(index)}`} key={section.id}>
              <span>{String(index + 1).padStart(2, '0')}</span>
              {sectionLabels[index] || section.title}
            </a>
          ))}
        </nav>

        <div className="comparison-intro-grid">
          <aside className="comparison-intro-lead">
            <span className="comparison-section-kicker">阅读提示</span>
            <h3>先看分野，再做验证</h3>
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
                <span className="comparison-section-kicker">{sectionLabels[index] || '对照章节'}</span>
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
            <span className="comparison-section-kicker">下一步</span>
            <h3 id="comparison-next-step">把判断放回真实环境</h3>
          </div>
          <div className="comparison-link-content">
            <p>把页面里的判断放回真实部署、许可与同条件 POC 环境，沿着这些站内入口继续取证。</p>
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
            <h3>把响应、恢复与升级写进验收表</h3>
          </div>
          <div className="comparison-cta-actions">
            <a className="comparison-button comparison-button-primary" href={`#${sectionAnchorId(3)}`}>
              <span>查看验证方法</span>
              <ArrowRight aria-hidden="true" size={16} />
            </a>
            <a className="comparison-cta-text-link" href={page.officialSources[0]} target="_blank" rel="noreferrer">
              官方资料入口
              <ExternalLink aria-hidden="true" size={14} />
            </a>
          </div>
        </section>

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
