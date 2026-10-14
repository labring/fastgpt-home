import Link from 'next/link';

import ContentSidebarCta, { type ContentSidebarCtaCopy } from '@/components/ContentSidebarCta';
import guideStyles from '@/components/guide/GuideArticlePage.module.css';
import MarkdownContent, { getMarkdownHeadings } from '@/components/tech-center/MarkdownContent';
import techStyles from '@/components/tech-center/TechArticlePage.module.css';
import type { IndustryArticle, IndustryLocale } from '@/lib/industryContent';
import { getIndustryPath, getRelatedIndustryArticles } from '@/lib/industryContent';
import { INDUSTRY_AREAS } from '@/lib/industryListing';
import { getReviewLocalePath } from '@/lib/siteRouting';
import { parseMarkdown } from '@/lib/markdownParser';

const copy = {
  en: {
    home: 'Home',
    industry: 'Industry',
    breadcrumbs: 'Breadcrumbs',
    updated: 'Last updated',
    onThisPage: 'On this page',
    related: 'Continue reading'
  },
  zh: {
    home: '首页',
    industry: '行业问题',
    breadcrumbs: '面包屑',
    updated: '更新于',
    onThisPage: '本页内容',
    related: '继续阅读'
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
  const relatedArticles = getRelatedIndustryArticles(article);

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
          <div className="min-w-0">
            <article className={`${techStyles.article} ${guideStyles.article}`}>
              <MarkdownContent
                locale={locale}
                blocks={blocks}
                markdown={article.body}
                title={article.title}
                headingIdPrefix="industry-section"
              />
            </article>
            {relatedArticles.length > 0 && (
              <section className={techStyles.related} aria-labelledby="industry-related-title">
                <div className={techStyles.relatedHeader}>
                  <h2 id="industry-related-title">{labels.related}</h2>
                </div>
                <div className={techStyles.relatedList}>
                  {relatedArticles.map((relatedArticle) => (
                    <Link
                      className={techStyles.relatedLink}
                      href={getReviewLocalePath(locale, getIndustryPath(relatedArticle.slug))}
                      key={relatedArticle.slug}
                      prefetch={false}
                    >
                      <span>
                        <small>{INDUSTRY_AREAS[relatedArticle.area][locale]}</small>
                        {relatedArticle.title}
                      </span>
                      <span aria-hidden="true">↗</span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>
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
