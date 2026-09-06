'use client';

import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import type { ComponentProps } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowRight, ChevronLeft, ChevronRight, ExternalLink, Search, X } from 'lucide-react';
import { getDefaultLocalePath } from '@/lib/localizedRoutes';
import { techPublishedLocaleCodes } from '@/lib/publishedLocales';
import { getTechCenterPagePath, getTechnicalReviewPath } from '@/lib/technicalRouting';
import { isPreviewSite } from '@/lib/siteRouting';
import HomeThemeFix from '@/components/home/HomeThemeFix';
import Navbar from '@/components/home/Navbar';
import Footer from '@/components/home/Footer';
import { CATEGORY_DEFINITIONS, PAGE_SIZE, SOURCE_DEFINITIONS } from './constants';
import {
  getTechEntryPath,
  type CategoryMeta,
  type TechCategoryKey,
  type TechEntry,
  type TechSearchEntry,
  type TechSource
} from './types';
import styles from './TechCenterPage.module.css';

type SourceFilter = 'all' | TechSource;
type SortMode = 'default' | 'title' | 'minutes';

const TECH_CENTER_COPY = {
  zh: {
    categoryTask: '按任务找到答案',
    categoryAll: '全部内容',
    sourceAll: '全部来源',
    sourceLabels: {
      官方文档: '官方文档',
      'GitHub issue': 'GitHub Issue',
      深度场景内容: '深度场景内容'
    },
    localeName: 'zh-CN',
    flowNodes: [
      { number: '01', title: 'API 调用', kind: 'Request' },
      { number: '02', title: '身份鉴权', kind: 'API Key' },
      { number: '03', title: '应用编排', kind: 'App ID' },
      { number: '04', title: '流式响应', kind: 'SSE' }
    ],
    commonTopics: [
      'Docker',
      '版本升级',
      '私有部署',
      '工作流',
      '知识库',
      'RAG',
      'API',
      'MCP',
      '插件',
      '模型配置'
    ],
    resultsTitle: '搜索结果',
    resultsCount: (count: number, query: string) =>
      `共 ${count} 篇${query ? `，关键词“${query}”` : ''}`,
    skipLink: '跳至主要内容',
    breadcrumbs: '面包屑',
    hubName: '技术中心',
    eyebrow: 'FASTGPT / 技术中心',
    heroLineOne: '从部署到 API，',
    heroLineTwo: '直接找到可执行答案。',
    intro: (count: number) =>
      `面向开发与部署人员，按任务搜索 ${count} 篇技术内容，覆盖部署升级、知识库、工作流、集成与 API。`,
    searchPlaceholder: '搜索部署、升级、知识库或 API',
    searchAria: '搜索技术内容',
    clearSearch: '清除搜索',
    searchButton: '查找答案',
    overviewAria: '技术内容概览',
    contentCount: (count: number) => `${count} 篇内容`,
    topicCount: (count: number) => `${count} 个主题`,
    sourceSummary: '官方文档与公开 Issue',
    flowAria: 'API 调用经过身份鉴权、应用编排并返回流式响应的 FastGPT 工作流示意图',
    flowLabel: 'API 调用路径',
    flowNote: '可追溯来源 · 可执行步骤 · 可验证结果',
    featured: '推荐入口',
    readMinutes: (minutes: number) => `${minutes} 分钟阅读`,
    readApiGuide: '阅读 API 指南',
    viewDocs: '查看官方文档',
    filtersAria: '技术内容筛选',
    byTopic: '按主题',
    sourceType: '来源类型',
    commonEntries: '常用入口',
    contentSource: '内容来源',
    sortAria: '内容排序',
    sortDefault: '默认排序',
    sortTitle: '按标题',
    sortMinutes: '阅读时间',
    pagination: '内容分页',
    previousPage: '上一页',
    nextPage: '下一页',
    emptyTitle: '换个关键词，继续找答案',
    emptyQuery: (query: string) => `没有找到“${query}”相关内容。试试“Docker”“版本升级”或“API”。`,
    emptyFiltered: '当前筛选条件下没有内容，可以清除筛选后继续搜索。',
    clearFilters: '清除筛选'
  },
  en: {
    categoryTask: 'Find answers by task',
    categoryAll: 'All content',
    sourceAll: 'All sources',
    sourceLabels: {
      官方文档: 'Official documentation',
      'GitHub issue': 'GitHub issue',
      深度场景内容: 'In-depth scenario content'
    },
    localeName: 'en-US',
    flowNodes: [
      { number: '01', title: 'API request', kind: 'Request' },
      { number: '02', title: 'Authentication', kind: 'API Key' },
      { number: '03', title: 'App orchestration', kind: 'App ID' },
      { number: '04', title: 'Streaming response', kind: 'SSE' }
    ],
    commonTopics: [
      'Docker',
      'Upgrades',
      'Self-hosting',
      'Workflows',
      'Knowledge bases',
      'RAG',
      'API',
      'MCP',
      'Plugins',
      'Model configuration'
    ],
    resultsTitle: 'Search results',
    resultsCount: (count: number, query: string) =>
      `${count} ${count === 1 ? 'article' : 'articles'}${query ? ` for “${query}”` : ''}`,
    skipLink: 'Skip to main content',
    breadcrumbs: 'Breadcrumbs',
    hubName: 'Technical Center',
    eyebrow: 'FASTGPT / TECHNICAL CENTER',
    heroLineOne: 'From deployment to API,',
    heroLineTwo: 'find an actionable answer.',
    intro: (count: number) =>
      `Search ${count} technical ${
        count === 1 ? 'article' : 'articles'
      } covering deployment, upgrades, knowledge bases, workflows, integrations, and APIs.`,
    searchPlaceholder: 'Search deployment, upgrades, knowledge bases, or APIs',
    searchAria: 'Search technical content',
    clearSearch: 'Clear search',
    searchButton: 'Find answers',
    overviewAria: 'Technical content overview',
    contentCount: (count: number) => `${count} ${count === 1 ? 'article' : 'articles'}`,
    topicCount: (count: number) => `${count} topics`,
    sourceSummary: 'Official documentation and public issues',
    flowAria:
      'FastGPT workflow showing an API request passing through authentication and app orchestration before returning a streaming response',
    flowLabel: 'API request path',
    flowNote: 'Traceable sources · Actionable steps · Verifiable results',
    featured: 'Featured guide',
    readMinutes: (minutes: number) => `${minutes} min read`,
    readApiGuide: 'Read the API guide',
    viewDocs: 'View official documentation',
    filtersAria: 'Technical content filters',
    byTopic: 'Topics',
    sourceType: 'Source type',
    commonEntries: 'Common searches',
    contentSource: 'Content source',
    sortAria: 'Sort content',
    sortDefault: 'Default order',
    sortTitle: 'Title',
    sortMinutes: 'Reading time',
    pagination: 'Content pages',
    previousPage: 'Previous page',
    nextPage: 'Next page',
    emptyTitle: 'Try another search',
    emptyQuery: (query: string) =>
      `No content matched “${query}”. Try “Docker”, “Upgrades”, or “API”.`,
    emptyFiltered: 'No content matches these filters. Clear the filters to continue searching.',
    clearFilters: 'Clear filters'
  }
};

