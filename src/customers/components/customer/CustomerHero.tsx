import Link from "next/link";
import { ArrowLeftIcon, HeartIcon, EyeIcon, CaretLeftIcon, CaretRightIcon } from "@phosphor-icons/react/dist/ssr";
import CategoryBadge from "@/customers/components/CategoryBadge";
import CustomerCoverImage from "@/customers/components/customer/CustomerCoverImage";
import { FreeUseHeroButton } from "@/customers/components/customer/FreeUseAction";
import { getSafeFreeUseUrl } from "@/customers/lib/free-use-url";
import type { CtaModalContext } from "@/customers/lib/cta";
type CustomerHeroData = {
  id: string | number;
  slug?: string;
  categoryId: string;
  categoryName: string;
  categoryColor?: string;
  title: string;
  description: string;
  imageUrl: string;
  thumbnailUrl?: string;
  freeUseUrl?: string;
  usage?: string;
  createdAt?: string;
};

type NavCustomer = { id: string | number; title: string } | null;

export default function CustomerHero({
  customer,
  prevCustomer,
  nextCustomer,
  getNavHref,
  localLikes,
  isLiked,
  localUsage,
  hasViewed,
  handleLikeToggle,
  openModal,
  onCategoryClick,
  onBack,
}: {
  customer: CustomerHeroData;
  prevCustomer?: NavCustomer;
  nextCustomer?: NavCustomer;
  getNavHref?: (id: string | number) => string;
  localLikes: number;
  isLiked: boolean;
  localUsage?: string;
  hasViewed?: boolean;
  handleLikeToggle: (e: React.MouseEvent) => void;
  openModal: (context?: CtaModalContext) => void;
  onCategoryClick?: (categoryId: string) => void;
  onBack?: () => void;
}) {
  const safeFreeUseUrl = getSafeFreeUseUrl(customer.freeUseUrl);

  return (
    <div className="w-full bg-surface-100 dark:bg-[#202124] border-b border-surface-300 dark:border-[#373c43] pt-10 pb-12 relative overflow-hidden">
      {/* 上一篇导航按钮 */}
      {prevCustomer && (
        <Link
          href={getNavHref ? getNavHref(prevCustomer.id) : `/customer/${prevCustomer.id}`}
          className="hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm shadow-md border border-surface-300 dark:border-gray-700 text-ink-sub dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:scale-110 hover:shadow-lg transition-all group"
          aria-label={`上一篇：${prevCustomer.title}`}
        >
          <CaretLeftIcon size={20} weight="bold" />
          <span className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900/85 dark:bg-gray-100/90 text-white dark:text-gray-900 text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            {prevCustomer.title}
          </span>
        </Link>
      )}

      {/* 下一篇导航按钮 */}
      {nextCustomer && (
        <Link
          href={getNavHref ? getNavHref(nextCustomer.id) : `/customer/${nextCustomer.id}`}
          className="hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 items-center justify-center rounded-full bg-white/90 dark:bg-gray-800/80 backdrop-blur-sm shadow-md border border-surface-300 dark:border-gray-700 text-ink-sub dark:text-gray-400 hover:text-brand-600 dark:hover:text-brand-400 hover:scale-110 hover:shadow-lg transition-all group"
          aria-label={`下一篇：${nextCustomer.title}`}
        >
          <CaretRightIcon size={20} weight="bold" />
          <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-gray-900/85 dark:bg-gray-100/90 text-white dark:text-gray-900 text-xs font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-lg">
            {nextCustomer.title}
          </span>
        </Link>
      )}

      {/* 右侧封面贴住视口边缘，避免宽屏下受内容容器 max-width 限制产生留白 */}
      <div className="hidden md:block absolute right-0 top-0 bottom-0 w-[58vw] lg:w-[62vw] z-0">
        <div className="relative h-full w-full overflow-hidden">
          <CustomerCoverImage
            thumbnailUrl={customer.thumbnailUrl}
            imageUrl={customer.imageUrl}
            alt={customer.title}
            loading="eager"
            fetchPriority="high"
            decoding="async"
            className="object-cover transition-transform duration-700 hover:scale-105"
          />
          <div className="absolute inset-y-0 left-0 w-[min(560px,58%)] bg-gradient-to-r from-surface-100 dark:from-[#202124] via-surface-100/95 dark:via-[#202124]/95 to-transparent"></div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-0">
        {/* Hero 区域 */}
        <div className="relative flex flex-col md:flex-row items-center md:min-h-[360px] lg:pl-4">
          <div className="flex-1 space-y-5 z-10 md:max-w-[48%] md:pr-12 lg:pr-10">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={onBack}
                className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-surface-300 bg-white/80 text-ink-sub shadow-[0_1px_2px_rgba(31,35,41,0.04)] backdrop-blur-sm transition-colors hover:border-brand-200 hover:bg-brand-50 hover:text-brand-600 dark:border-[#373c43] dark:bg-[#292d33]/80 dark:text-[#aeb4bc] dark:hover:border-[#5e6673] dark:hover:bg-[#203652] dark:hover:text-[#8ab4f8] md:hidden"
                aria-label="返回上一页"
              >
                <ArrowLeftIcon weight="bold" className="h-4 w-4" />
              </button>
              <CategoryBadge
                label={customer.categoryName}
                color={customer.categoryColor}
                onClick={() => onCategoryClick?.(customer.categoryId)}
                className="px-3.5 py-1.5 text-sm font-semibold shadow-sm transform-gpu"
              />
            </div>
            <h1 className="text-[28px] sm:text-3xl md:text-4xl lg:text-6xl font-bold tracking-tight text-[#1f2329] dark:text-white font-display leading-tight">
              {customer.title}
            </h1>
            <p className="text-base sm:text-lg text-ink-sub dark:text-gray-400 leading-relaxed max-w-xl">
              {customer.description}
            </p>
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-1 text-base text-ink-sub dark:text-gray-400">
              <button
                onClick={handleLikeToggle}
                disabled={isLiked}
                aria-pressed={isLiked}
                title={isLiked ? '已点赞' : '点赞'}
                className={`flex items-center gap-1.5 transition-colors ${
                  isLiked
                    ? 'cursor-default text-red-500'
                    : 'cursor-pointer text-ink-sub hover:text-red-500'
                } disabled:pointer-events-none`}
              >
                <HeartIcon className="text-[20px]" weight={isLiked ? "fill" : "regular"} />
                <span className="font-semibold">{localLikes.toLocaleString()}</span>
              </button>

              <div
                className="flex items-center gap-1.5 text-blue-500"
              >
                <EyeIcon className="text-[20px]" weight={hasViewed ? "fill" : "regular"} />
                <span className="font-semibold">{localUsage || customer.usage}</span>
              </div>

              {customer.createdAt && (
                <>
                  <div className="hidden sm:block w-px h-4 bg-surface-300 dark:bg-gray-700"></div>
                  <div className="flex items-center gap-1.5 text-ink-sub dark:text-gray-400 text-sm font-medium">
                    <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>发布于 {customer.createdAt.split('T')[0]}</span>
                  </div>
                </>
              )}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-start gap-4 pt-4 w-full sm:w-auto">
              <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
                <button
                  onClick={() => openModal({
                    source: 'customer_hero',
                    title: '评估该方案的 POC 可行性',
                    subtitle: '填写约 1 分钟。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付该方案的免费 POC 验证。',
                    customerId: customer.id,
                    customerTitle: customer.title,
                    categoryName: customer.categoryName,
                    customerSlug: customer.slug
                  })}
                  className="inline-flex h-14 w-full min-w-[9.25rem] items-center justify-center whitespace-nowrap rounded-xl bg-brand-600 px-8 text-center text-base font-bold text-white shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-all hover:-translate-y-0.5 hover:bg-brand-700 hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] active:bg-brand-800 sm:w-auto cursor-pointer"
                >
                  验证该方案
                </button>
                <FreeUseHeroButton
                  href={safeFreeUseUrl}
                  title={customer.title}
                  className="w-full sm:w-auto"
                />
              </div>
              <p className="text-xs text-ink-sub dark:text-gray-400 sm:max-w-[260px]">
                1 天内联系，确认适配后最快 3 天完成免费 POC 验证。
              </p>
            </div>
          </div>

          {/* 移动端封面仍随内容流展示，避免遮挡标题与操作按钮 */}
          <div className="w-full mt-7 md:hidden shrink-0 z-0">
            <div className="relative aspect-video w-full max-h-[240px] min-h-[180px] overflow-hidden rounded-2xl border border-surface-200 bg-surface-100 shadow-[0_1px_2px_rgba(31,35,41,0.04)] dark:border-[#373c43] dark:bg-[#2b2f36]">
              <CustomerCoverImage
                thumbnailUrl={customer.thumbnailUrl}
                imageUrl={customer.imageUrl}
                alt={customer.title}
                loading="eager"
                fetchPriority="high"
                decoding="async"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
