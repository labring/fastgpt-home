import Link from 'next/link';

import MarkdownContent from '@/components/tech-center/MarkdownContent';
import type { GuideDocument } from '@/lib/guideContent';
import { getGuideOwnedPath, type GuidePublishedLocale } from '@/lib/guideSeo';
import styles from '@/components/tech-center/TechArticlePage.module.css';

export default function GuideArticlePage({
  document,
  locale,
  slug
}: {
  document: GuideDocument;
  locale: GuidePublishedLocale;
  slug: string;
}) {
  const labels = locale === 'zh' ? { home: '首页', guide: '指南', back: '返回指南' } : { home: 'Home', guide: 'Guide', back: 'Back to guides' };

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href={getGuideOwnedPath(locale)}>{labels.home}</Link>
          <span aria-hidden="true">/</span>
          <Link href={getGuideOwnedPath(locale)}>{labels.guide}</Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{document.source.h1}</span>
        </nav>
        <header className={styles.header}>
          <h1>{document.source.h1}</h1>
          <p className={styles.summary}>{document.source.metaDescription}</p>
        </header>
        <div className={styles.layout}>
          <article className={styles.article}>
            <MarkdownContent markdown={document.body} title={document.source.h1} />
            <p className={styles.returnLink}>
              <Link href={getGuideOwnedPath(locale)}>{labels.back}</Link>
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
