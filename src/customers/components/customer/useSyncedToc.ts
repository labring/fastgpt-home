'use client';

import { useCallback, type MouseEvent, type RefObject, useEffect, useMemo, useState, useRef } from 'react';
import {
  buildMarkdownTocItems,
  extractRenderedTocItems,
  TOC_HEADING_SELECTOR,
  TOC_SCROLL_OFFSET_TOP,
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

  // 用 IntersectionObserver 替代 scroll + getBoundingClientRect 每帧轮询：
  // 检测带为视口顶部（140px）到 15% 视高区域，仅当标题进出检测带时才回调，
  // 消除长文滚动时对全部标题强制 layout 的 thrash。
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const container = containerRef.current;
    if (!container) {
      return;
    }

    const headings = Array.from(
      container.querySelectorAll<HTMLElement>(TOC_HEADING_SELECTOR)
    );
    if (headings.length === 0) {
      return;
    }

    // 当前在检测带内的标题集合 + 已滚过视口顶部的标题集合。
    // 集合随滚动双向增减，保证向上滚动时高亮能回移到前面的标题。
    const inBandIds = new Set<string>();
    const passedTopIds = new Set<string>();

    // 编辑器等场景正文在指定容器内滚动（scrollContainerSelector），
    // 此时 IO 的 root 应指向该滚动容器而非视口。
    const root = scrollContainerSelector
      ? (document.querySelector(scrollContainerSelector) as Element | null) || undefined
      : undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        if (isClickScrollingRef.current) {
          return;
        }

        for (const entry of entries) {
          const id = (entry.target as HTMLElement).id;
          if (entry.isIntersecting) {
            // 进入检测带 = 当前阅读位置候选
            inBandIds.add(id);
            passedTopIds.delete(id);
          } else {
            inBandIds.delete(id);
            if (entry.boundingClientRect.top < 0) {
              // 已滚过视口顶部：在阅读位置上方
              passedTopIds.add(id);
            } else {
              // 在检测带下方（未到达）：滚回后不再作为候选
              passedTopIds.delete(id);
            }
          }
        }

        // 优先取检测带内 DOM 顺序最后一个标题；检测带为空（快速滚动中）
        // 时回退到已滚过顶部的最后一个，避免高亮跳到空。
        let nextActiveId = '';
        for (const heading of headings) {
          if (inBandIds.has(heading.id)) {
            nextActiveId = heading.id;
          }
        }
        if (!nextActiveId) {
          for (const heading of headings) {
            if (passedTopIds.has(heading.id)) {
              nextActiveId = heading.id;
            }
          }
        }

        setTrackedActiveId((prev) => (prev !== nextActiveId ? nextActiveId : prev));
      },
      {
        root,
        rootMargin: `-${TOC_SCROLL_OFFSET_TOP}px 0px -85% 0px`,
        threshold: 0
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
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
