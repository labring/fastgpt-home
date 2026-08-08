'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentProps } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Search, X } from 'lucide-react';
import { getDefaultLocalePath } from '@/lib/localizedRoutes';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import {
  CATEGORY_META,
  COMMON_TOPICS,
  FEATURED_ENTRY,
  PAGE_SIZE,
  TECH_ENTRIES,
  type TechCategoryKey,
  type TechSource
} from './data';
import styles from './TechCenterPage.module.css';

type SourceFilter = 'all' | TechSource;
type SortMode = 'default' | 'title' | 'minutes';

const FLOW_NODES = [
  { number: '01', title: 'API 调用', kind: 'Request' },
  { number: '02', title: '身份鉴权', kind: 'API Key' },
  { number: '03', title: '应用编排', kind: 'App ID' },
  { number: '04', title: '流式响应', kind: 'SSE' }
];

const SOURCE_OPTIONS: { value: SourceFilter; label: string }[] = [
  { value: 'all', label: '全部来源' },
  { value: '官方文档', label: '官方文档' },
  { value: 'GitHub issue', label: 'GitHub Issue' }
];

const CATEGORY_ITEMS = [
  { key: 'all' as const, label: '全部内容', icon: '◫', count: TECH_ENTRIES.length },
  ...CATEGORY_META
];

function getCategoryLabel(category: TechCategoryKey) {
  if (category === 'all') return '按任务找到答案';
  return CATEGORY_META.find((item) => item.key === category)?.label || category;
}

function visiblePageNumbers(current: number, total: number) {
  if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);

  const values = new Set(
    [1, total, current - 1, current, current + 1].filter((value) => value > 0 && value <= total)
  );
  return [...values].sort((a, b) => a - b);
}

type NavLink = { label: string; href: string };
type NavCta = { trial: string; consult: string };
type HomeFooter = ComponentProps<typeof Footer>['t'];

