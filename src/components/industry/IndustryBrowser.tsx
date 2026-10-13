'use client';

import Link from 'next/link';
import { useEffect, useMemo, useRef, useState } from 'react';

import guideStyles from '@/components/guide/GuideHubPage.module.css';
import styles from '@/components/industry/IndustryBrowser.module.css';
import type { IndustryLocale } from '@/lib/industryContent';
import {
  INDUSTRY_AREAS,
  INDUSTRY_PAGE_SIZE,
  getIndustryBrowseHref,
  getIndustryListing,
  isIndustrySummaryIndex,
  type IndustryArea,
  type IndustryAreaCounts,
  type IndustryBrowseState,
  type IndustrySummary
} from '@/lib/industryListing';

const copy = {
  en: {
    area: 'Application area',
    all: 'All',
    readArticle: 'Read article',
    pagination: 'Article pages',
    previous: 'Previous',
    next: 'Next',
    page: (page: number) => `Page ${page}`,
    results: (count: number, page: number, pages: number) =>
      `${count.toLocaleString('en-US')} articles · Page ${page} of ${pages}`,
    loading: 'Loading the complete collection. Showing the first page of All.',
    error: 'The complete collection could not be loaded. The first page of All is still available.',
    retry: 'Retry'
  },
  zh: {
    area: '应用领域',
    all: '全部',
    readArticle: '阅读文章',
    pagination: '文章分页',
    previous: '上一页',
    next: '下一页',
    page: (page: number) => `第 ${page} 页`,
    results: (count: number, page: number, pages: number) =>
      `${count.toLocaleString('zh-CN')} 篇 · 第 ${page} 页，共 ${pages} 页`,
    loading: '正在加载完整列表，当前展示全部文章的第一页。',
    error: '完整列表加载失败，仍可阅读全部文章的第一页。',
    retry: '重试'
  }
};

export default function IndustryBrowser({
  locale,
  initialEntries,
  counts,
  indexPath,
  articlePrefix
}: {
  locale: IndustryLocale;
  initialEntries: IndustrySummary[];
  counts: IndustryAreaCounts;
  indexPath: string;
  articlePrefix: string;
}) {
  const t = copy[locale];
  const [entries, setEntries] = useState<IndustrySummary[] | null>(null);
  const [query, setQuery] = useState('');
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const resultsHeading = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(indexPath, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Industry summary request failed');
        return response.json() as Promise<unknown>;
      })
      .then((value) => {
        if (!isIndustrySummaryIndex(value, counts, articlePrefix)) {
          throw new Error('Industry summary projection mismatch');
        }
        if (!controller.signal.aborted) setEntries(value);
      })
      .catch(() => {
        if (!controller.signal.aborted) setFailed(true);
      });
    return () => controller.abort();
  }, [indexPath, counts, articlePrefix, attempt]);

  useEffect(() => {
    if (!entries) return;
    const restore = () => {
      const url = new URL(window.location.href);
      const state = getIndustryListing(entries, url.searchParams);
      const href = getIndustryBrowseHref(url, state);
      window.history.replaceState(window.history.state, '', href);
      setQuery(new URL(href, url).search);
    };
    restore();
    window.addEventListener('popstate', restore);
    return () => window.removeEventListener('popstate', restore);
  }, [entries]);

  const listing = useMemo(
    () =>
      entries
        ? getIndustryListing(entries, new URLSearchParams(query))
        : {
            industry: 'all' as const,
            page: 1,
            total: counts.all,
            pages: Math.max(1, Math.ceil(counts.all / INDUSTRY_PAGE_SIZE)),
            entries: initialEntries
          },
    [entries, query, counts.all, initialEntries]
  );
  const areas = (Object.keys(INDUSTRY_AREAS) as IndustryArea[]).filter((area) => counts[area] > 0);
  const selectedLabel =
    listing.industry === 'all' ? t.all : INDUSTRY_AREAS[listing.industry][locale];
  const pages = [...new Set([1, listing.page - 1, listing.page, listing.page + 1, listing.pages])]
    .filter((page) => page > 0 && page <= listing.pages)
    .sort((a, b) => a - b);

  function navigate(state: IndustryBrowseState) {
    const url = new URL(window.location.href);
    const href = getIndustryBrowseHref(url, state);
    if (href === `${url.pathname}${url.search}${url.hash}`) return;
    window.history.pushState(window.history.state, '', href);
    setQuery(new URL(href, url).search);
    resultsHeading.current?.focus({ preventScroll: true });
  }

  return (
    <section className={styles.browser} aria-label={t.area}>
      <div className={styles.filters} role="group" aria-label={t.area}>
        {(['all', ...areas] as const).map((area) => (
          <button
            key={area}
            type="button"
            disabled={!entries}
            aria-pressed={listing.industry === area}
            onClick={() => navigate({ industry: area, page: 1 })}
          >
            {area === 'all' ? t.all : INDUSTRY_AREAS[area][locale]}
          </button>
        ))}
      </div>
      <h2 ref={resultsHeading} tabIndex={-1} className={styles.heading}>
        {selectedLabel}
      </h2>
      <p className={styles.status} role="status" aria-live="polite" aria-atomic="true">
        {selectedLabel} · {t.results(listing.total, listing.page, listing.pages)}
        {!entries && !failed && <> {t.loading}</>}
      </p>
      {failed && (
        <div className={styles.error} role="alert">
          <p>{t.error}</p>
          <button
            type="button"
            onClick={() => {
              setFailed(false);
              setAttempt(attempt + 1);
            }}
          >
            {t.retry}
          </button>
        </div>
      )}
      <ul className={guideStyles.cardGrid}>
        {listing.entries.map((article, index) => (
          <li key={article.slug}>
            <Link className={guideStyles.card} href={article.href} prefetch={false}>
              <div className={guideStyles.cardTopline}>
                <span>
                  {String((listing.page - 1) * INDUSTRY_PAGE_SIZE + index + 1).padStart(2, '0')}
                </span>
                <span>{INDUSTRY_AREAS[article.area][locale]}</span>
              </div>
              <div>
                <h3>{article.title}</h3>
                <p>{article.description}</p>
              </div>
              <span className={guideStyles.cardAction}>
                {t.readArticle}
                <span aria-hidden="true">↗</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <nav className={styles.pagination} aria-label={t.pagination}>
        <button
          type="button"
          disabled={!entries || listing.page === 1}
          onClick={() => navigate({ industry: listing.industry, page: listing.page - 1 })}
        >
          {t.previous}
        </button>
        {pages.map((page, index) => (
          <span key={page} className={styles.pageNumber}>
            {index > 0 && page > pages[index - 1] + 1 && <span aria-hidden="true">…</span>}
            <button
              type="button"
              disabled={!entries}
              aria-label={t.page(page)}
              aria-current={page === listing.page ? 'page' : undefined}
              onClick={() => navigate({ industry: listing.industry, page })}
            >
              {page}
            </button>
          </span>
        ))}
        <button
          type="button"
          disabled={!entries || listing.page === listing.pages}
          onClick={() => navigate({ industry: listing.industry, page: listing.page + 1 })}
        >
          {t.next}
        </button>
      </nav>
    </section>
  );
}
