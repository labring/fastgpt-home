'use client';

import { ChevronDown, Text } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';

import type { BlogTocItem } from '@/lib/blogToc';

type BlogArticleTocProps = {
  items: BlogTocItem[];
  label: string;
  footer?: ReactNode;
};

export default function BlogArticleToc({ items, label, footer }: BlogArticleTocProps) {
  const activeId = useActiveToc(items);

  if (items.length === 0) return null;

  return (
    <aside
      className="hidden self-start lg:sticky lg:top-24 lg:h-[calc(100dvh-6rem)] lg:col-span-2 lg:col-start-11 lg:row-span-2 lg:row-start-1 lg:block"
      data-pagefind-ignore
    >
      <div className="flex h-full flex-col overflow-hidden">
        <h2 className="mb-2 inline-flex shrink-0 items-center gap-1.5 pt-8 text-sm text-ink-muted">
          <Text className="size-4" aria-hidden="true" />
          {label}
        </h2>
        <div
          className="min-h-0 flex-1 overflow-y-auto pe-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          data-blog-toc-scroll
        >
          <nav aria-label={label}>
            <DesktopTocItems items={items} activeId={activeId} />
          </nav>
          {footer && <div className="my-4">{footer}</div>}
        </div>
      </div>
    </aside>
  );
}

export function BlogArticleTocMobile({ items, label }: Omit<BlogArticleTocProps, 'footer'>) {
  const [open, setOpen] = useState(false);
  const mobileRef = useRef<HTMLDivElement>(null);
  const activeId = useActiveToc(items, open);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (mobileRef.current && !mobileRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  if (items.length === 0) return null;

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId)
  );
  const activeItem = items[activeIndex] ?? items[0];
  const progress = (activeIndex + 1) / items.length;

  return (
    <div
      ref={mobileRef}
      className="sticky top-[64px] z-20 border-b border-hairline-soft bg-[rgba(255,255,255,0.05)] backdrop-blur-[10px] lg:hidden"
      data-blog-mobile-toc
      data-pagefind-ignore
    >
      <button
        type="button"
        className="flex h-10 w-full items-center gap-2.5 px-4 py-2.5 text-start text-sm text-ink-sub focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary md:px-6"
        aria-expanded={open}
        aria-controls="blog-toc-popover"
        onClick={() => setOpen((current) => !current)}
      >
        <ProgressCircle value={progress} className={open ? 'text-ink' : undefined} />
        <span className="min-w-0 flex-1 truncate">{open ? label : activeItem?.title ?? label}</span>
        <ChevronDown
          className={`mx-0.5 size-4 shrink-0 transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden="true"
        />
      </button>
      {open && (
        <div id="blog-toc-popover" className="max-h-[50vh] overflow-y-auto px-4 pb-4 md:px-6">
          <MobileTocItems items={items} activeId={activeId} onSelect={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

function useActiveToc(items: BlogTocItem[], mobileTocOpen = false) {
  const [activeId, setActiveId] = useState(items[0]?.id);

  useEffect(() => {
    if (items.length === 0) return;

    const updateActive = () => {
      const navbarBottom =
        document.querySelector<HTMLElement>('nav.fixed')?.getBoundingClientRect().bottom ?? 0;
      const mobileTocBottom =
        document.querySelector<HTMLElement>('[data-blog-mobile-toc]')?.getBoundingClientRect()
          .bottom ?? 0;
      const visibleTop = Math.max(0, navbarBottom, mobileTocBottom);
      const visibleBottom = window.innerHeight;
      const lowerViewportStart = visibleBottom * 0.4;
      let nextActiveId = items[0].id;

      for (const [index, item] of items.entries()) {
        const heading = document.getElementById(item.id);
        if (!heading) continue;

        const { top, bottom } = heading.getBoundingClientRect();
        if (bottom <= visibleTop) {
          nextActiveId = item.id;
          continue;
        }
        if (top >= visibleTop && bottom <= visibleBottom) {
          nextActiveId = index > 0 && top >= lowerViewportStart ? items[index - 1].id : item.id;
          break;
        }
        if (top > visibleBottom) break;
      }

      setActiveId((current) => (current === nextActiveId ? current : nextActiveId));
    };

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(updateActive);
    };

    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActive);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActive);
    };
  }, [items, mobileTocOpen]);

  return activeId;
}

type TocGeometry = {
  width: number;
  height: number;
  path: string;
  positions: Array<[top: number, bottom: number]>;
};

function DesktopTocItems({ items, activeId }: { items: BlogTocItem[]; activeId?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [geometry, setGeometry] = useState<TocGeometry | null>(null);

  useEffect(() => {
    const activeItem = containerRef.current?.querySelector<HTMLElement>(
      'a[aria-current="location"]'
    );
    const scrollContainer = containerRef.current?.closest<HTMLElement>('[data-blog-toc-scroll]');
    if (!activeItem || !scrollContainer) return;

    const itemRect = activeItem.getBoundingClientRect();
    const containerRect = scrollContainer.getBoundingClientRect();
    if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
      const itemTop = scrollContainer.scrollTop + itemRect.top - containerRect.top;
      const centeredTop = itemTop - (scrollContainer.clientHeight - activeItem.offsetHeight) / 2;
      scrollContainer.scrollTo({ top: Math.max(0, centeredTop), behavior: 'smooth' });
    }
  }, [activeId]);

  const print = useCallback(() => {
    const container = containerRef.current;
    if (!container || container.clientHeight === 0) return;

    let width = 0;
    let height = 0;
    let path = '';
    const positions: Array<[top: number, bottom: number]> = [];

    for (let index = 0; index < items.length; index++) {
      const item = items[index];
      const element = container.querySelector<HTMLElement>(`[data-toc-index="${index}"]`);
      if (!element) continue;

      const styles = getComputedStyle(element);
      const x = getLineOffset(item.depth) + 0.5;
      const top = element.offsetTop + parseFloat(styles.paddingTop);
      const bottom = element.offsetTop + element.clientHeight - parseFloat(styles.paddingBottom);

      width = Math.max(width, x + 8);
      height = Math.max(height, bottom);

      if (positions.length === 0) {
        path += ` M${x} ${top} L${x} ${bottom}`;
      } else {
        const previousIndex = positions.length - 1;
        const upperBottom = positions[previousIndex][1];
        const upperX = getLineOffset(items[index - 1].depth) + 0.5;
        path += ` C ${upperX} ${top - 4} ${x} ${upperBottom + 4} ${x} ${top} L${x} ${bottom}`;
      }

      positions.push([top, bottom]);
    }

    if (positions.length > 0) setGeometry({ width, height, path, positions });
  }, [items]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let frame = 0;
    const schedulePrint = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(print);
    };
    const observer =
      typeof ResizeObserver === 'undefined' ? null : new ResizeObserver(schedulePrint);

    observer?.observe(container);
    schedulePrint();

    return () => {
      cancelAnimationFrame(frame);
      observer?.disconnect();
    };
  }, [print]);

  const activeIndex = items.findIndex((item) => item.id === activeId);
  const activePosition = geometry?.positions[activeIndex];

  return (
    <div ref={containerRef} className="relative flex flex-col py-3">
      {geometry && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-s-0 top-0 z-0 origin-center text-ink-muted rtl:-scale-x-100"
          style={{ width: geometry.width, height: geometry.height }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={`0 0 ${geometry.width} ${geometry.height}`}
            className="absolute inset-0 size-full overflow-visible"
          >
            <path
              d={geometry.path}
              stroke="currentColor"
              strokeOpacity="0.14"
              strokeWidth="1"
              fill="none"
            />
          </svg>
          {activePosition && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox={`0 0 ${geometry.width} ${geometry.height}`}
              className="absolute inset-0 size-full overflow-visible text-ink transition-[clip-path] duration-300 ease-out"
              style={{
                clipPath: `polygon(0 ${activePosition[0]}px, 100% ${activePosition[0]}px, 100% ${activePosition[1]}px, 0 ${activePosition[1]}px)`
              }}
            >
              <path d={geometry.path} stroke="currentColor" strokeWidth="1.5" fill="none" />
            </svg>
          )}
        </div>
      )}
      {items.map((item, index) => {
        const active = item.id === activeId;
        const first = index === 0;
        const last = index === items.length - 1;

        return (
          <a
            key={item.id}
            data-toc-index={index}
            href={`#${item.id}`}
            aria-current={active ? 'location' : undefined}
            className={`relative z-10 block min-w-0 break-words py-1.5 pe-2 text-sm leading-5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
              active ? 'text-ink' : 'text-ink-muted'
            } ${first ? 'pt-0' : ''} ${last ? 'pb-0' : ''}`}
            style={{ paddingInlineStart: getItemOffset(item.depth) }}
          >
            {item.title}
          </a>
        );
      })}
    </div>
  );
}

