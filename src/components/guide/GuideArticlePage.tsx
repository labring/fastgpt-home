import Image from 'next/image';
import Link from 'next/link';

import MarkdownContent from '@/components/tech-center/MarkdownContent';
import type { GuideDocument } from '@/lib/guideContent';
import { getGuideOwnedPath, type GuidePublishedLocale } from '@/lib/guideSeo';
import { getOwnedLocalePath } from '@/lib/siteRouting';
import styles from '@/components/tech-center/TechArticlePage.module.css';

const guideArticleCopy = {
  en: {
    home: 'Home',
    guide: 'Guide',
    back: 'Back to guides',
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
    back: '返回指南',
    configuredLinks: '相关资源',
    updated: (date: string) =>
      `更新于 ${new Intl.DateTimeFormat('zh-CN', {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'numeric',
        day: 'numeric'
      }).format(new Date(`${date}T00:00:00Z`))}`
  }
} as const;

export function getGuideArticleCopy(locale: GuidePublishedLocale) {
  return guideArticleCopy[locale];
}

export default function GuideArticlePage({
  document,
  locale
}: {
  document: GuideDocument;
  locale: GuidePublishedLocale;
}) {
  const labels = getGuideArticleCopy(locale);
  const { assetPolicy, configuredInternalLinks } = document.source;

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href={getOwnedLocalePath(locale)}>{labels.home}</Link>
          <span aria-hidden="true">/</span>
          <Link href={getGuideOwnedPath(locale)}>{labels.guide}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{document.source.h1}</span>
        </nav>
        <header className={styles.header}>
          <h1>{document.source.h1}</h1>
          <p className={styles.summary}>{document.source.metaDescription}</p>
          <time className={styles.updated} dateTime={document.source.dateModified}>
            {labels.updated(document.source.dateModified)}
          </time>
        </header>
        <div className={styles.layout}>
          <article className={styles.article}>
            {assetPolicy.status === 'required' && (
              <figure className={styles.heroFigure}>
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
            <MarkdownContent markdown={document.body} title={document.source.h1} />
            {configuredInternalLinks.length > 0 && (
              <section className={styles.related} aria-labelledby="guide-configured-links-title">
                <div className={styles.relatedHeader}>
                  <h2 id="guide-configured-links-title">{labels.configuredLinks}</h2>
                </div>
                <div className={styles.relatedList}>
                  {configuredInternalLinks.map((link) => (
                    <a className={styles.relatedLink} href={link.target} key={link.target}>
                      {link.label}
                    </a>
                  ))}
                </div>
              </section>
            )}
            <p className={styles.returnLink}>
              <Link href={getGuideOwnedPath(locale)}>{labels.back}</Link>
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
