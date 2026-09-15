'use client';

import { useRef, useState } from 'react';

import { BLOG_CATEGORIES, type BlogListPost } from '@/components/blog/blogPagination';
import FilterBar, { type BlogFilter } from '@/components/blog/components/FilterBar';
import LoadMoreButton from '@/components/blog/components/LoadMoreButton';
import PostsGrid from '@/components/blog/components/PostsGrid';
import { getDefaultLocaleForSiteVariant } from '@/lib/siteRouting';

type AllPostsCopy = {
  title: string;
  filters: Record<BlogFilter, string>;
  categoryLabels: Record<string, string>;
  search: string;
  readMore: string;
  loadMore: string;
  end: string;
  empty: string;
  searching: string;
};

type AllPostsSectionProps = {
  posts: BlogListPost[];
  hasMore: boolean;
  locale: string;
  copy: AllPostsCopy;
};

type BlogPageResponse = {
  page: number;
  hasMore: boolean;
  posts: BlogListPost[];
};

type PagefindSearchData = {
  url: string;
  excerpt?: string;
  plain_excerpt?: string;
  meta?: Record<string, string>;
};

type PagefindSearchResponse = {
  results: Array<{ data: () => Promise<PagefindSearchData> }>;
};

type PagefindApi = {
  options: (options: { bundlePath: string }) => Promise<void> | void;
  debouncedSearch: (
    term: string,
    options: { filters: Record<string, string> }
  ) => Promise<PagefindSearchResponse | null>;
};

const BLOG_PAGEFIND_BUNDLE_PATH = '/pagefind/blog/';
let pagefindPromise: Promise<PagefindApi> | undefined;

function isPagefindApi(value: unknown): value is PagefindApi {
  if (!value || typeof value !== 'object') return false;
  const api = value as { options?: unknown; debouncedSearch?: unknown };
  return typeof api.options === 'function' && typeof api.debouncedSearch === 'function';
}

function loadPagefind() {
  pagefindPromise ??= import(/* webpackIgnore: true */ `${BLOG_PAGEFIND_BUNDLE_PATH}pagefind.js`)
    .then(async (module) => {
      if (!isPagefindApi(module)) throw new Error('Invalid blog Pagefind bundle');
      const pagefind = module;
      await pagefind.options({ bundlePath: BLOG_PAGEFIND_BUNDLE_PATH });
      return pagefind;
    })
    .catch((error) => {
      pagefindPromise = undefined;
      throw error;
    });
  return pagefindPromise;
}

function resolveBlogSearchUrl(value: string, locale: string) {
  try {
    const url = new URL(value, window.location.origin);
    const pathname = url.pathname.replace(/\/index\.html$/, '').replace(/\.html$/, '');
    const segments = pathname.split('/').filter(Boolean);
    const isDefaultLocalePath =
      segments.length === 2 &&
      segments[0] === 'blog' &&
      locale === getDefaultLocaleForSiteVariant();
    const isLocalizedPath =
      segments.length === 3 && segments[0] === locale && segments[1] === 'blog';
    if (url.origin !== window.location.origin || (!isDefaultLocalePath && !isLocalizedPath)) {
      return null;
    }
    return `${pathname}${url.search}${url.hash}`;
  } catch {
    return null;
  }
}

function toBlogSearchPost(data: PagefindSearchData, locale: string): BlogListPost | null {
  const metadata = data.meta;
  const href = resolveBlogSearchUrl(data.url, locale);
  const category = metadata?.category;
  const slug = metadata?.slug;
  const title = metadata?.title;

  if (
    !href ||
    !slug ||
    !title ||
    metadata?.locale !== locale ||
    !category ||
    !BLOG_CATEGORIES.includes(category as (typeof BLOG_CATEGORIES)[number])
  ) {
    return null;
  }

  return {
    locale,
    slug,
    category: category as BlogListPost['category'],
    title,
    summary: metadata.summary || data.plain_excerpt || data.excerpt || '',
    thumbnail: metadata.image,
    date: metadata.date || '',
    href
  };
}

