"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRightIcon, XCircleIcon } from "@phosphor-icons/react";
import { withBasePath } from "@/customers/lib/base-path";

interface SearchBarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onSmartSearch?: (query: string) => void;
  isSearching?: boolean;
  placeholder?: string;
  className?: string;
  showTooltipHint?: boolean;
  compact?: boolean;
}

export default function SearchBar({
  searchQuery = "",
  onSearchChange,
  onSmartSearch,
  isSearching = false,
  placeholder = "输入自然语言由AI智能匹配案例，或输入关键词进行筛选...",
  className = "",
  showTooltipHint = true,
  compact = false
}: SearchBarProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const showTimerRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!showTooltipHint) {
      return;
    }

    try {
      const storageKey = 'hasSeenAiSearchTooltip_v2';
      const hasSeenTooltip = localStorage.getItem(storageKey);

      if (!hasSeenTooltip) {
        showTimerRef.current = setTimeout(() => {
          setShowTooltip(true);
        }, 1500);

        hideTimerRef.current = setTimeout(() => {
          setShowTooltip(false);
          try {
            localStorage.setItem(storageKey, 'true');
          } catch (e) {
            console.warn('Failed to save to localStorage:', e);
          }
        }, 9500);
      }
    } catch (e) {
      console.warn('Failed to access localStorage:', e);
    }

    return () => {
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
      if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
    };
  }, [showTooltipHint]);

  const dismissTooltip = () => {
    setShowTooltip(false);
    if (showTimerRef.current) clearTimeout(showTimerRef.current);
    if (hideTimerRef.current) clearTimeout(hideTimerRef.current);

    try {
      localStorage.setItem('hasSeenAiSearchTooltip_v2', 'true');
    } catch (e) {
      console.warn('Failed to save to localStorage:', e);
    }
  };

  return (
    <div className={`relative w-full group ${className}`}>
      {/* AI搜索引导动画 Tooltip */}
      <div
        className={`absolute top-[48px] left-1/2 -translate-x-1/2 z-50 transition-all duration-700 ease-out ${
          showTooltip
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 -translate-y-2 pointer-events-none'
        }`}
      >
        <div className="relative animate-bounce" style={{ animationDuration: '2.5s' }}>
          {/* 向上指的箭头 */}
          <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-white dark:bg-[#2b2f36] rotate-45 rounded-sm border-l border-t border-[#dee0e3] dark:border-[#373c43]"></div>

          <div className="bg-white dark:bg-[#2b2f36] text-[#646a73] dark:text-[#dfe1e5] px-3 py-1.5 rounded-lg shadow-elevation-2 flex items-center gap-2 text-[13px] whitespace-nowrap border border-[#dee0e3] dark:border-[#373c43] cursor-pointer hover:bg-[#f7f8fa] dark:hover:bg-[#30343b] transition-colors" onClick={dismissTooltip}>
            <span className="animate-pulse text-brand-500 text-[14px]">✨</span>
            <span>试试用自然语言描述需求，AI 智能匹配</span>
            <button
              className="ml-0.5 text-gray-400 hover:text-gray-600 dark:text-[#8f959e] dark:hover:text-[#f1f3f5] transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                dismissTooltip();
              }}
            >
              <XCircleIcon weight="fill" className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      <div className={`absolute inset-y-0 left-0 flex items-center pointer-events-none ${compact ? 'pl-3' : 'pl-4'}`}>
        <span
          aria-hidden="true"
          className={`${compact ? 'h-[18px] w-[18px]' : 'h-5 w-5'} bg-current text-gray-400 transition-colors duration-300 group-focus-within:text-blue-600`}
          style={{
            WebkitMask: `url(${withBasePath('/aiSearch.svg')}) center / contain no-repeat`,
            mask: `url(${withBasePath('/aiSearch.svg')}) center / contain no-repeat`
          }}
        />
      </div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => onSearchChange?.(e.target.value)}
        onFocus={dismissTooltip}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && searchQuery.trim()) {
            onSmartSearch?.(searchQuery.trim());
          }
        }}
        className={`${compact ? 'py-2 pl-9 pr-11 text-[13px]' : 'py-2.5 pl-11 pr-14 text-sm sm:pr-24'} block w-full border border-[#dee0e3] dark:border-[#4b525c] rounded-xl bg-[#f7f8fa] dark:bg-[#292d33] placeholder:text-[#8f959e] dark:placeholder:text-[#8f959e] focus:outline-none focus:ring-4 focus:ring-brand-500/10 dark:focus:ring-[#8ab4f8]/15 focus:border-brand-500 dark:focus:border-[#8ab4f8]/60 focus:bg-white dark:focus:bg-[#202124] transition-all duration-300 shadow-md hover:shadow-lg text-[#2b2f36] dark:text-[#dfe1e5]`}
        placeholder={placeholder}
        disabled={isSearching}
      />
      {/* 清除按钮与快捷键提示 */}
      <div className={`absolute inset-y-0 right-0 flex items-center gap-2 ${compact ? 'pr-1.5' : 'pr-2'}`}>
        {searchQuery && !isSearching && (
          <button
            onClick={() => onSearchChange?.("")}
            className="p-1.5 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-all"
            title="清除搜索"
          >
            <XCircleIcon weight="fill" className="h-[18px] w-[18px]" />
          </button>
        )}
        {isSearching ? (
          <div className="flex items-center justify-center w-12">
            <svg className="animate-spin h-5 w-5 text-brand-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        ) : (
          <button
            onClick={() => searchQuery.trim() && onSmartSearch?.(searchQuery.trim())}
            disabled={!searchQuery.trim()}
            className={`group/enter flex items-center justify-center rounded-lg transition-all duration-300 hover:bg-brand-50 active:scale-90 disabled:cursor-not-allowed disabled:opacity-30 dark:hover:bg-brand-900/30 cursor-pointer ${compact ? 'px-2 py-1.5' : 'px-2.5 py-1.5 sm:px-4'}`}
            title="点击搜索"
          >
            <ArrowRightIcon
              weight="bold"
              className="h-4 w-4 text-gray-400 transition-colors group-hover/enter:text-brand-600 dark:text-gray-300 dark:group-hover/enter:text-brand-400 sm:hidden"
            />
            <span className="hidden text-[13px] font-black uppercase tracking-widest text-gray-400 transition-colors group-hover/enter:text-brand-600 dark:text-gray-300 dark:group-hover/enter:text-brand-400 sm:inline">Enter</span>
          </button>
        )}
      </div>
    </div>
  );
}
