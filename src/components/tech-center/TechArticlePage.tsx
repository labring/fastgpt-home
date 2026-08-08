import type { ComponentProps } from 'react';
import Link from 'next/link';
import { ArrowUpRight, Workflow } from 'lucide-react';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import CloudEntryLink from '@/components/home/CloudEntryLink';
import { getDefaultLocalePath } from '@/lib/localizedRoutes';
import type { TechArticle } from '@/lib/tech-center-content';
import type { TechEntry } from './data';
import MarkdownContent from './MarkdownContent';
import styles from './TechArticlePage.module.css';

type HomeFooter = ComponentProps<typeof Footer>['t'];

type NavLink = {
  label: string;
  href: string;
};

type ArticleCtaCopy = {
  eyebrow: string;
  title: string;
  description: string;
  label: string;
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
  cta: ArticleCtaCopy;
}) {
  const homeHref = getDefaultLocalePath(locale);
  const hubHref = getDefaultLocalePath(locale, '/tech-center');

  return (
    <div className="home tech-center-article-page">
      <HomeThemeFix />
      <Navbar links={links} t={navCta} locale={locale} />
      <main className={styles.page}>
        <div className={styles.container}>
          <nav className={styles.breadcrumbs} aria-label="面包屑">
            <Link href={homeHref}>FastGPT</Link>
            <span aria-hidden="true">/</span>
            <Link href={hubHref}>技术中心</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{article.title}</span>
          </nav>

          <header className={styles.header}>
            <div className={styles.meta}>
              <span className={styles.badge}>{article.categoryLabel}</span>
              <span className={`${styles.badge} ${styles.sourceBadge}`}>{article.sourceType}</span>
              <span>{article.minutes} 分钟阅读</span>
              <span>{article.pageType}</span>
            </div>
            <h1>{article.title}</h1>
            <p className={styles.summary}>{article.seoDescription}</p>
          </header>

          <div className={styles.layout}>
            <article className={styles.article}>
              <MarkdownContent markdown={article.markdown} title={article.title} />
              <footer className={styles.sourceFooter} aria-label="本文来源">
                <span className={styles.sourceLabel}>本文来源</span>
                <span className={styles.sourceType}>{article.sourceType}</span>
                <a
                  className={styles.sourceLink}
                  href={article.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>查看原始来源</span>
                  <ArrowUpRight
                    className={styles.sourceIcon}
                    strokeWidth={1.8}
                    aria-hidden="true"
                  />
                </a>
              </footer>
              {relatedArticles.length > 0 && (
                <section className={styles.related} aria-labelledby="related-title">
                  <div className={styles.relatedHeader}>
                    <p className={styles.relatedEyebrow}>同主题内容</p>
                    <h2 id="related-title">继续阅读</h2>
                  </div>
                  <div className={styles.relatedList}>
                    {relatedArticles.map((relatedArticle) => (
                      <Link
                        className={styles.relatedLink}
                        href={relatedArticle.slug}
                        key={relatedArticle.slug}
                      >
                        <span>
                          <small>{relatedArticle.categoryLabel}</small>
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
              <section className={styles.ctaCard} aria-labelledby="tech-article-cta-title">
                <div className={styles.ctaTexture} aria-hidden="true" />
                <div className={styles.ctaContent}>
                  <div className={styles.ctaIcon}>
                    <Workflow strokeWidth={1.7} aria-hidden="true" />
                  </div>
                  <p className={styles.ctaEyebrow}>{cta.eyebrow}</p>
                  <h2 id="tech-article-cta-title" className={styles.ctaTitle}>
                    {cta.title}
                  </h2>
                  <p className={styles.ctaDescription}>{cta.description}</p>
                  <CloudEntryLink
                    source="tech_article_sidebar_trial"
                    data-rybbit-prop-category={article.category}
                    data-rybbit-prop-slug={article.slug}
                    rel="noopener noreferrer nofollow"
                    aria-label={`${cta.label}: ${cta.title}`}
                    className={styles.ctaLink}
                  >
                    <span>{cta.label}</span>
                    <ArrowUpRight
                      className={styles.ctaArrow}
                      strokeWidth={1.8}
                      aria-hidden="true"
                    />
                  </CloudEntryLink>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </main>
      <Footer t={footer} />
    </div>
  );
}
