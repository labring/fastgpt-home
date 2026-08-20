"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState, useEffect, useCallback, useMemo, useRef, lazy, Suspense } from "react";
import { ArrowRightIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react";
import Navbar from "@/customers/components/Navbar";
import CustomerCard, { Customer as CardCustomer } from "@/customers/components/CustomerCard";
import { toast } from "sonner";

import { markdownComponents } from "@/customers/components/customer/MarkdownComponents";
import TocToggleButton from "@/customers/components/customer/TocToggleButton";
import CustomerHero from "@/customers/components/customer/CustomerHero";
import BottomCta from "@/customers/components/BottomCta";
import MobileToc from "@/customers/components/customer/MobileToc";
import DesktopToc from "@/customers/components/customer/DesktopToc";
import HelpfulFeedback from "@/customers/components/customer/HelpfulFeedback";
import { withBasePath } from "@/customers/lib/base-path";

const AiSummaryCard = lazy(() => import("@/customers/components/customer/AiSummaryCard"));
import { useSyncedToc } from "@/customers/components/customer/useSyncedToc";
import { buildHomeHref } from "@/customers/lib/home-routing";
import { formatCount } from "@/customers/lib/counts";
import { getCustomerPublicHref } from "@/customers/lib/customer-url";
import {
  fetchFirstMatchedCustomer,
  requestSmartSearchMatch,
  SMART_SEARCH_EMPTY_DESCRIPTION
} from "@/customers/lib/customer-search";
import {
  getLikedCustomerState,
  getViewedCustomerState,
  saveLikedCustomerState,
  saveViewedCustomerState
} from "@/customers/utils/likes";
import { openCtaModal, type CtaModalContext } from "@/customers/lib/cta";
import { trackRybbitEvent } from '@/customers/lib/rybbit';
import { publishCustomerInteractionPatch } from "@/customers/lib/customer-interaction-events";

import useSWR, { useSWRConfig } from "swr";

import ReactMarkdown from "react-markdown";
import {
  MARKDOWN_PROSE_CLASSES,
  markdownRehypePlugins,
  markdownRemarkPlugins,
  prepareMarkdownContent
} from "@/customers/components/customer/markdownConfig";

interface CustomerDetail extends CardCustomer {
  content: string;
  updatedAt?: string;
}

interface CustomerPageClientProps {
  id: string;
  initialCustomer: CustomerDetail | null;
  initialRelatedCustomers?: CardCustomer[];
}

const noStoreJsonFetcher = (url: string) =>
  fetch(url, { cache: 'no-store' }).then((response) => {
    if (!response.ok) {
      throw new Error('Failed to fetch');
    }

    return response.json();
  });

export default function CustomerPageClient({ id, initialCustomer, initialRelatedCustomers = [] }: CustomerPageClientProps) {
  const [localLikes, setLocalLikes] = useState(initialCustomer?.likes ?? 0);
  const [isLiked, setIsLiked] = useState(initialCustomer?.isLiked ?? false);
  const [localUsage, setLocalUsage] = useState<string>(initialCustomer?.usage ?? "");
  const [hasViewed, setHasViewed] = useState(Boolean(initialCustomer?.hasViewed));
  const [isLikePending, setIsLikePending] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAiSearching, setIsAiSearching] = useState(false);
  const articleRef = useRef<HTMLElement | null>(null);
  const scrollTickingRef = useRef(false);
  const countedViewForIdRef = useRef<string | null>(null);
  const likedStickyRef = useRef(Boolean(initialCustomer?.isLiked));
  const likesFloorRef = useRef<number | null>(null);
  const usageFloorRef = useRef<number | null>(null);
  const customerIdRef = useRef(id);
  const router = useRouter();
  const { mutate } = useSWRConfig();

  const [relatedCustomers, setRelatedCustomers] = useState<CardCustomer[]>(initialRelatedCustomers || []);

  const patchRelatedCustomer = useCallback((customerId: string, patch: Partial<CardCustomer>) => {
    setRelatedCustomers((prev) => prev.map((item) => (
      String(item.id) === customerId ? { ...item, ...patch } : item
    )));
  }, []);

  const { data: customer, error } = useSWR<CustomerDetail>(
    id ? withBasePath(`/api/customers/${id}`) : null,
    noStoreJsonFetcher,
    {
      fallbackData: initialCustomer || undefined,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 10000,
      onSuccess: (data) => {
        if (customerIdRef.current !== id) {
          customerIdRef.current = id;
          likedStickyRef.current = Boolean(data.isLiked);
          likesFloorRef.current = null;
          usageFloorRef.current = null;
        }

        if (id) {
          const localState = getLikedCustomerState(id);
          const viewedState = getViewedCustomerState(id);
          const nextIsLiked = data.isLiked ?? localState?.isLiked ?? false;
          const nextHasViewed = Boolean(data.hasViewed || viewedState?.hasViewed || false);
          if (nextIsLiked) {
            likedStickyRef.current = true;
          }
          const nextLikes = likesFloorRef.current === null
            ? data.likes
            : Math.max(data.likes, likesFloorRef.current);
          const dataRawUsageCount = data.rawUsageCount ?? 0;
          const nextRawUsageCount = usageFloorRef.current === null
            ? dataRawUsageCount
            : Math.max(dataRawUsageCount, usageFloorRef.current);

          setLocalLikes(nextLikes);
          setIsLiked(likedStickyRef.current || nextIsLiked);
          setLocalUsage(
            nextRawUsageCount > dataRawUsageCount
              ? formatCount(nextRawUsageCount)
              : data.usage || ""
          );
          setHasViewed(nextHasViewed);
        } else {
          setLocalLikes(data.likes);
          setIsLiked(data.isLiked || false);
          setLocalUsage(data.usage || "");
          setHasViewed(Boolean(data.hasViewed));
        }
      }
    }
  );

  const markdownContent = useMemo(() => customer?.content || '', [customer]);

  useEffect(() => {
    if (customer?.isLiked) {
      likedStickyRef.current = true;
      saveLikedCustomerState(id, true);
    }
  }, [id, customer?.isLiked]);

  const openModal = useCallback((context?: CtaModalContext) => {
    openCtaModal(context ?? {
      source: 'customer_bottom',
      title: '申请免费 POC 验证',
      subtitle: '填写约 1 分钟。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证，助力后续生产级交付。',
      customerId: customer?.id,
      customerTitle: customer?.title,
      categoryName: customer?.categoryName,
      customerSlug: customer?.slug
    });
  }, [customer?.categoryName, customer?.id, customer?.title, customer?.slug]);

  const scrollToPageTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const navigationCustomers = useMemo(() => {
    if (!customer) return [];
    const hasCurrentCustomer = relatedCustomers.some((item) => String(item.id) === String(customer.id));

    return hasCurrentCustomer ? relatedCustomers : [customer, ...relatedCustomers];
  }, [relatedCustomers, customer]);

  const prevCustomer = useMemo(() => {
    if (!customer || navigationCustomers.length === 0) return null;
    const currentIndex = navigationCustomers.findIndex((item) => String(item.id) === String(customer.id));
    const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;
    const previousIndex = (safeCurrentIndex - 1 + navigationCustomers.length) % navigationCustomers.length;
    const previousCustomer = navigationCustomers[previousIndex];

    return { id: previousCustomer.id, title: previousCustomer.title };
  }, [navigationCustomers, customer]);

  const nextCustomer = useMemo(() => {
    if (!customer || navigationCustomers.length === 0) return null;
    const currentIndex = navigationCustomers.findIndex((item) => String(item.id) === String(customer.id));
    const safeCurrentIndex = currentIndex >= 0 ? currentIndex : 0;
    const nextIndex = (safeCurrentIndex + 1) % navigationCustomers.length;
    const nextCustomer = navigationCustomers[nextIndex];

    return { id: nextCustomer.id, title: nextCustomer.title };
  }, [navigationCustomers, customer]);

  const allRelatedCustomers = useMemo(() => {
    if (!customer) return [];
    return relatedCustomers.filter((item) => String(item.id) !== String(customer.id));
  }, [relatedCustomers, customer]);

  const itemsPerPage = 3;
  const totalPages = Math.ceil(allRelatedCustomers.length / itemsPerPage);

  const currentCustomers = useMemo(() => {
    const start = currentPage * itemsPerPage;
    return allRelatedCustomers.slice(start, start + itemsPerPage);
  }, [allRelatedCustomers, currentPage]);

  const getCustomerHref = useCallback((customerId: string | number) => {
    const matchedCustomer = relatedCustomers.find(
      (item) => String(item.id) === String(customerId)
    );

    return matchedCustomer?.categorySlug
      ? withBasePath(getCustomerPublicHref(matchedCustomer))
      : withBasePath(getCustomerPublicHref({ id: customerId, categorySlug: customer?.categorySlug }));
  }, [relatedCustomers, customer?.categorySlug]);

  const nextPage = useCallback(() => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  const prevPage = useCallback(() => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  }, [totalPages]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    const categorySlug =
      customer?.categoryId === categoryId ? customer.categorySlug : undefined;

    if (categorySlug) {
      router.push(`/categories/${categorySlug}`);
    }
  }, [router, customer]);

  const handleRelatedLikeToggle = useCallback((customerId: string | number, state?: { isLiked: boolean; likes: number }) => {
    if (!state) {
      return;
    }

    patchRelatedCustomer(String(customerId), state);
  }, [patchRelatedCustomer]);

  const handleSmartSearch = useCallback(async (query: string) => {
    setIsAiSearching(true);
    try {
      const data = await requestSmartSearchMatch(query);

      if (data.matched_case) {
         // Rybbit 上报：AI 搜索匹配成功
         trackRybbitEvent('search', {
           keyword: query,
           result_count: 1,
           search_type: 'ai'
         });

         let matchedCustomer: CardCustomer | null = null;
         try {
           matchedCustomer = await fetchFirstMatchedCustomer<CardCustomer>(data.matched_case);
         } catch (e) {
           console.error('Failed to fetch matched customer detail', e);
         }

         if (matchedCustomer) {
           toast.success(`为您找到匹配案例：${matchedCustomer.title}`);
           router.push(withBasePath(getCustomerPublicHref(matchedCustomer)));
         } else {
           toast.info('抱歉，未能匹配到相关智能应用，请换个说法试试~', {
             description: SMART_SEARCH_EMPTY_DESCRIPTION
           });
           router.push(buildHomeHref({ search: query, section: "customers" }));
         }
       } else {
         // Rybbit 上报：AI 搜索未匹配
         trackRybbitEvent('search', {
           keyword: query,
           result_count: 0,
           search_type: 'ai'
         });

         toast.info('抱歉，未能匹配到相关智能应用，请换个说法试试~', {
           description: SMART_SEARCH_EMPTY_DESCRIPTION
         });
         router.push(buildHomeHref({ search: query, section: "customers" }));
       }
    } catch (error) {
      console.error('智能搜索请求失败', error);
      router.push(buildHomeHref({ search: query, section: "customers" }));
    } finally {
      setIsAiSearching(false);
    }
  }, [router]);

  useEffect(() => {
    let rafId: number;
    const handleScroll = () => {
      if (scrollTickingRef.current) return;
      scrollTickingRef.current = true;
      rafId = requestAnimationFrame(() => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = height > 0 ? (winScroll / height) * 100 : 0;
        const progressBar = document.getElementById('reading-progress');
        if (progressBar) {
          progressBar.style.width = scrolled + '%';
        }
        scrollTickingRef.current = false;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  const { tocItems, activeId, handleTocItemClick } = useSyncedToc({
    containerRef: articleRef,
    markdownContent
  });

  const handleLikeToggle = useCallback(async (e: React.MouseEvent) => {
    e.preventDefault();

    if (isLiked || isLikePending) {
      return;
    }

    setIsLikePending(true);
    setIsLiked(true);
    likesFloorRef.current = Math.max(localLikes, likesFloorRef.current ?? customer?.likes ?? initialCustomer?.likes ?? 0);
    saveLikedCustomerState(id, true);

    try {
      const detailRequestUrl = withBasePath(`/api/customers/${id}`);
      const res = await fetch(`${detailRequestUrl}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like' })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && typeof data.likes === 'number') {
        const confirmedLikes = Math.max(data.likes, likesFloorRef.current ?? data.likes);
        likesFloorRef.current = confirmedLikes;
        likedStickyRef.current = true;
        setIsLiked(true);
        setLocalLikes(confirmedLikes);
        saveLikedCustomerState(id, true);
        void mutate(detailRequestUrl, (currentData: CustomerDetail | undefined) => (
          currentData
            ? { ...currentData, likes: confirmedLikes, isLiked: true }
            : currentData
        ), { revalidate: false });
        patchRelatedCustomer(id, { likes: confirmedLikes, isLiked: true });
        publishCustomerInteractionPatch({
          id,
          patch: { likes: confirmedLikes, isLiked: true }
        });
      }
    } catch (err) {
      console.error('Like toggle failed:', err);
      const fallbackLiked = customer?.isLiked ?? initialCustomer?.isLiked ?? false;
      const fallbackLikes = customer?.likes ?? initialCustomer?.likes ?? 0;
      likedStickyRef.current = fallbackLiked;
      likesFloorRef.current = null;
      setIsLiked(fallbackLiked);
      setLocalLikes(fallbackLikes);
      saveLikedCustomerState(id, fallbackLiked);
    } finally {
      setIsLikePending(false);
    }
  }, [id, initialCustomer?.isLiked, initialCustomer?.likes, isLiked, isLikePending, localLikes, mutate, patchRelatedCustomer, customer?.isLiked, customer?.likes]);

  const countView = useCallback(async () => {
    if (!id || countedViewForIdRef.current === id) {
      return;
    }

    countedViewForIdRef.current = id;
    try {
      const detailRequestUrl = withBasePath(`/api/customers/${id}`);
      const res = await fetch(`${detailRequestUrl}/view`, { method: 'POST' });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && typeof data.rawUsageCount === 'number') {
        usageFloorRef.current = Math.max(data.rawUsageCount, usageFloorRef.current ?? 0);
        const nextUsage = data.usage || formatCount(usageFloorRef.current);
        setHasViewed(true);
        setLocalUsage(nextUsage);
        saveViewedCustomerState(id, true);
        void mutate(detailRequestUrl, (currentData: CustomerDetail | undefined) => (
          currentData
            ? {
                ...currentData,
                usage: nextUsage,
                rawUsageCount: usageFloorRef.current ?? data.rawUsageCount,
                hasViewed: true
              }
            : currentData
        ), { revalidate: false });
        patchRelatedCustomer(id, {
          usage: nextUsage,
          rawUsageCount: usageFloorRef.current ?? data.rawUsageCount,
          hasViewed: true
        });
        publishCustomerInteractionPatch({
          id,
          patch: {
            usage: nextUsage,
            rawUsageCount: usageFloorRef.current ?? data.rawUsageCount,
            hasViewed: true
          }
        });
      }
    } catch (err) {
      countedViewForIdRef.current = null;
      console.error('View increment failed:', err);
    }
  }, [id, mutate, patchRelatedCustomer]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void countView();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [countView]);

  if (error && !initialCustomer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-100 dark:bg-[#202124]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#1f2329] dark:text-[#f1f3f5] mb-2">加载失败</h2>
          <p className="text-ink-sub dark:text-[#aeb4bc] mb-6">获取案例详情时发生错误，请稍后重试。</p>
          <button
            onClick={() => router.push(buildHomeHref({ section: "customers" }))}
            className="px-4 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 transition-colors"
          >
            返回
          </button>
        </div>
      </div>
    );
  }

  if (!customer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-100 dark:bg-[#202124]">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-brand-600 mb-4"></div>
          <p className="text-ink-sub dark:text-[#aeb4bc]">正在加载案例详情...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-100 dark:bg-[#202124] font-sans text-[#2b2f36] dark:text-[#dfe1e5] selection:bg-[#e8f3ff] dark:selection:bg-[#203652] selection:text-[#1f2329] dark:selection:text-[#dfe1e5] flex flex-col">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSmartSearch={handleSmartSearch}
        isSearching={isAiSearching}
      />

      <div className="fixed top-0 left-0 h-1 bg-brand-500 z-50 transition-all duration-300" style={{ width: '0%' }} id="reading-progress"></div>

      <main className="flex-1 pt-16">
        <div className="sticky top-16 z-30 hidden transition-all duration-300 pointer-events-none -mb-10 sm:block">
          <div className="w-full bg-white/0 dark:bg-black/0 backdrop-blur-2xl border-b border-transparent pointer-events-auto transform-gpu">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:pl-4 lg:pr-8 pt-3 pb-3">
              <nav className="flex items-center text-sm font-medium text-ink-sub dark:text-[#aeb4bc] w-fit">
                <Link href="/customers" className="hover:text-brand-600 transition-colors">首页</Link>
                <span className="mx-2">/</span>
                <Link href={buildHomeHref({ section: "customers" })} className="hover:text-brand-600 transition-colors">全部案例</Link>
                <span className="mx-2">/</span>
                <Link href={`/customers/categories/${customer.categorySlug}`} className="hover:text-brand-600 transition-colors">
                  {customer.categoryName}
                </Link>
                <span className="mx-2">/</span>
                <button
                  type="button"
                  onClick={scrollToPageTop}
                  className="text-[#1f2329] dark:text-[#f1f3f5] font-medium truncate max-w-[200px] sm:max-w-xs hover:text-brand-600 transition-colors cursor-pointer text-left"
                  aria-label={`回到${customer.title}页面顶部`}
                >
                  {customer.title}
                </button>
              </nav>
            </div>
          </div>
        </div>

        <CustomerHero
          customer={customer}
          prevCustomer={prevCustomer}
          nextCustomer={nextCustomer}
          getNavHref={getCustomerHref}
          localLikes={localLikes}
          isLiked={isLiked}
          localUsage={localUsage}
          hasViewed={hasViewed}
          handleLikeToggle={handleLikeToggle}
          openModal={openModal}
          onCategoryClick={handleCategoryClick}
          onBack={() => router.back()}
        />

        <div className="w-full bg-white dark:bg-[#202124] pt-6 pb-0 relative">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <TocToggleButton
              onClick={() => setIsMobileMenuOpen(true)}
              isVisible={!isMobileMenuOpen}
              className="lg:hidden"
            />

            <MobileToc
              isOpen={isMobileMenuOpen}
              onClose={() => setIsMobileMenuOpen(false)}
              tocItems={tocItems}
              activeId={activeId}
	              openModal={openModal}
	              customerId={customer.id}
	              customerTitle={customer.title}
	              categoryName={customer.categoryName}
	              customerSlug={customer.slug}
	              onItemClick={handleTocItemClick}
	            />

            <TocToggleButton
              onClick={() => setIsSidebarCollapsed(false)}
              isVisible={isSidebarCollapsed}
              className="hidden lg:flex"
            />

            <div className="flex flex-col lg:flex-row items-start relative w-full">

              <article ref={articleRef} className="min-w-0 flex-1 w-full transition-all duration-500 ease-in-out">

                <Suspense fallback={null}>
                  <AiSummaryCard
                    key={`${id}:${customer.updatedAt || 'current'}`}
                    customerId={id}
                    contentVersion={customer.updatedAt}
                  />
                </Suspense>

                <div className={`${MARKDOWN_PROSE_CLASSES} transition-all duration-500 ease-in-out text-[15px] sm:text-base`}>
                  <ReactMarkdown
                    remarkPlugins={markdownRemarkPlugins}
                    rehypePlugins={markdownRehypePlugins}
                    components={markdownComponents}
                  >
                    {prepareMarkdownContent(markdownContent)}
                  </ReactMarkdown>
                </div>

                <HelpfulFeedback customerId={id} />
              </article>

              <DesktopToc
                isCollapsed={isSidebarCollapsed}
                onCollapse={() => setIsSidebarCollapsed(true)}
                tocItems={tocItems}
                activeId={activeId}
	                openModal={openModal}
	                customerId={customer.id}
	                customerTitle={customer.title}
	                categoryName={customer.categoryName}
	                onItemClick={handleTocItemClick}
	              />
            </div>
          </div>
      </div>

        <div className="w-full bg-white dark:bg-[#202124] py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="relative flex flex-col items-center mb-6">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-[#1f2329] dark:text-[#f1f3f5] font-display tracking-tight">更多行业案例</h2>
                <p className="mt-1.5 text-sm text-ink-sub dark:text-[#aeb4bc] max-w-2xl">探索 FastGPT 在不同领域的更多智能化应用方案</p>
              </div>
              <div className="md:absolute md:right-0 md:bottom-1 mt-2.5 md:mt-0">
                <Link
                  href={buildHomeHref({ section: "customers" })}
                  className="inline-flex items-center gap-1 text-sm font-medium text-brand-600 dark:text-brand-400 hover:text-brand-700 dark:hover:text-brand-300 transition-colors group"
                >
                  查看全部案例
                  <ArrowRightIcon weight="bold" className="text-xs transition-transform duration-300 group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>

            <div className="relative group/carousel px-0 sm:px-12">
              <button
                onClick={prevPage}
                className="absolute -left-2 sm:left-0 top-[42%] -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-[#2b2f36] shadow-sm border border-surface-200 dark:border-[#373c43] text-[#8f959e] dark:text-[#8f959e] hover:text-brand-600 dark:hover:text-[#8ab4f8] hover:scale-105 transition-all cursor-pointer"
                aria-label="Previous page"
              >
                <CaretLeftIcon size={18} weight="bold" />
              </button>

              <div className="grid grid-cols-1 gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
                {currentCustomers.map((item, index) => (
                  <div key={`${item.id}-${currentPage}`} className="flex h-full">
                    <CustomerCard
                      customer={item}
                      index={index}
                      onLikeToggle={handleRelatedLikeToggle}
                      onCategoryClick={handleCategoryClick}
                    />
                  </div>
                ))}
              </div>

              <button
                onClick={nextPage}
                className="absolute -right-2 sm:right-0 top-[42%] -translate-y-1/2 z-20 w-8 h-8 flex items-center justify-center rounded-full bg-white dark:bg-[#2b2f36] shadow-sm border border-surface-200 dark:border-[#373c43] text-[#8f959e] dark:text-[#8f959e] hover:text-brand-600 dark:hover:text-[#8ab4f8] hover:scale-105 transition-all cursor-pointer"
                aria-label="Next page"
              >
                <CaretRightIcon size={18} weight="bold" />
              </button>

              <div className="flex justify-center gap-1.5 mt-6">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`h-1 rounded-full transition-all duration-300 ${
                      currentPage === i ? "w-5 bg-brand-500" : "w-1.5 bg-gray-200 dark:bg-[#373c43] hover:bg-gray-300 dark:hover:bg-[#4b525c]"
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

	        <BottomCta
	          openModal={openModal}
	          title="免费验证这个方案是否适合你的业务"
	          description="提交业务流程、数据现状和目标效果。商务顾问将在 1 天内联系你，确认需求后由 FastGPT 团队最快 3 天完成免费 POC 验证，帮助判断是否具备生产落地价值。"
	          buttonLabel="申请免费 POC"
	          showTopBorder={false}
	          modalContext={{
	            source: 'customer_bottom',
	            title: '申请免费 POC 验证',
	            subtitle: '填写约 1 分钟。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付该方案的免费 POC 验证。',
	            customerId: customer.id,
	            customerTitle: customer.title,
	            categoryName: customer.categoryName,
	            customerSlug: customer.slug
	          }}
	        />
      </main>
    </div>
  );
}
