import Link from 'next/link';

import ContentSidebarCta, { type ContentSidebarCtaCopy } from '@/components/ContentSidebarCta';
import guideStyles from '@/components/guide/GuideArticlePage.module.css';
import MarkdownContent, { getMarkdownHeadings } from '@/components/tech-center/MarkdownContent';
import techStyles from '@/components/tech-center/TechArticlePage.module.css';
import type { IndustryArticle, IndustryLocale } from '@/lib/industryContent';
import { getIndustryPath } from '@/lib/industryContent';
import { getReviewLocalePath } from '@/lib/siteRouting';
import { parseMarkdown } from '@/lib/markdownParser';

const copy = {
  en: {
    home: 'Home',
    industry: 'Industry',
    breadcrumbs: 'Breadcrumbs',
    updated: 'Last updated',
    onThisPage: 'On this page'
  },
  zh: {
    home: '首页',
    industry: '行业问题',
    breadcrumbs: '面包屑',
    updated: '更新于',
    onThisPage: '本页内容'
  }
} as const;

function formatDate(date: string, locale: IndustryLocale) {
  const [year, month, day] = date.split('-').map(Number);
  return locale === 'zh'
    ? `${year}年${month}月${day}日`
    : new Intl.DateTimeFormat('en-US', { timeZone: 'UTC', dateStyle: 'long' }).format(
        new Date(Date.UTC(year, month - 1, day))
      );
}

export default function IndustryArticlePage({
  article,
  locale,
  cta
}: {
  article: IndustryArticle;
  locale: IndustryLocale;
  cta: ContentSidebarCtaCopy;
}) {
  const labels = copy[locale];
  const blocks = parseMarkdown(article.body, article.title);
  const headings = getMarkdownHeadings(blocks, 'industry-section');

  return (
    <main className={`${techStyles.page} ${guideStyles.page}`}>
      <div className={`${techStyles.container} ${guideStyles.container}`}>
        <nav
          className={`${techStyles.breadcrumbs} ${guideStyles.breadcrumbs}`}
          aria-label={labels.breadcrumbs}
        >
          <Link href={getReviewLocalePath(locale)}>{labels.home}</Link>
          <span aria-hidden="true">/</span>
          <span>{labels.industry}</span>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{article.title}</span>
        </nav>
        <header className={`${techStyles.header} ${guideStyles.header}`}>
          <h1>{article.title}</h1>
          <p className={`${techStyles.summary} ${guideStyles.summary}`}>
            {article.metaDescription}
          </p>
          <time
            className={`${techStyles.updated} ${guideStyles.updated}`}
            dateTime={article.dateModified}
          >
            {labels.updated} {formatDate(article.dateModified, locale)}
          </time>
        </header>
        <div className={`${techStyles.layout} ${guideStyles.layout}`}>
          <article className={`${techStyles.article} ${guideStyles.article}`}>
            <MarkdownContent
              locale={locale}
              blocks={blocks}
              markdown={article.body}
              title={article.title}
              headingIdPrefix="industry-section"
            />
          </article>
          <aside className={guideStyles.sidebar} aria-label={cta.title}>
            <ContentSidebarCta
              locale={locale}
              copy={cta}
              consultSource="industry_article_sidebar_consult"
              trialSource="industry_article_sidebar_trial"
              category={article.pageType}
              slug={article.slug}
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