const SEARCH_ENTRY_KEYS = [
  'identity',
  'title',
  'description',
  'category',
  'locale',
  'publicPath',
  'sourceType',
  'minutes'
];
const SEARCH_CATEGORIES: ReadonlySet<string> = new Set(CATEGORY_DEFINITIONS.map(({ key }) => key));
const SEARCH_SOURCE_TYPES: ReadonlySet<string> = new Set(
  SOURCE_DEFINITIONS.map(({ value }) => value)
);
function isTechSearchEntry(value: unknown): value is TechSearchEntry {
  if (!value || typeof value !== 'object') return false;
  const entry = value as Record<string, unknown>;
  if (
    Object.keys(entry).length !== SEARCH_ENTRY_KEYS.length ||
    SEARCH_ENTRY_KEYS.some((key) => !Object.prototype.hasOwnProperty.call(entry, key))
  ) {
    return false;
  }

  return (
    typeof entry.identity === 'string' &&
    typeof entry.title === 'string' &&
    typeof entry.description === 'string' &&
    typeof entry.category === 'string' &&
    typeof entry.locale === 'string' &&
    typeof entry.publicPath === 'string' &&
    typeof entry.sourceType === 'string' &&
    typeof entry.minutes === 'number' &&
    Number.isInteger(entry.minutes) &&
    entry.minutes >= 1 &&
    entry.title.trim().length > 0 &&
    entry.description.trim().length > 0 &&
    SEARCH_CATEGORIES.has(entry.category) &&
    SEARCH_SOURCE_TYPES.has(entry.sourceType) &&
    entry.locale.trim().length > 0 &&
    entry.publicPath.startsWith('/') &&
    !entry.publicPath.startsWith('//') &&
    !/[?#\\]/.test(entry.publicPath) &&
    entry.locale === entry.locale.toLowerCase() &&
    entry.publicPath === entry.publicPath.toLowerCase() &&
    entry.identity === `${entry.locale}|${entry.publicPath}`
  );
}

function isTechSearchProjection(
  value: unknown,
  expectedLength: number
): value is TechSearchEntry[] {
  if (!Array.isArray(value) || value.length !== expectedLength || !value.every(isTechSearchEntry)) {
    return false;
  }
  return new Set(value.map((entry) => (entry as TechSearchEntry).identity)).size === value.length;
}

function getCategoryLabel(
  category: TechCategoryKey,
  categoryMeta: CategoryMeta[],
  allLabel: string
) {
  if (category === 'all') return allLabel;
  return categoryMeta.find((item) => item.key === category)?.label || category;
}

function getSourceLabel(sourceType: TechSource, labels: Record<TechSource, string>) {
  return labels[sourceType] || sourceType;
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
  footer,
  initialEntries,
  initialPage = 1,
  featuredEntry,
  categoryMeta,
  totalEntries,
  languageSwitchPaths,
  searchIndexPath = '/tech-center/search-index.json'
}: {
  locale: string;
  links: NavLink[];
  navCta: NavCta;
  footer: HomeFooter;
  initialEntries: TechSearchEntry[];
  initialPage?: number;
  featuredEntry?: TechEntry;
  categoryMeta: CategoryMeta[];
  totalEntries: number;
  languageSwitchPaths: ComponentProps<typeof Navbar>['languageSwitchPaths'];
  searchIndexPath?: string;
}) {
  const router = useRouter();
  const copy = locale === 'zh' ? TECH_CENTER_COPY.zh : TECH_CENTER_COPY.en;
  const sourceOptions: { value: SourceFilter; label: string }[] = [
    { value: 'all', label: copy.sourceAll },
    ...SOURCE_DEFINITIONS.map(({ value }) => ({
      value,
      label: getSourceLabel(value, copy.sourceLabels)
    }))
  ];
  const resultsTitleRef = useRef<HTMLHeadingElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<TechCategoryKey>('all');
  const [source, setSource] = useState<SourceFilter>('all');
  const [sort, setSort] = useState<SortMode>('default');
  const [page, setPage] = useState(initialPage);
  const [urlStateReady, setUrlStateReady] = useState(false);
  const [entries, setEntries] = useState<TechSearchEntry[] | null>(null);

  const categoryItems = [
    { key: 'all' as const, label: copy.categoryAll, icon: '◫', count: totalEntries },
    ...categoryMeta
  ];

  useEffect(() => {
    let active = true;
    fetch(searchIndexPath)
      .then((response) => {
        if (!response.ok) throw new Error('Technical search projection request failed');
        return response.json() as Promise<unknown>;
      })
      .then((value) => {
        if (!isTechSearchProjection(value, totalEntries)) {
          throw new Error('Technical search projection schema drift');
        }
        if (active) setEntries(value);
      })
      .catch(() => {
        // The server-rendered entries remain the accessible fallback for projection failures.
      });

    return () => {
      active = false;
    };
  }, [searchIndexPath, totalEntries]);

  const filteredEntries = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase(copy.localeName);
    const result = (entries || initialEntries).filter((entry) => {
      const categoryMatch = category === 'all' || entry.category === category;
      const sourceMatch = source === 'all' || entry.sourceType === source;
      const categoryLabel = getCategoryLabel(entry.category, categoryMeta, copy.categoryTask);
      const sourceLabel = getSourceLabel(entry.sourceType, copy.sourceLabels);
      const haystack = [entry.title, entry.description, categoryLabel, sourceLabel]
        .join(' ')
        .toLocaleLowerCase(copy.localeName);

      return (
        categoryMatch && sourceMatch && (!normalizedQuery || haystack.includes(normalizedQuery))
      );
    });

    if (sort === 'title') {
      return result
        .slice()
        .sort((first, second) => first.title.localeCompare(second.title, copy.localeName));
    }
    if (sort === 'minutes') {
      return result
        .slice()
        .sort(
          (first, second) =>
            first.minutes - second.minutes ||
            first.title.localeCompare(second.title, copy.localeName)
        );
    }
    return result;
  }, [category, categoryMeta, copy, entries, initialEntries, query, sort, source]);

  const hasFilters = Boolean(
    query.trim() || category !== 'all' || source !== 'all' || sort !== 'default'
  );
  const clientPagination = hasFilters && entries !== null;
  const resultCount = clientPagination ? filteredEntries.length : totalEntries;
  const totalPages = Math.max(1, Math.ceil(resultCount / PAGE_SIZE));
  const currentPage = entries ? Math.min(page, totalPages) : initialPage;
  const pageEntries = entries
    ? filteredEntries.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)
    : initialEntries;
  const pageNumbers = visiblePageNumbers(currentPage, totalPages);
  const resultsTitle = query
    ? copy.resultsTitle
    : getCategoryLabel(category, categoryMeta, copy.categoryTask);
  const resultsCount = copy.resultsCount(resultCount, query);
  const homeHref = getDefaultLocalePath(locale);
  const hubHref = getTechnicalReviewPath(locale, '/tech-center');
  const getPageHref = (pageNumber: number) => {
    if (!clientPagination) return getTechnicalReviewPath(locale, getTechCenterPagePath(pageNumber));
    const params = new URLSearchParams({
      category,
      q: query.trim(),
      sourceType: source,
      sort,
      page: String(pageNumber)
    });
    return `${hubHref}?${params}`;
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCategory = params.get('category') as TechCategoryKey | null;
    const urlSource = params.get('sourceType') as SourceFilter | null;
    const urlSort = params.get('sort') as SortMode | null;
    const pageValue = Number(params.get('page'));
    const urlPage = Number.isSafeInteger(pageValue) && pageValue > 0 ? pageValue : initialPage;
    const filteredUrl = Boolean(
      params.get('q')?.trim() ||
        (urlCategory &&
          urlCategory !== 'all' &&
          categoryMeta.some((item) => item.key === urlCategory)) ||
        (urlSource && urlSource !== 'all' && SEARCH_SOURCE_TYPES.has(urlSource)) ||
        urlSort === 'title' ||
        urlSort === 'minutes'
    );
    if (!filteredUrl && params.has('page') && urlPage > 1) {
      params.delete('page');
      const path = getTechnicalReviewPath(locale, getTechCenterPagePath(urlPage));
      router.replace(`${path}${params.size ? `?${params}` : ''}${window.location.hash}`, {
        scroll: false
      });
      return;
    }

    queueMicrotask(() => {
      if (
        urlCategory &&
        (urlCategory === 'all' || categoryMeta.some((item) => item.key === urlCategory))
      ) {
        setCategory(urlCategory);
      }
      if (urlSource && (urlSource === 'all' || SEARCH_SOURCE_TYPES.has(urlSource))) {
        setSource(urlSource);
      }
      if (urlSort === 'default' || urlSort === 'title' || urlSort === 'minutes') {
        setSort(urlSort);
      }
      setQuery(params.get('q') || '');
      setPage(filteredUrl ? urlPage : initialPage);
      setUrlStateReady(true);
      if (params.has('q')) searchInputRef.current?.focus();
    });
  }, [categoryMeta, initialPage, locale, router]);

  useEffect(() => {
    if (!urlStateReady) return;

    const url = new URL(window.location.href);
    const values: Record<string, string> = {
      category,
      q: query.trim(),
      sourceType: source,
      sort,
      page: hasFilters ? String(entries ? currentPage : page) : '1'
    };

    Object.entries(values).forEach(([key, value]) => {
      if (!value || value === 'all' || value === 'default' || (key === 'page' && value === '1')) {
        url.searchParams.delete(key);
      } else {
        url.searchParams.set(key, value);
      }
    });
    url.pathname = hasFilters
      ? hubHref
      : getTechnicalReviewPath(locale, getTechCenterPagePath(currentPage));
    if (url.pathname !== window.location.pathname) {
      router.replace(`${url.pathname}${url.search}${url.hash}`, { scroll: false });
    } else {
      window.history.replaceState(null, '', url);
    }
  }, [
    category,
    currentPage,
    entries,
    hasFilters,
    hubHref,
    locale,
    page,
    query,
    router,
    sort,
    source,
    urlStateReady
  ]);

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
      <Navbar
        links={links}
        t={navCta}
        locale={locale}
        publishedLocales={techPublishedLocaleCodes}
        reviewLocalePaths={isPreviewSite}
        languageSwitchPaths={languageSwitchPaths}
      />
      <main id="main-content" className={`${styles.page} ${styles.main}`}>
        <a className={styles.skipLink} href="#main-content">
          {copy.skipLink}
        </a>
        <nav className={`${styles.container} ${styles.breadcrumbs}`} aria-label={copy.breadcrumbs}>
          <a href={homeHref}>FastGPT</a>
          <span aria-hidden="true">/</span>
          <a href={hubHref} aria-current={initialPage === 1 ? 'page' : undefined}>
            {copy.hubName}
          </a>
          {initialPage > 1 && (
            <>
              <span aria-hidden="true">/</span>
              <span aria-current="page">
                {locale === 'zh' ? `第 ${initialPage} 页` : `Page ${initialPage}`}
              </span>
            </>
          )}
        </nav>
        <section className={`${styles.container} ${styles.intro}`} aria-labelledby="page-title">
          <div className={styles.eyebrow}>{copy.eyebrow}</div>
          <h1 id="page-title">
            {copy.heroLineOne}
            <br />
            {copy.heroLineTwo}
          </h1>
          <p className={styles.introCopy}>{copy.intro(totalEntries)}</p>
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
                placeholder={copy.searchPlaceholder}
                aria-label={copy.searchAria}
              />
              {query && (
                <button
                  className={styles.clearSearch}
                  type="button"
                  aria-label={copy.clearSearch}
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
              {copy.searchButton}
              <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
            </button>
          </form>
          <div className={styles.trustBar} aria-label={copy.overviewAria}>
            <span>{copy.contentCount(totalEntries)}</span>
            <span>{copy.topicCount(categoryMeta.length)}</span>
            <span>{copy.sourceSummary}</span>
          </div>
        </section>

        {featuredEntry && (
          <section
            className={`${styles.container} ${styles.featured}`}
            aria-labelledby="featured-title"
          >
            <div className={styles.flowCanvas} role="img" aria-label={copy.flowAria}>
              <div className={styles.canvasLabel}>{copy.flowLabel}</div>
              <div className={styles.flowStage}>
                <div className={styles.flowLine} aria-hidden="true" />
                {copy.flowNodes.map((node) => (
                  <div className={styles.flowNode} key={node.number}>
                    <span className={styles.nodeIcon}>{node.number}</span>
                    <span className={styles.nodeTitle}>{node.title}</span>
                    <span className={styles.nodeKind}>{node.kind}</span>
                  </div>
                ))}
              </div>
              <div className={styles.canvasNote}>{copy.flowNote}</div>
            </div>

            <div className={styles.featuredCopy}>
              <div className={styles.featuredEyebrow}>{copy.featured}</div>
              <div className={styles.metaRow}>
                <span className={styles.badge}>
                  {getCategoryLabel(featuredEntry.category, categoryMeta, copy.categoryTask)}
                </span>
                <span className={`${styles.badge} ${styles.sourceBadge}`}>
                  {getSourceLabel(featuredEntry.sourceType, copy.sourceLabels)}
                </span>
                <span>{copy.readMinutes(featuredEntry.minutes)}</span>
              </div>
              <h2 className={styles.featuredTitle} id="featured-title">
                {featuredEntry.title}
              </h2>
              <p className={styles.featuredSummary}>{featuredEntry.summary}</p>
              <div className={styles.featuredActions}>
                <a
                  className={styles.primaryLink}
                  href={getTechnicalReviewPath(locale, getTechEntryPath(featuredEntry))}
                >
                  {copy.readApiGuide} <ArrowRight size={16} strokeWidth={1.8} aria-hidden="true" />
                </a>
                <a
                  className={styles.textLink}
                  href={featuredEntry.source}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {copy.viewDocs} <ExternalLink size={14} strokeWidth={1.8} aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        )}

        <section
          className={`${styles.container} ${styles.library}`}
          id="content-library"
          aria-labelledby="results-title"
        >
          <aside className={styles.filters} aria-label={copy.filtersAria}>
            <div className={styles.filterGroup}>
              <h2 className={styles.filterHeading}>{copy.byTopic}</h2>
              <div className={styles.categoryList}>
                {categoryItems.map((item) => (
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
                  {copy.sourceType}
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
                  {sourceOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.filterGroup}>
              <h2 className={styles.filterHeading}>{copy.commonEntries}</h2>
              <div className={styles.tagList}>
                {copy.commonTopics.map((topic) => (
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
                {copy.contentSource}
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
                {sourceOptions.map((option) => (
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
                {copy.sortAria}
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
                <option value="default">{copy.sortDefault}</option>
                <option value="title">{copy.sortTitle}</option>
                <option value="minutes">{copy.sortMinutes}</option>
              </select>
            </div>

            {pageEntries.length > 0 ? (
              <>
                <div className={styles.cardGrid}>
                  {pageEntries.map((entry) => (
                    <article className={styles.articleCard} key={entry.identity}>
                      <div className={styles.cardTop}>
                        <span className={styles.badge}>
                          {getCategoryLabel(entry.category, categoryMeta, copy.categoryTask)}
                        </span>
                        <span className={styles.cardSource}>
                          {getSourceLabel(entry.sourceType, copy.sourceLabels)}
                        </span>
                      </div>
                      <h3 className={styles.cardTitle}>
                        <a href={getTechnicalReviewPath(entry.locale, entry.publicPath)}>
                          {entry.title}
                        </a>
                      </h3>
                      <p className={styles.cardSummary}>{entry.description}</p>
                      <div className={styles.cardFooter}>
                        <span>{copy.readMinutes(entry.minutes)}</span>
                        <span className={styles.cardArrow} aria-hidden="true">
                          <ArrowRight size={16} strokeWidth={1.8} />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>

                {totalPages > 1 && (
                  <nav className={styles.pagination} aria-label={copy.pagination}>
                    <a
                      className={styles.pageButton}
                      href={currentPage > 1 ? getPageHref(currentPage - 1) : undefined}
                      aria-disabled={currentPage === 1 || undefined}
                      aria-label={copy.previousPage}
                      onClick={
                        clientPagination && currentPage > 1
                          ? (event) => {
                              event.preventDefault();
                              changePage(currentPage - 1);
                            }
                          : undefined
                      }
                    >
                      <ChevronLeft size={17} strokeWidth={1.8} aria-hidden="true" />
                    </a>
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
                          <a
                            className={styles.pageButton}
                            href={getPageHref(pageNumber)}
                            aria-current={pageNumber === currentPage ? 'page' : undefined}
                            onClick={
                              clientPagination
                                ? (event) => {
                                    event.preventDefault();
                                    changePage(pageNumber);
                                  }
                                : undefined
                            }
                          >
                            {pageNumber}
                          </a>
                        </Fragment>
                      );
                    })}
                    <a
                      className={styles.pageButton}
                      href={currentPage < totalPages ? getPageHref(currentPage + 1) : undefined}
                      aria-disabled={currentPage === totalPages || undefined}
                      aria-label={copy.nextPage}
                      onClick={
                        clientPagination && currentPage < totalPages
                          ? (event) => {
                              event.preventDefault();
                              changePage(currentPage + 1);
                            }
                          : undefined
                      }
                    >
                      <ChevronRight size={17} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  </nav>
                )}
              </>
            ) : (
              <div className={styles.emptyState}>
                <div>
                  <h3>{copy.emptyTitle}</h3>
                  <p>{query ? copy.emptyQuery(query) : copy.emptyFiltered}</p>
                  <button className={styles.clearButton} type="button" onClick={clearFilters}>
                    {copy.clearFilters}
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer t={footer} locale={locale} />
    </div>
  );
}
