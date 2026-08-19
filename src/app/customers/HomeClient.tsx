"use client";

import { useEffect, useRef } from 'react';
import Navbar from "@/customers/components/Navbar";
import { type Solution } from "@/customers/components/SolutionCard";
import Hero from "@/customers/components/Hero";
import ClientLogos from "@/customers/components/home/ClientLogos";
import BottomCta from "@/customers/components/BottomCta";
import SolutionsSection from "@/customers/components/home/SolutionsSection";
import { openCtaModal, type CtaModalContext } from "@/customers/lib/cta";
import type { SolutionsPagination } from "@/customers/lib/home-solutions-cache";
import { useHomeSmartSearch } from "@/customers/hooks/useHomeSmartSearch";
import { useHomeSolutions } from "@/customers/hooks/useHomeSolutions";
import { useDebouncedValue } from '@/customers/hooks/useDebouncedValue';
import { trackRybbitEvent } from '@/customers/lib/rybbit';

interface HomeClientProps {
  initialCategories: { id: string; name: string; slug?: string; color?: string }[];
  initialSolutions: Solution[];
  initialPagination: SolutionsPagination;
  overviewStats: { value: string; label: string; link?: string; live?: boolean }[];
  initialCategorySlug?: string;
}

export default function HomeClient({
  initialCategories,
  initialSolutions,
  initialPagination,
  overviewStats,
  initialCategorySlug
}: HomeClientProps) {
  const homeSolutions = useHomeSolutions({
    initialCategories,
    initialSolutions,
    initialPagination,
    initialCategorySlug
  });
  const { isAiSearching, handleSmartSearch } = useHomeSmartSearch({
    solutions: homeSolutions.solutions,
    onMatched: homeSolutions.pinSolutionsHash
  });
  const openModal = (context?: CtaModalContext) => {
    openCtaModal(context ?? {
      source: 'home_bottom',
      title: '申请免费 POC 验证',
      subtitle: '填写约 1 分钟。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证，助力后续生产级交付。'
    });
  };

  // Rybbit 上报：关键词搜索
  // 使用与 useHomeSolutions 内部相同 220ms 的防抖策略（此处取 250ms 确保在 API 请求触发之后），
  // 避免 searchQuery 即时变化时携带旧 solutions.length 错误上报。
  const debouncedQuery = useDebouncedValue(homeSolutions.searchQuery, 250);
  const searchTrackedRef = useRef<{ query: string; count: number }>({ query: '', count: 0 });

  useEffect(() => {
    const query = debouncedQuery.trim();

    if (!query) {
      // 清空搜索时重置追踪状态
      searchTrackedRef.current = { query: '', count: 0 };
      return;
    }

    // 等待 API 请求完成（防抖后 isSolutionsLoading 已变为 true，等待其恢复 false）
    if (homeSolutions.isSolutionsLoading) return;

    const count = homeSolutions.solutions.length;

    // 去重：同一关键词 + 同一结果数不重复上报
    const prev = searchTrackedRef.current;
    if (prev.query === query && prev.count === count) return;

    searchTrackedRef.current = { query, count };

    trackRybbitEvent('search', {
      keyword: query,
      result_count: count,
      search_type: 'keyword'
    });
  }, [debouncedQuery, homeSolutions.solutions.length, homeSolutions.isSolutionsLoading]);

  return (
    <>
      <Navbar
        searchQuery={homeSolutions.searchQuery}
        onSearchChange={homeSolutions.handleSearchChange}
        onSmartSearch={handleSmartSearch}
        isSearching={isAiSearching}
      />

      <Hero overviewStats={overviewStats} />

      <main className="pb-0 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 relative z-10">
          <SolutionsSection
            sectionRef={homeSolutions.solutionsSectionRef}
            categories={homeSolutions.categories}
            currentCategory={homeSolutions.currentCategory}
            sortBy={homeSolutions.sortBy}
            solutions={homeSolutions.solutions}
            isLoading={homeSolutions.isLoading}
            isShowingStaleSolutions={homeSolutions.isShowingStaleSolutions}
            hasMoreSolutions={homeSolutions.hasMoreSolutions}
            isLoadingMore={homeSolutions.isLoadingMore}
            isSolutionsLoading={homeSolutions.isSolutionsLoading}
            onCategoryChange={homeSolutions.handleCategoryClick}
            onCategoryPrefetch={homeSolutions.handleCategoryPrefetch}
            onSortChange={homeSolutions.handleSortChange}
            onLikeToggle={homeSolutions.handleLikeToggle}
            onLoadMore={homeSolutions.handleLoadMore}
            onOpenModal={(ctx) => openModal(ctx)}
          />

          <ClientLogos />
        </div>

        <div className="w-full bg-surface-100 dark:bg-[#202124] pt-10 pb-0 relative">
          <BottomCta
            openModal={openModal}
            modalContext={{
              source: 'home_bottom',
              title: '申请免费 POC 验证',
              subtitle: '填写约 1 分钟。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证，助力后续生产级交付。'
            }}
          />
        </div>
      </main>
    </>
  );
}
