'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { hexToRgba, normalizeHexColor } from '@customers/lib/category-color';

export interface CategoryTabItem {
  id: string;
  name: string;
  slug?: string;
  color?: string;
}

interface CategoryTabBarProps {
  categories: CategoryTabItem[];
  currentCategory: string;
  onCategoryChange: (categoryId: string) => void;
  className?: string;
}

export default function CategoryTabBar({
  categories,
  currentCategory,
  onCategoryChange,
  className = ''
}: CategoryTabBarProps) {
  const [showLeftMask, setShowLeftMask] = useState(false);
  const [showRightMask, setShowRightMask] = useState(true);
  const tabsRef = useRef<HTMLDivElement>(null);
  const indicatorRef = useRef<HTMLDivElement>(null);

  const getCategoryColor = useCallback(
    (categoryKey: string) => {
      if (categoryKey === 'all') {
        return '#2563EB';
      }

      const current = categories.find(
        (item) => item.id === categoryKey || item.slug === categoryKey
      );
      return normalizeHexColor(current?.color);
    },
    [categories]
  );

  const handleScroll = useCallback(() => {
    if (tabsRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = tabsRef.current;
      setShowLeftMask(scrollLeft > 4);
      setShowRightMask(scrollLeft + clientWidth < scrollWidth - 4);
    }
  }, []);

  const updateIndicator = useCallback(
    (activeTabId?: string) => {
      if (!tabsRef.current || !indicatorRef.current) {
        return;
      }

      const resolvedActiveTabId =
        activeTabId ||
        categories.find(
          (category) => category.id === currentCategory || category.slug === currentCategory
        )?.id ||
        currentCategory;
      const activeBtn = tabsRef.current.querySelector(
        `button[data-id="${resolvedActiveTabId}"]`
      ) as HTMLElement | null;

      if (!activeBtn) {
        indicatorRef.current.style.opacity = '0';
        return;
      }

      const activeColor = getCategoryColor(resolvedActiveTabId);

      indicatorRef.current.style.opacity = '1';
      indicatorRef.current.style.width = `${activeBtn.offsetWidth}px`;
      indicatorRef.current.style.transform = `translate3d(${activeBtn.offsetLeft}px, 0, 0)`;
      indicatorRef.current.style.backgroundColor = activeColor;
      indicatorRef.current.style.boxShadow = `0 0 12px ${hexToRgba(activeColor, 0.4)}`;
    },
    [categories, currentCategory, getCategoryColor]
  );

  useEffect(() => {
    const tabsElement = tabsRef.current;

    if (tabsElement) {
      handleScroll();
      const handleScrollEvent = () => {
        handleScroll();
      };
      const handleResize = () => {
        handleScroll();
        updateIndicator();
      };
      tabsElement.addEventListener('scroll', handleScrollEvent);
      window.addEventListener('resize', handleResize);

      return () => {
        tabsElement.removeEventListener('scroll', handleScrollEvent);
        window.removeEventListener('resize', handleResize);
      };
    }

    return undefined;
  }, [handleScroll, updateIndicator]);

  const scrollTabIntoView = useCallback((categoryId: string) => {
    const container = tabsRef.current;
    const activeBtn = container?.querySelector(
      `button[data-id="${categoryId}"]`
    ) as HTMLElement | null;

    if (!container || !activeBtn) {
      return;
    }

    const currentScrollLeft = container.scrollLeft;
    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    let targetScrollLeft =
      activeBtn.offsetLeft - container.clientWidth / 2 + activeBtn.offsetWidth / 2;

    targetScrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));
    if (Math.abs(targetScrollLeft - currentScrollLeft) > 1) {
      container.scrollTo({
        left: targetScrollLeft,
        behavior: 'smooth'
      });
    }
  }, []);

  useEffect(() => {
    const activeCategory = categories.find(
      (category) => category.id === currentCategory || category.slug === currentCategory
    );
    const activeTabId = activeCategory?.id || currentCategory;

    updateIndicator(activeTabId);
    scrollTabIntoView(activeTabId);
  }, [categories, currentCategory, scrollTabIntoView, updateIndicator]);

  return (
    <div className={`relative flex items-end self-stretch min-w-0 ${className}`.trim()}>
      <div
        ref={tabsRef}
        data-category-tab-scroller
        className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] w-full pt-1"
      >
        <div className="relative flex w-max min-w-full items-center gap-5 pb-2">
          {categories.map((category) => {
            const isActive = currentCategory === category.id || currentCategory === category.slug;
            const categoryColor = getCategoryColor(category.id);

            return (
              <button
                key={category.id}
                data-id={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`tab-btn cursor-pointer ${
                  category.id === 'all' ? 'text-[17px] font-semibold' : 'text-[15px] font-medium'
                } transition-colors z-10 whitespace-nowrap shrink-0 ${
                  isActive ? 'font-bold' : 'text-ink-sub  hover:text-brand-600 '
                }`}
                style={isActive ? { color: categoryColor } : undefined}
              >
                {category.name}
              </button>
            );
          })}

          <div
            ref={indicatorRef}
            data-category-tab-indicator
            className="absolute bottom-0 left-0 z-20 h-1 rounded-full bg-brand-600 opacity-0 transition-[transform,width,background-color,box-shadow] duration-300 ease-out will-change-transform "
            aria-hidden="true"
          />
        </div>
      </div>

      <div
        className={`absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white via-white/90 to-transparent pointer-events-none z-30 transition-opacity duration-300 ${
          showLeftMask ? 'opacity-100' : 'opacity-0'
        }`}
      />

      <div
        className={`absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white via-white/90 to-transparent pointer-events-none z-30 transition-opacity duration-300 ${
          showRightMask ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
}