export default function TechCenterPage({
  locale,
  links,
  navCta,
  footer
}: {
  locale: string;
  links: NavLink[];
  navCta: NavCta;
  footer: HomeFooter;
}) {
  const resultsTitleRef = useRef<HTMLHeadingElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<TechCategoryKey>('all');
  const [source, setSource] = useState<SourceFilter>('all');
  const [sort, setSort] = useState<SortMode>('default');
  const [page, setPage] = useState(1);
  const [urlStateReady, setUrlStateReady] = useState(false);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase('zh-CN');
    const result = TECH_ENTRIES.filter((entry) => {
      const categoryMatch = category === 'all' || entry.category === category;
      const sourceMatch = source === 'all' || entry.sourceType === source;
      const haystack = [entry.title, entry.summary, entry.categoryLabel, entry.sourceType]
        .join(' ')
        .toLocaleLowerCase('zh-CN');

      return (
        categoryMatch && sourceMatch && (!normalizedQuery || haystack.includes(normalizedQuery))
      );
    });

    if (sort === 'title') {
      return result
        .slice()
        .sort((first, second) => first.title.localeCompare(second.title, 'zh-CN'));
    }
    if (sort === 'minutes') {
      return result
        .slice()
        .sort(
          (first, second) =>
            first.minutes - second.minutes || first.title.localeCompare(second.title, 'zh-CN')
        );
    }
    return result;
  }, [category, query, sort, source]);

  const totalPages = Math.max(1, Math.ceil(filteredEntries.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageEntries = filteredEntries.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const pageNumbers = visiblePageNumbers(currentPage, totalPages);
  const resultsTitle = query ? '搜索结果' : getCategoryLabel(category);
  const resultsCount = `共 ${filteredEntries.length} 篇${query ? `，关键词“${query}”` : ''}`;
  const homeHref = getDefaultLocalePath(locale);
  const hubHref = getDefaultLocalePath(locale, '/tech-center');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get('category') as TechCategoryKey | null;
    const urlSource = params.get('source') as SourceFilter | null;
    const urlSort = params.get('sort') as SortMode | null;

    queueMicrotask(() => {
      if (
        urlCategory &&
        (urlCategory === 'all' || CATEGORY_META.some((item) => item.key === urlCategory))
      ) {
        setCategory(urlCategory);
      }
      if (urlSource && SOURCE_OPTIONS.some((item) => item.value === urlSource)) {
        setSource(urlSource);
      }
      if (urlSort === 'default' || urlSort === 'title' || urlSort === 'minutes') {
        setSort(urlSort);
      }
      setQuery(params.get('q') || '');
      setPage(Math.max(1, Number(params.get('page')) || 1));
      setUrlStateReady(true);
    });
  }, []);

  useEffect(() => {
    if (!urlStateReady) return;

    const url = new URL(window.location.href);
    const values: Record<string, string> = {
      category,
      q: query.trim(),
      source,
      sort,
      page: String(currentPage)
    };

    Object.entries(values).forEach(([key, value]) => {
      if (!value || value === 'all' || value === 'default' || (key === 'page' && value === '1')) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    window.history.replaceState(null, '', url);
  }, [category, currentPage, query, sort, source, urlStateReady]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        searchInputRef.current?.focus();
      }

      if (event.key === 'Escape' && document.activeElement === searchInputRef.current) {
        setQuery('');
        setPage(1);
        searchInputRef.current?.blur();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const scrollToResults = () => {
    resultsTitleRef.current?.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  };

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    scrollToResults();
  };

  const clearFilters = () => {
    setCategory('all');
    setQuery('');
    setSource('all');
    setSort('default');
    setPage(1);
  };

  return (
    <div className="home tech-center-reference-page">
      <HomeThemeFix />
      <Navbar links={links} t={navCta} locale={locale} />
      <main id="main-content" className={`${styles.page} ${styles.main}`}>
        <a className={styles.skipLink} href="#main-content">
          跳至主要内容
        </a>
        <nav className={`${styles.container} ${styles.breadcrumbs}`} aria-label="面包屑">
          <a href={homeHref}>FastGPT</a>
          <span aria-hidden="true">/</span>
          <a href={hubHref} aria-current="page">
            技术中心
          </a>
        </nav>
        <section className={`${styles.container} ${styles.intro}`} aria-labelledby="page-title">
          <div className={styles.eyebrow}>FASTGPT / 技术中心</div>
          <h1 id="page-title">
            从部署到 API，
            <br />
            直接找到可执行答案。
          </h1>
          <p className={styles.introCopy}>
            面向开发与部署人员，按任务搜索 668 篇技术内容，覆盖部署升级、知识库、工作流、集成与
            API。
          </p>
          <form
            className={styles.searchPanel}
            role="search"
            onSubmit={(event) => {
              event.preventDefault();
              setPage(1);
              scrollToResults();
            }}
          >
            <div className={styles.searchField}>
              <Search size={18} strokeWidth={1.8} aria-hidden="true" />
              <input
                ref={searchInputRef}
                type="search"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setPage(1);
                }}
                placeholder="搜索部署、升级、知识库或 API"
                aria-label="搜索技术内容"
              />
              {query && (
                <button
                  className={styles.clearSearch}
                  type="button"
                  aria-label="清除搜索"
                  onClick={() => {
                    setQuery('');
                    setPage(1);
                    searchInputRef.current?.focus();
                  }}
                >
                  <X size={16} strokeWidth={1.8} aria-hidden="true" />
                </button>
              )}
              <kbd className={styles.shortcut}>⌘K</kbd>
            </div>
            <button className={styles.searchButton} type="submit">
              查找答案
              <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </form>
          <div className={styles.trustBar} aria-label="技术内容概览">
            <span>668 篇内容</span>
            <span>7 个主题</span>
            <span>官方文档与公开 Issue</span>
          </div>
        </section>

        <section
          className={`${styles.container} ${styles.featured}`}
          aria-labelledby="featured-title"
        >
          <div
            className={styles.flowCanvas}
            role="img"
            aria-label="API 调用经过身份鉴权、应用编排并返回流式响应的 FastGPT 工作流示意图"
          >
            <div className={styles.canvasLabel}>API 调用路径</div>
            <div className={styles.flowStage}>
              <div className={styles.flowLine} aria-hidden="true" />
              {FLOW_NODES.map((node) => (
                <div className={styles.flowNode} key={node.number}>
                  <span className={styles.nodeIcon}>{node.number}</span>
                  <span className={styles.nodeTitle}>{node.title}</span>
                  <span className={styles.nodeKind}>{node.kind}</span>
                </div>
              ))}
            </div>
            <div className={styles.canvasNote}>可追溯来源 · 可执行步骤 · 可验证结果</div>
          </div>

          <div className={styles.featuredCopy}>
            <div className={styles.featuredEyebrow}>推荐入口</div>
            <div className={styles.metaRow}>
              <span className={styles.badge}>{FEATURED_ENTRY.categoryLabel}</span>
              <span className={`${styles.badge} ${styles.sourceBadge}`}>
                {FEATURED_ENTRY.sourceType}
              </span>
              <span>{FEATURED_ENTRY.minutes} 分钟阅读</span>
            </div>
            <h2 className={styles.featuredTitle} id="featured-title">
              {FEATURED_ENTRY.title}
            </h2>
            <p className={styles.featuredSummary}>{FEATURED_ENTRY.summary}</p>
            <div className={styles.featuredActions}>
              <a className={styles.primaryLink} href={FEATURED_ENTRY.slug}>
                阅读 API 指南 <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a
                className={styles.textLink}
                href={FEATURED_ENTRY.source}
                target="_blank"
                rel="noopener noreferrer"
              >
                查看官方文档 <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
              </a>
            </div>
          </div>
        </section>

        <section
          className={`${styles.container} ${styles.library}`}
          id="content-library"
          aria-labelledby="results-title"
        >
          <aside className={styles.filters} aria-label="技术内容筛选">
            <div className={styles.filterGroup}>
              <h2 className={styles.filterHeading}>按主题</h2>
              <div className={styles.categoryList}>
                {CATEGORY_ITEMS.map((item) => (
                  <button
                    className={styles.categoryButton}
                    type="button"
                    key={item.key}
                    aria-pressed={category === item.key}
                    onClick={() => {
                      setCategory(item.key);
                      setPage(1);
                    }}
                  >
                    <span className={styles.categoryIcon} aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className={styles.categoryLabel}>{item.label}</span>
                    <span className={styles.categoryCount}>{item.count}</span>
                  </button>
                ))}
              </div>
              <div className={styles.mobileFilterRow}>
                <label className={styles.srOnly} htmlFor="mobile-source-filter">
                  来源类型
                </label>
                <select
                  className={styles.sourceSelect}
                  id="mobile-source-filter"
                  value={source}
                  onChange={(event) => {
                    setSource(event.target.value as SourceFilter);
                    setPage(1);
                  }}
                >
                  {SOURCE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h2 className={styles.filterHeading}>常用入口</h2>
              <div className={styles.tagList}>
                {COMMON_TOPICS.map((topic) => (
                  <button
                    className={styles.tagButton}
                    type="button"
                    key={topic}
                    onClick={() => {
                      setQuery(topic);
                      setPage(1);
                    }}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.filterGroup}>
              <label className={styles.filterHeading} htmlFor="source-filter">
                内容来源
              </label>
              <select
                className={styles.sourceSelect}
                id="source-filter"
                value={source}
                onChange={(event) => {
                  setSource(event.target.value as SourceFilter);
                  setPage(1);
                }}
              >
                {SOURCE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </aside>

          <div className={styles.results}>
            <div className={styles.resultsHeader}>
              <div>
                <h2 ref={resultsTitleRef} className={styles.resultsTitle} id="results-title">
                  {resultsTitle}
                </h2>
                <p className={styles.resultsSubtitle} aria-live="polite">
                  {resultsCount}
                </p>
              </div>
              <label className={styles.srOnly} htmlFor="sort-select">
                内容排序
              </label>
              <select
                className={styles.sortSelect}
                id="sort-select"
                value={sort}
                onChange={(event) => {
                  setSort(event.target.value as SortMode);
                  setPage(1);
                }}
              >
                <option value="default">默认排序</option>
                <option value="title">按标题</option>
                <option value="minutes">阅读时间</option>
              </select>
            </div>

            {pageEntries.length > 0 ? (
              <>
                <div className={styles.cardGrid}>
                  {pageEntries.map((entry) => (
                    <article className={styles.articleCard} key={entry.slug}>
                      <div className={styles.cardTop}>
                        <span className={styles.badge}>{entry.categoryLabel}</span>
                        <span className={styles.cardSource}>{entry.sourceType}</span>
                      </div>
                      <h3 className={styles.cardTitle}>
                        <a href={entry.slug}>{entry.title}</a>
                      </h3>
                      <p className={styles.cardSummary}>{entry.summary}</p>
                      <div className={styles.cardFooter}>
                        <span>{entry.minutes} 分钟阅读</span>
                        <span className={styles.cardArrow} aria-hidden="true">
                          <ArrowRight size={16} strokeWidth={1.8} />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav className={styles.pagination} aria-label="内容分页">
                    <button
                      className={styles.pageButton}
                      type="button"
                      disabled={currentPage === 1}
                      aria-label="上一页"
                      onClick={() => changePage(currentPage - 1)}
                    >
                      <ChevronLeft size={17} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                    {pageNumbers.map((pageNumber, index) => {
                      const previousPage = pageNumbers[index - 1];
                      const hasGap = previousPage && pageNumber - previousPage > 1;
                      return (
                        <Fragment key={pageNumber}>
                          {hasGap && (
                            <span className={styles.pageGap} aria-hidden="true">
                              …
                            </span>
                          )}
                          <button
                            className={styles.pageButton}
                            type="button"
                            aria-current={pageNumber === currentPage ? 'page' : undefined}
                            onClick={() => changePage(pageNumber)}
                          >
                            {pageNumber}
                          </button>
                        </Fragment>
                      );
                    })}
                    <button
                      className={styles.pageButton}
                      type="button"
                      disabled={currentPage === totalPages}
                      aria-label="下一页"
                      onClick={() => changePage(currentPage + 1)}
                    >
                      <ChevronRight size={17} strokeWidth={1.8} aria-hidden="true" />
                    </button>
                  </nav>
                )}
              </>
            ) : (
              <div className={styles.emptyState}>
                <div>
                  <h3>换个关键词，继续找答案</h3>
                  <p>
                    {query
                      ? `没有找到“${query}”相关内容。试试“Docker”“版本升级”或“API”。`
                      : '当前筛选条件下没有内容，可以清除筛选后继续搜索。'}
                  </p>
                  <button className={styles.clearButton} type="button" onClick={clearFilters}>
                    清除筛选
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer t={footer} />
    </div>
  );
}
