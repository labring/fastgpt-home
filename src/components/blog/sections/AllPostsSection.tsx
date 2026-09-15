'use client';

import { useRef, useState } from 'react';

import type { BlogListPost } from '@/components/blog/blogPagination';
import FilterBar, { type BlogFilter } from '@/components/blog/components/FilterBar';
import LoadMoreButton from '@/components/blog/components/LoadMoreButton';
import PostsGrid from '@/components/blog/components/PostsGrid';

type AllPostsCopy = {
  title: string;
  filters: Record<BlogFilter, string>;
  categoryLabels: Record<string, string>;
  search: string;
  readMore: string;
  loadMore: string;
  end: string;
  empty: string;
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

  const updateFilter = (filter: BlogFilter) => {
    if (filter === activeFilter) return;

    setActiveFilter(filter);
    setLoadedPosts([]);
    setPage(0);
    setHasMore(true);
    void loadPage(filter, 1);
  };

  const updateSearch = (query: string) => {
    setSearchQuery(query);
    // [TODO] Implement blog post search.
  };

  return (
    <section className="container px-4 pb-20 pt-16 sm:px-8">
      <h2 className="m-0 text-center text-4xl font-medium leading-tight text-ink md:text-5xl">
        {copy.title}
      </h2>

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
        <PostsGrid
          posts={loadedPosts}
          locale={locale}
          categoryLabels={copy.categoryLabels}
          readMoreLabel={copy.readMore}
          emptyLabel={copy.empty}
        />
      </div>

      {loadedPosts.length > 0 && (
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