export default function AllPostsSection({
  posts,
  hasMore: initialHasMore,
  locale,
  copy
}: AllPostsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<BlogFilter>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loadedPosts, setLoadedPosts] = useState(posts);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResults, setSearchResults] = useState<BlogListPost[] | null>(null);
  const requestId = useRef(0);

  const loadPage = async (filter: BlogFilter, nextPage: number) => {
    const currentRequestId = ++requestId.current;
    setIsLoading(true);

    try {
      const categoryPath = filter === 'all' ? '' : `/${filter}`;
      const response = await fetch(`/api/blog/${locale}${categoryPath}/${nextPage}`);
      if (!response.ok) throw new Error(`Blog page request failed: ${response.status}`);

      const data = (await response.json()) as BlogPageResponse;
      if (currentRequestId !== requestId.current) return;

      setLoadedPosts((currentPosts) =>
        nextPage === 1 ? data.posts : [...currentPosts, ...data.posts]
      );
      setPage(data.page);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error('Failed to load more blog posts', error);
    } finally {
      if (currentRequestId === requestId.current) setIsLoading(false);
    }
  };

  const loadMore = () => {
    if (isLoading || !hasMore) return;
    void loadPage(activeFilter, page + 1);
  };

  const searchPosts = async (query: string, filter: BlogFilter) => {
    const currentRequestId = ++requestId.current;
    setIsLoading(true);

    try {
      const pagefind = await loadPagefind();
      const result = await pagefind.debouncedSearch(query.trim(), {
        filters: {
          locale,
          ...(filter === 'all' ? {} : { category: filter })
        }
      });
      if (currentRequestId !== requestId.current || !result) return;

      const data = await Promise.all(result.results.map((item) => item.data()));
      if (currentRequestId !== requestId.current) return;
      setSearchResults(
        data
          .map((item) => toBlogSearchPost(item, locale))
          .filter((item): item is BlogListPost => item !== null)
      );
    } catch (error) {
      if (currentRequestId === requestId.current) {
        console.error('Failed to search blog posts', error);
        setSearchResults([]);
      }
    } finally {
      if (currentRequestId === requestId.current) setIsLoading(false);
    }
  };

  const updateFilter = (filter: BlogFilter) => {
    if (filter === activeFilter) return;

    setActiveFilter(filter);
    setPage(1);
    if (searchQuery.trim()) {
      setSearchResults([]);
      void searchPosts(searchQuery, filter);
    } else {
      setLoadedPosts([]);
      setPage(0);
      setHasMore(true);
      void loadPage(filter, 1);
    }
  };

  const updateSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
    if (!query.trim()) {
      requestId.current += 1;
      setSearchResults(null);
      setIsLoading(false);
      setLoadedPosts([]);
      setPage(0);
      setHasMore(true);
      void loadPage(activeFilter, 1);
      return;
    }

    setSearchResults([]);
    void searchPosts(query, activeFilter);
  };

  const isSearching = Boolean(searchQuery.trim());
  const visiblePosts = isSearching ? searchResults || [] : loadedPosts;

  return (
    <section className="container pb-20 pt-16">
      <h2 className="m-0 text-center text-4xl font-medium text-ink md:text-5xl">{copy.title}</h2>

      <div className="mt-8">
        <FilterBar
          activeFilter={activeFilter}
          searchQuery={searchQuery}
          labels={copy.filters}
          searchLabel={copy.search}
          onFilterChange={updateFilter}
          onSearchChange={updateSearch}
        />
      </div>

      <div className="mt-8">
        {isLoading && isSearching ? (
          <p className="py-12 text-center text-base text-slate-500" aria-live="polite">
            {copy.searching}
          </p>
        ) : (
          <PostsGrid
            posts={visiblePosts}
            locale={locale}
            categoryLabels={copy.categoryLabels}
            readMoreLabel={copy.readMore}
            emptyLabel={copy.empty}
          />
        )}
      </div>

      {!isSearching && loadedPosts.length > 0 && (
        <div className="mt-8 flex justify-center">
          {hasMore ? (
            <LoadMoreButton label={copy.loadMore} disabled={isLoading} onClick={loadMore} />
          ) : (
            <span className="text-base font-medium">{copy.end}</span>
          )}
        </div>
      )}
    </section>
  );
}
