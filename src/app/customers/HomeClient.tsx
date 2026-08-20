"use client";

import { useEffect, useRef } from 'react';
import Navbar from "@/customers/components/Navbar";
import { type Customer } from "@/customers/components/CustomerCard";
import Hero from "@/customers/components/Hero";
import ClientLogos from "@/customers/components/home/ClientLogos";
import BottomCta from "@/customers/components/BottomCta";
import CustomersSection from "@/customers/components/home/CustomersSection";
import { openCtaModal, type CtaModalContext } from "@/customers/lib/cta";
import type { CustomersPagination } from "@/customers/lib/home-customers-cache";
import { useHomeSmartSearch } from "@/customers/hooks/useHomeSmartSearch";
import { useHomeCustomers } from "@/customers/hooks/useHomeCustomers";
import { useDebouncedValue } from '@/customers/hooks/useDebouncedValue';
import { trackRybbitEvent } from '@/customers/lib/rybbit';

interface HomeClientProps {
  initialCategories: { id: string; name: string; slug?: string; color?: string }[];
  initialCustomers: Customer[];
  initialPagination: CustomersPagination;
  overviewStats: { value: string; label: string; link?: string; live?: boolean }[];
  initialCategorySlug?: string;
}

export default function HomeClient({
  initialCategories,
  initialCustomers,
  initialPagination,
  overviewStats,
  initialCategorySlug
}: HomeClientProps) {
  const homeCustomers = useHomeCustomers({
    initialCategories,
    initialCustomers,
    initialPagination,
    initialCategorySlug
  });
  const { isAiSearching, handleSmartSearch } = useHomeSmartSearch({
    customers: homeCustomers.customers,
    onMatched: homeCustomers.pinCustomersHash
  });
  const openModal = (context?: CtaModalContext) => {
    openCtaModal(context ?? {
      source: 'home_bottom',
      title: '申请免费 POC 验证',
      subtitle: '填写约 1 分钟。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证，助力后续生产级交付。'
    });
  };

  // Rybbit 上报：关键词搜索
  // 使用与 useHomeCustomers 内部相同 220ms 的防抖策略（此处取 250ms 确保在 API 请求触发之后），
  // 避免 searchQuery 即时变化时携带旧 customers.length 错误上报。
  const debouncedQuery = useDebouncedValue(homeCustomers.searchQuery, 250);
  const searchTrackedRef = useRef<{ query: string; count: number }>({ query: '', count: 0 });

  useEffect(() => {
    const query = debouncedQuery.trim();

    if (!query) {
      // 清空搜索时重置追踪状态
      searchTrackedRef.current = { query: '', count: 0 };
      return;
    }

    // 等待 API 请求完成（防抖后 isCustomersLoading 已变为 true，等待其恢复 false）
    if (homeCustomers.isCustomersLoading) return;

    const count = homeCustomers.customers.length;

    // 去重：同一关键词 + 同一结果数不重复上报
    const prev = searchTrackedRef.current;
    if (prev.query === query && prev.count === count) return;

    searchTrackedRef.current = { query, count };

    trackRybbitEvent('search', {
      keyword: query,
      result_count: count,
      search_type: 'keyword'
    });
  }, [debouncedQuery, homeCustomers.customers.length, homeCustomers.isCustomersLoading]);

  return (
    <>
      <Navbar
        searchQuery={homeCustomers.searchQuery}
        onSearchChange={homeCustomers.handleSearchChange}
        onSmartSearch={handleSmartSearch}
        isSearching={isAiSearching}
      />

      <Hero overviewStats={overviewStats} />

      <main className="pb-0 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-8 relative z-10">
          <CustomersSection
            sectionRef={homeCustomers.customersSectionRef}
            categories={homeCustomers.categories}
            currentCategory={homeCustomers.currentCategory}
            sortBy={homeCustomers.sortBy}
            customers={homeCustomers.customers}
            isLoading={homeCustomers.isLoading}
            isShowingStaleCustomers={homeCustomers.isShowingStaleCustomers}
            hasMoreCustomers={homeCustomers.hasMoreCustomers}
            isLoadingMore={homeCustomers.isLoadingMore}
            isCustomersLoading={homeCustomers.isCustomersLoading}
            onCategoryChange={homeCustomers.handleCategoryClick}
            onCategoryPrefetch={homeCustomers.handleCategoryPrefetch}
            onSortChange={homeCustomers.handleSortChange}
            onLikeToggle={homeCustomers.handleLikeToggle}
            onLoadMore={homeCustomers.handleLoadMore}
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
