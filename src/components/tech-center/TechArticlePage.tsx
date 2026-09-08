import type { ComponentProps } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import ContentSidebarCta, { type ContentSidebarCtaCopy } from '@/components/ContentSidebarCta';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { getDefaultLocalePath } from '@/lib/localizedRoutes';
import { techPublishedLocaleCodes } from '@/lib/publishedLocales';
import type { TechArticle } from '@/lib/tech-center-content';
import { getTechnicalReviewPath } from '@/lib/technicalRouting';
import { isPreviewSite } from '@/lib/siteRouting';
import {
  getTechCategoryLabelForLocale,
  getTechEntryPath,
  getTechSourceLabelForLocale,
  type TechEntry
} from './data';
import MarkdownContent from './MarkdownContent';
import styles from './TechArticlePage.module.css';

type HomeFooter = ComponentProps<typeof Footer>['t'];

type NavLink = {
  label: string;
  href: string;
};

const ARTICLE_COPY = {
  zh: {
    breadcrumbs: '面包屑',
    hubName: '技术中心',
    readMinutes: (minutes: number) => `${minutes} 分钟阅读`,
    sourceAria: '本文来源',
    sourceLabel: '本文来源',
    viewSource: '查看原始来源',
    relatedEyebrow: '同主题内容',
    relatedTitle: '继续阅读'
  },
  en: {
    breadcrumbs: 'Breadcrumbs',
    hubName: 'Technical Center',
    readMinutes: (minutes: number) => `${minutes} min read`,
    sourceAria: 'Article source',
    sourceLabel: 'Source',
    viewSource: 'View original source',
    relatedEyebrow: 'Related content',
    relatedTitle: 'Continue reading'
  }
};

export default function TechArticlePage({
  article,
  locale,
  links,
  navCta,
  footer,
  relatedArticles,
  cta
}: {
  article: TechArticle;
  locale: string;
  links: NavLink[];
  navCta: { trial: string; consult: string };
  footer: HomeFooter;
  relatedArticles: TechEntry[];
  cta: ContentSidebarCtaCopy;
}) {
  const copy = locale === 'zh' ? ARTICLE_COPY.zh : ARTICLE_COPY.en;
  const homeHref = getDefaultLocalePath(locale);
  const hubHref = getTechnicalReviewPath(locale, '/tech-center');
  const categoryLabel = getTechCategoryLabelForLocale(article.category, locale);
  const sourceLabel = getTechSourceLabelForLocale(article.sourceType, locale);
  const pageTypeLabel =
    article.pageType === article.categoryLabel ? categoryLabel : article.pageType;
  const localizedMarkdown = article.markdown.replace(
    /\]\(\/(?:zh|en)(\/[^)]+)\)/g,
    (_match, href: string) => `](${getTechnicalReviewPath(locale, href)})`
  );

  return (
    <div className="home tech-center-article-page">
      <HomeThemeFix />
      <Navbar
        links={links}
        t={navCta}
        locale={locale}
        publishedLocales={techPublishedLocaleCodes}
        reviewLocalePaths={isPreviewSite}
      />
      <main className={styles.page}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs} aria-label={copy.breadcrumbs}>
            <Link href={homeHref}>FastGPT</Link>
            <span aria-hidden="true">/</span>
            <Link href={hubHref}>{copy.hubName}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{article.title}</span>
          </nav>

          <header className={styles.header}>
            <div className={styles.meta}>
              <span className={styles.badge}>{categoryLabel}</span>
              <span className={`${styles.badge} ${styles.sourceBadge}`}>{sourceLabel}</span>
              <span>{copy.readMinutes(article.minutes)}</span>
              {article.pageType !== article.sourceType && <span>{pageTypeLabel}</span>}
            </div>
            <h1>{article.title}</h1>
            <p className={styles.summary}>{article.seoDescription}</p>
          </header>

          <div className={`${styles.layout} ${article.image ? styles.layoutWithHero : ''}`}>
            {article.image && (
              <figure className={styles.heroFigure}>
                <Image
                  src={article.image.path}
                  alt={article.image.alt}
                  width={article.image.width}
                  height={article.image.height}
                  priority
                />
                <figcaption>{article.image.alt}</figcaption>
              </figure>
            )}
            <article className={styles.article}>
              <MarkdownContent
                markdown={localizedMarkdown}
                title={article.title}
                headingIdPrefix="article-section"
              />
              {article.source && (
                <footer className={styles.sourceFooter} aria-label={copy.sourceAria}>
                  <span className={styles.sourceLabel}>{copy.sourceLabel}</span>
                  <span className={styles.sourceType}>{sourceLabel}</span>
                  <a
                    className={styles.sourceLink}
                    href={article.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{copy.viewSource}</span>
                    <ArrowUpRight
                      className={styles.sourceIcon}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </a>
                </footer>
              )}
              {relatedArticles.length > 0 && (
                <section className={styles.related} aria-labelledby="related-title">
                  <div className={styles.relatedHeader}>
                    <p className={styles.relatedEyebrow}>{copy.relatedEyebrow}</p>
                    <h2 id="related-title">{copy.relatedTitle}</h2>
                  </div>
                  <div className={styles.relatedList}>
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        className={styles.relatedLink}
                        href={getTechnicalReviewPath(locale, getTechEntryPath(relatedArticle))}
                        key={relatedArticle.slug}
                      >
                        <span>
                          <small>
                            {getTechCategoryLabelForLocale(relatedArticle.category, locale)}
                          </small>
                          {relatedArticle.title}
                        </span>
                        <ArrowUpRight strokeWidth={1.8} aria-hidden="true" />
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </article>
            <aside className={styles.aside} aria-label={cta.title}>
              <ContentSidebarCta
                locale={locale}
                copy={cta}
                consultSource="tech_article_sidebar_consult"
                trialSource="tech_article_sidebar_trial"
                category={article.category}
                slug={article.slug}
              />
            </aside>
          </div>
        </div>
      </main>
      <Footer t={footer} locale={locale} />
    </div>
  );
}
