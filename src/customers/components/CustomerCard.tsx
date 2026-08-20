"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HeartIcon, EyeIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { formatCount } from "@/customers/lib/counts";
import { withBasePath } from "@/customers/lib/base-path";
import { getCustomerPublicHref } from "@/customers/lib/customer-url";
import type { CustomerCardData } from "@/customers/types/customer";
import CategoryBadge from "@/customers/components/CategoryBadge";
import CustomerCoverImage from "@/customers/components/customer/CustomerCoverImage";
import { FreeUseCardBadge, FreeUseCoverShade } from "@/customers/components/customer/FreeUseAction";
import PublicCaseRibbon from "@/customers/components/customer/PublicCaseRibbon";

import {
  getLikedCustomerState,
  getViewedCustomerState,
  saveLikedCustomerState
} from "@/customers/utils/likes";
export type Customer = CustomerCardData;

interface CustomerCardProps {
  customer: Customer;
  onLikeToggle: (id: string | number, state?: { isLiked: boolean; likes: number }) => void;
  onCategoryClick: (categoryId: string) => void;
  index?: number;
}

const CustomerCard = React.memo(function CustomerCard({
  customer,
  onLikeToggle,
  onCategoryClick,
  index = 0,
}: CustomerCardProps) {
  const router = useRouter();
  const detailHref = withBasePath(getCustomerPublicHref(customer));
  const animationDelay = Math.min(index, 14) * 0.05;
  const [localLikes, setLocalLikes] = useState(customer.likes);
  const [localIsLiked, setLocalIsLiked] = useState(Boolean(customer.isLiked));
  const [localUsage, setLocalUsage] = useState(customer.usage);
  const [localHasViewed, setLocalHasViewed] = useState(Boolean(customer.hasViewed));
  const [isLikePending, setIsLikePending] = useState(false);
  const likedStickyRef = React.useRef(Boolean(customer.isLiked));
  const likesFloorRef = React.useRef<number | null>(null);
  const customerIdRef = React.useRef(customer.id);

  React.useEffect(() => {
    if (customerIdRef.current !== customer.id) {
      customerIdRef.current = customer.id;
      likedStickyRef.current = Boolean(customer.isLiked);
      likesFloorRef.current = null;
    }

    const localState = getLikedCustomerState(customer.id);
    const nextIsLiked = customer.isLiked ?? localState?.isLiked ?? false;
    if (nextIsLiked) {
      likedStickyRef.current = true;
    }

    const nextLikes = likesFloorRef.current === null
      ? customer.likes
      : Math.max(customer.likes, likesFloorRef.current);
    setLocalLikes(nextLikes);
    setLocalIsLiked(likedStickyRef.current || nextIsLiked);
  }, [customer.likes, customer.isLiked, customer.id]);

  React.useEffect(() => {
    setLocalUsage(customer.usage);
    const viewedState = getViewedCustomerState(customer.id);
    setLocalHasViewed(Boolean(customer.hasViewed || viewedState?.hasViewed || false));
  }, [customer.usage, customer.hasViewed, customer.id]);

  React.useEffect(() => {
    if (customer.isLiked) {
      saveLikedCustomerState(customer.id, true);
    }
  }, [customer.id, customer.isLiked]);

  const handleLikeClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (localIsLiked || isLikePending) {
      return;
    }

    likesFloorRef.current = Math.max(localLikes, likesFloorRef.current ?? customer.likes);
    likedStickyRef.current = true;
    setIsLikePending(true);
    setLocalIsLiked(true);
    saveLikedCustomerState(customer.id, true);
    onLikeToggle(customer.id, { isLiked: true, likes: localLikes });

    try {
      const res = await fetch(withBasePath(`/api/customers/${customer.id}/like`), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'like' })
      });
      const data = await res.json().catch(() => null);
      if (res.ok && data?.success && typeof data.likes === 'number') {
        const confirmedLikes = Math.max(data.likes, likesFloorRef.current ?? data.likes);
        likesFloorRef.current = confirmedLikes;
        setLocalIsLiked(true);
        setLocalLikes(confirmedLikes);
        saveLikedCustomerState(customer.id, true);
        onLikeToggle(customer.id, { isLiked: true, likes: confirmedLikes });
      }
    } catch (err) {
      console.error('Like toggle failed:', err);
      likedStickyRef.current = Boolean(customer.isLiked);
      likesFloorRef.current = null;
      setLocalIsLiked(Boolean(customer.isLiked));
      setLocalLikes(customer.likes);
      saveLikedCustomerState(customer.id, Boolean(customer.isLiked));
      onLikeToggle(customer.id, {
        isLiked: Boolean(customer.isLiked),
        likes: customer.likes
      });
    } finally {
      setIsLikePending(false);
    }
  };

  const handleCardClick = () => {
    router.push(detailHref);
  };

  const handleCardKeyDown = (e: React.KeyboardEvent) => {
    // 整卡以 role="link" 暴露：Enter/Space 触发跳转，保证键盘可达。
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      router.push(detailHref);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      role="link"
      tabIndex={0}
      aria-label={`查看案例：${customer.title}`}
      className="customer-card flex flex-col h-full w-full group cursor-pointer animate-fade-in-up focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="card-inner relative flex flex-col h-full w-full overflow-hidden rounded-2xl border border-surface-300 dark:border-[#373c43] bg-white dark:bg-[#292d33] shadow-[0_1px_2px_rgba(31,35,41,0.04)] dark:shadow-[0_4px_16px_rgba(0,0,0,0.20)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-[#b8c0cc] dark:group-hover:border-[#5e6673] group-hover:shadow-[0_14px_32px_rgba(31,35,41,0.10)] dark:group-hover:shadow-[0_14px_30px_rgba(0,0,0,0.30)] transform-gpu">
        <div className="relative h-36 sm:h-40 overflow-hidden bg-surface-100 dark:bg-[#2b2f36] border-b border-surface-200 dark:border-[#373c43] img-wrapper">
          <CustomerCoverImage
            thumbnailUrl={customer.thumbnailUrl}
            imageUrl={customer.imageUrl}
            alt={customer.title}
            loading={index < 4 ? "eager" : "lazy"}
            fetchPriority={index < 4 ? "high" : "auto"}
            decoding="async"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-white/[0.08] to-white/[0.28] dark:from-black/[0.36] dark:via-black/[0.08] dark:to-black/10"></div>
          <FreeUseCoverShade href={customer.freeUseUrl} />
          <CategoryBadge
            label={customer.categoryName}
            color={customer.categoryColor}
            onClick={(e) => {
              e.stopPropagation();
              onCategoryClick(customer.categoryId);
            }}
            surface="onImage"
            className="absolute left-3 top-3 shadow-sm backdrop-blur-md"
          />
          <FreeUseCardBadge href={customer.freeUseUrl} title={customer.title} />
          {customer.isPublicCase && <PublicCaseRibbon />}
        </div>

        <div className="relative z-10 flex flex-1 flex-col bg-transparent p-3.5 sm:p-4 md:p-4">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-[18px] sm:text-[20px] md:text-[22px] font-bold leading-tight text-[#1f2329] dark:text-[#f1f3f5] transition-colors group-hover:text-brand-600 dark:group-hover:text-[#8ab4f8] font-display line-clamp-1">
              {/* 标题链接：提供关键词锚文本、键盘可达与中键新标签打开 */}
              <Link
                href={detailHref}
                onClick={(e) => e.stopPropagation()}
                className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 rounded"
              >
                {customer.title}
              </Link>
            </h3>
          </div>
          <div className="hidden items-center gap-1 sm:gap-1.5 mb-1 mt-0.5 sm:mt-1">
            <div className="relative w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border border-surface-200 dark:border-[#373c43] overflow-hidden bg-white dark:bg-[#2b2f36]">
              <Image
                alt="FastGPT"
                src={withBasePath('/fastgpt.svg')}
                fill
                sizes="20px"
                loading="eager"
                className="object-contain"
              />
            </div>
            <span className="text-xs sm:text-sm font-medium text-gray-500 dark:text-[#dfe1e5]">FastGPT 团队</span>
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 flex items-center justify-center ml-0.5">
              <svg className="w-2 h-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
          </div>
          <p
            className="mb-3 text-xs sm:text-sm leading-normal text-ink-sub dark:text-[#aeb4bc] line-clamp-2 sm:line-clamp-3 min-h-[36px] sm:min-h-[63px] group-hover:text-[#2b2f36] dark:group-hover:text-[#dfe1e5] transition-colors w-full"
            title={customer.description}
          >
            {customer.description}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-surface-200 dark:border-[#373c43] pt-3">
            <div className="flex items-center gap-4 text-sm text-ink-sub dark:text-[#aeb4bc]">
              <div className="inline-flex items-center gap-1.5">
                <button
                  onClick={handleLikeClick}
                  disabled={localIsLiked || isLikePending}
                  aria-pressed={localIsLiked}
                  className={`relative z-50 flex items-center gap-1.5 transition-colors ${
                    localIsLiked
                      ? 'cursor-default text-red-500'
                      : 'cursor-pointer text-red-500 hover:text-red-600 dark:hover:text-red-400'
                  } disabled:pointer-events-none`}
                  title={localIsLiked ? "已点赞" : "点赞"}
                >
                  <HeartIcon
                    weight={localIsLiked ? "fill" : "regular"}
                    className="text-[18px]"
                  />
                  <span className="font-semibold">{formatCount(localLikes)}</span>
                </button>
              </div>
              <div
                className="inline-flex items-center gap-1.5 text-blue-500"
                title={localHasViewed ? "已读" : "查看量"}
                aria-label={localHasViewed ? `已读，查看量 ${localUsage}` : `查看量 ${localUsage}`}
              >
                  <EyeIcon className="text-[18px]" weight={localHasViewed ? "fill" : "regular"} />
                  <span className="font-semibold">{localUsage}</span>
              </div>
            </div>

            <div className="relative z-50">
              <Link
                href={detailHref}
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="group/btn flex items-center justify-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-semibold text-brand-700 dark:text-brand-300 transition-all duration-300 hover:bg-brand-50 dark:hover:bg-brand-900/30 hover:text-brand-800 dark:hover:text-brand-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-brand-300/60 dark:focus-visible:ring-offset-gray-900 cursor-pointer"
              >
                查看详情
                <ArrowRightIcon
                  weight="bold"
                  className="text-sm transition-transform duration-300 group-hover/btn:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default CustomerCard;