function MobileTocItems({
  items,
  activeId,
  onSelect
}: {
  items: BlogTocItem[];
  activeId?: string;
  onSelect?: () => void;
}) {
  return (
    <div className="relative flex flex-col border-s border-black/10 py-3">
      {items.map((item, index) => {
        const active = item.id === activeId;
        const first = index === 0;
        const last = index === items.length - 1;

        return (
          <a
            key={item.id}
            href={`#${item.id}`}
            aria-current={active ? 'location' : undefined}
            onClick={onSelect}
            className={`relative block min-w-0 break-words py-1.5 pe-2 text-sm leading-5 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-inset ${
              active ? 'text-ink' : 'text-ink-muted'
            } ${first ? 'pt-0' : ''} ${last ? 'pb-0' : ''}`}
            style={{ paddingInlineStart: getItemOffset(item.depth) }}
          >
            {item.title}
          </a>
        );
      })}
    </div>
  );
}

const BASE_LINE_OFFSET = 4;

function getItemOffset(depth: number) {
  if (depth <= 2) return 12 + BASE_LINE_OFFSET;
  if (depth === 3) return 24 + BASE_LINE_OFFSET;
  return 36 + BASE_LINE_OFFSET;
}

function getLineOffset(depth: number) {
  if (depth <= 2) return BASE_LINE_OFFSET;
  if (depth === 3) return 8 + BASE_LINE_OFFSET;
  return 16 + BASE_LINE_OFFSET;
}

function ProgressCircle({ value, className }: { value: number; className?: string }) {
  const size = 18;
  const strokeWidth = 1.5;
  const radius = size / 2 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.max(0, Math.min(1, value)) * circumference;

  return (
    <svg
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={1}
      viewBox={`0 0 ${size} ${size}`}
      className={`size-[18px] shrink-0 ${className ?? ''}`}
    >
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeOpacity="0.25"
        strokeWidth={strokeWidth}
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
        className="transition-all"
      />
    </svg>
  );
}
