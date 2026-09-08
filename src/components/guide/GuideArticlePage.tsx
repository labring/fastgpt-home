import Image from 'next/image';
import Link from 'next/link';

import ContentSidebarCta, { type ContentSidebarCtaCopy } from '@/components/ContentSidebarCta';
import guideStyles from '@/components/guide/GuideArticlePage.module.css';
import MarkdownContent, { getMarkdownHeadings } from '@/components/tech-center/MarkdownContent';
import techStyles from '@/components/tech-center/TechArticlePage.module.css';
import type { GuideDocument } from '@/lib/guideContent';
import { getGuideReviewPath, type GuidePublishedLocale } from '@/lib/guideSeo';
import { parseMarkdown } from '@/lib/markdownParser';
import { getDefaultLocalePath } from '@/lib/localizedRoutes';

const guideArticleCopy = {
  en: {
    home: 'Home',
    guide: 'Guide',
    breadcrumb: 'Breadcrumb',
    back: 'Back to guides',
    onThisPage: 'On this page',
    configuredLinks: 'Related resources',
    updated: (date: string) =>
      `Last updated ${new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(`${date}T00:00:00Z`))}`
  },
  zh: {
    home: '首页',
    guide: '指南',
    breadcrumb: '面包屑',
    back: '返回指南',
    onThisPage: '本页内容',
    configuredLinks: '相关资源',
    updated: (date: string) => `更新于 ${formatGuideDate(date, 'zh')}`
  }
} as const;

function formatGuideDate(date: string, locale: GuidePublishedLocale) {
  const [year, month, day] = date.split('-').map(Number);
  return locale === 'zh'
    ? `${year}年${month}月${day}日`
    : new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }).format(new Date(Date.UTC(year, month - 1, day)));
}

export function getGuideArticleCopy(locale: GuidePublishedLocale) {
  return guideArticleCopy[locale];
}

export default function GuideArticlePage({
  document,
  locale,
  cta
}: {
  document: GuideDocument;
  locale: GuidePublishedLocale;
  cta: ContentSidebarCtaCopy;
}) {
  const labels = getGuideArticleCopy(locale);
  const { assetPolicy, configuredInternalLinks } = document.source;
  const blocks = parseMarkdown(document.body, document.source.h1);
  const headings = getMarkdownHeadings(blocks, 'guide-section');

  return (
    <main className={`${techStyles.page} ${guideStyles.page}`}>
      <div className={`${techStyles.container} ${guideStyles.container}`}>
        <nav
          className={`${techStyles.breadcrumbs} ${guideStyles.breadcrumbs}`}
          aria-label={labels.breadcrumb}
        >
          <Link href={getDefaultLocalePath(locale)}>{labels.home}</Link>
          <span aria-hidden="true">/</span>
          <Link href={getGuideReviewPath(locale)}>{labels.guide}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{document.source.h1}</span>
        </nav>
        <header className={`${techStyles.header} ${guideStyles.header}`}>
          <h1>{document.source.h1}</h1>
          <p className={`${techStyles.summary} ${guideStyles.summary}`}>
            {document.source.metaDescription}
          </p>
          <time
            className={`${techStyles.updated} ${guideStyles.updated}`}
            dateTime={document.source.dateModified}
          >
            {labels.updated(document.source.dateModified)}
          </time>
        </header>
        <div className={`${techStyles.layout} ${guideStyles.layout}`}>
          <article className={`${techStyles.article} ${guideStyles.article}`}>
            {assetPolicy.status === 'required' && (
              <figure className={techStyles.heroFigure}>
                <Image
                  src={assetPolicy.path}
                  alt={assetPolicy.alt}
                  width={assetPolicy.width}
                  height={assetPolicy.height}
                  sizes="(max-width: 620px) calc(100vw - 68px), (max-width: 1080px) calc(100vw - 128px), 720px"
                />
                <figcaption>{assetPolicy.alt}</figcaption>
              </figure>
            )}
            <MarkdownContent
              blocks={blocks}
              markdown={document.body}
              title={document.source.h1}
              headingIdPrefix="guide-section"
            />
            {configuredInternalLinks.length > 0 && (
              <section
                className={techStyles.related}
                aria-labelledby="guide-configured-links-title"
              >
                <div className={techStyles.relatedHeader}>
                  <h2 id="guide-configured-links-title">{labels.configuredLinks}</h2>
                </div>
                <div className={techStyles.relatedList}>
                  {configuredInternalLinks.map((link) => (
                    <Link className={techStyles.relatedLink} href={link.target} key={link.target}>
                      {link.label}
                      <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
            <nav aria-label={labels.back}>
              <p className={techStyles.returnLink}>
                <Link href={getGuideReviewPath(locale)}>{labels.back}</Link>
              </p>
            </nav>
          </article>
          <aside className={guideStyles.sidebar} aria-label={cta.title}>
            <ContentSidebarCta
              locale={locale}
              copy={cta}
              consultSource="guide_article_sidebar_consult"
              trialSource="guide_article_sidebar_trial"
              slug={document.metadata.slug}
            />
            {headings.length > 0 && (
              <nav className={guideStyles.toc} aria-label={labels.onThisPage}>
                <p className={guideStyles.tocTitle}>{labels.onThisPage}</p>
                <ol>
                  {headings.map((heading) => (
                    <li
                      className={heading.level > 2 ? guideStyles.tocNested : undefined}
                      key={heading.id}
                    >
                      <a href={'#' + heading.id}>{heading.text}</a>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </aside>
        </div>
      </div>
    </main>
  );
}
