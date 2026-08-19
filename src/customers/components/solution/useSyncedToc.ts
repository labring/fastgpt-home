'use client';

import { useCallback, type MouseEvent, type RefObject, useEffect, useMemo, useState, useRef } from 'react';
import {
  buildMarkdownTocItems,
  extractRenderedTocItems,
  getActiveRenderedTocId,
  type TocItem
} from '@/customers/lib/toc';

interface UseSyncedTocOptions {
  containerRef: RefObject<HTMLElement | null>;
  markdownContent: string;
  enabled?: boolean;
}

export function useSyncedToc({
  containerRef,
  markdownContent,
  enabled = true,
  scrollContainerSelector
}: UseSyncedTocOptions & { scrollContainerSelector?: string }) {
  const [renderedTocItems, setRenderedTocItems] = useState<TocItem[]>([]);
  const [trackedActiveId, setTrackedActiveId] = useState('');
  const isClickScrollingRef = useRef(false);
  const clickScrollTimeoutRef = useRef<number | undefined>(undefined);
  const fallbackTocItems = useMemo(
    () => buildMarkdownTocItems(markdownContent),
    [markdownContent]
  );

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
  }, [containerRef, enabled, markdownContent]);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    let ticking = false;

    const handleScroll = () => {
      if (ticking || isClickScrollingRef.current) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(() => {
        if (isClickScrollingRef.current) {
          ticking = false;
          return;
        }

        const container = containerRef.current;
        const nextActiveId = container ? getActiveRenderedTocId(container) : '';

        setTrackedActiveId((prev) => (prev !== nextActiveId ? nextActiveId : prev));
        ticking = false;
      });
    };

    const scrollElement = scrollContainerSelector
      ? document.querySelector(scrollContainerSelector) || window
      : window;

    scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => scrollElement.removeEventListener('scroll', handleScroll);
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
