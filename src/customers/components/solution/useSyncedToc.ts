'use client';

import { useCallback, type MouseEvent, type RefObject, useEffect, useState, useRef } from 'react';
import {
  extractRenderedTocItems,
  getActiveRenderedTocId,
  TOC_SCROLL_OFFSET_TOP,
  type TocItem
} from '@customers/lib/toc';

interface UseSyncedTocOptions {
  containerRef: RefObject<HTMLElement | null>;
  fallbackTocItems: TocItem[];
  enabled?: boolean;
}

export function useSyncedToc({
  containerRef,
  fallbackTocItems,
  enabled = true,
  scrollContainerSelector
}: UseSyncedTocOptions & { scrollContainerSelector?: string }) {
  const [renderedTocItems, setRenderedTocItems] = useState<TocItem[]>([]);
  const [trackedActiveId, setTrackedActiveId] = useState('');
  const isClickScrollingRef = useRef(false);
  const clickScrollTimeoutRef = useRef<number | undefined>(undefined);
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      const container = containerRef.current;
      if (!container) {
        setRenderedTocItems([]);
        return;
      }

      setRenderedTocItems(extractRenderedTocItems(container));
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [containerRef, enabled]);

  // 滚动同步高亮：scroll 监听（可靠、任何滚动都更新）+ rAF 节流 + MutationObserver
  // 处理客户端正文（ReactMarkdown）异步渲染完成后的重算。
  // 不用 IntersectionObserver：其观察目标在正文渲染前可能为空，时序脆弱导致高亮完全不更新。
  useEffect(() => {
    if (!enabled) {
      return;
    }

    let ticking = false;

    const computeActiveId = () => {
      if (isClickScrollingRef.current) {
        return;
      }
      const container = containerRef.current;
      const nextActiveId = container ? getActiveRenderedTocId(container) : '';
      setTrackedActiveId((prev) => (prev !== nextActiveId ? nextActiveId : prev));
    };

    const handleScroll = () => {
      if (ticking) {
        return;
      }
      ticking = true;
      window.requestAnimationFrame(() => {
        ticking = false;
        computeActiveId();
      });
    };

    const scrollElement = scrollContainerSelector
      ? document.querySelector(scrollContainerSelector) || window
      : window;
    scrollElement.addEventListener('scroll', handleScroll, { passive: true });

    // 正文由客户端组件异步渲染：监听容器 DOM 变化，标题插入后立即重算高亮。
    const container = containerRef.current;
    let mutationObserver: MutationObserver | null = null;
    if (container && typeof MutationObserver !== 'undefined') {
      mutationObserver = new MutationObserver(handleScroll);
      mutationObserver.observe(container, { childList: true, subtree: true });
    }

    // 初始计算：rAF 确保 DOM 就绪。
    const initialFrame = window.requestAnimationFrame(computeActiveId);

    return () => {
      scrollElement.removeEventListener('scroll', handleScroll);
      mutationObserver?.disconnect();
      window.cancelAnimationFrame(initialFrame);
    };
  }, [containerRef, enabled, renderedTocItems, scrollContainerSelector]);

  const handleTocItemClick = useCallback(
    (event: MouseEvent<HTMLAnchorElement>, id: string) => {
      if (!enabled) {
        return;
      }

      const container = containerRef.current;
      const target = container?.querySelector<HTMLElement>(`#${CSS.escape(id)}`);

      if (!target) {
        return;
      }

      event.preventDefault();

      isClickScrollingRef.current = true;
      if (clickScrollTimeoutRef.current !== undefined) {
        window.clearTimeout(clickScrollTimeoutRef.current);
      }
      clickScrollTimeoutRef.current = window.setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 1000);

      setTrackedActiveId(id);

      const nextUrl = new URL(window.location.href);
      nextUrl.hash = id;
      window.history.replaceState(null, '', nextUrl.toString());
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    },
    [containerRef, enabled]
  );

  return {
    tocItems: renderedTocItems.length > 0 ? renderedTocItems : fallbackTocItems,
    activeId: enabled ? trackedActiveId : '',
    handleTocItemClick
  };
}
