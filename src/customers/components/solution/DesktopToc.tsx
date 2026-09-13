'use client';

import { useState, useEffect, useRef, useCallback, type MouseEvent } from 'react';
import { ChevronRight as CaretRightIcon } from 'lucide-react';
import type { TocItem } from '@customers/lib/toc';
import CtaCard from './CtaCard';
import type { ConsultationContext } from '@customers/lib/consultation';

export default function DesktopToc({
  isCollapsed,
  onCollapse,
  tocItems,
  activeId,
  consultationContext,
  onItemClick,
  isEditor = false
}: {
  isCollapsed: boolean;
  onCollapse: () => void;
  tocItems: TocItem[];
  activeId: string;
  consultationContext: ConsultationContext;
  onItemClick?: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
  isEditor?: boolean;
}) {
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const [indicator, setIndicator] = useState({ top: 0, height: 0, opacity: 0 });

  const updateIndicator = useCallback(() => {
    const el = itemRefs.current.get(activeId);
    if (!el) {
      setIndicator((prev) => (prev.opacity === 0 ? prev : { top: 0, height: 0, opacity: 0 }));
      return;
    }
    const top = el.offsetTop + 4;
    const height = el.offsetHeight - 8;
    setIndicator({ top, height, opacity: 1 });
  }, [activeId]);

  useEffect(() => {
    requestAnimationFrame(updateIndicator);
  }, [updateIndicator]);

  useEffect(() => {
    window.addEventListener('resize', updateIndicator);
    return () => window.removeEventListener('resize', updateIndicator);
  }, [updateIndicator]);

  const setItemRef = useCallback(
    (id: string) => (el: HTMLElement | null) => {
      if (el) {
        itemRefs.current.set(id, el);
      } else {
        itemRefs.current.delete(id);
      }
    },
    []
  );

  return (
    <aside
      className={`hidden lg:block shrink-0 lg:sticky transition-all duration-500 ease-in-out overflow-hidden ${
        isEditor ? 'top-6' : 'top-28'
      } ${isCollapsed ? 'max-w-0 opacity-0 ml-0' : 'max-w-88 opacity-100 lg:ml-16'}`}
    >
      <div
        className={`w-full lg:w-72 space-y-6 transform transition-transform duration-500 ease-in-out origin-right ${
          isCollapsed ? 'translate-x-full' : 'translate-x-0'
        }`}
      >
        {/* 大纲 */}
        <div className="hidden lg:block">
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gray-100  rounded-full"></div>
            {/* 滑动高亮指示条 */}
            <div
              className="absolute left-0 w-[2px] bg-brand-600  rounded-full shadow-[0_0_8px_rgba(37,99,235,0.6)] z-10 transition-[top,height] duration-300 ease-out"
              style={{ top: indicator.top, height: indicator.height, opacity: indicator.opacity }}
            />
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-900  tracking-wider pl-4">目录大纲</h3>
              <button
                onClick={onCollapse}
                className="p-1.5 text-gray-400 hover:text-gray-600  hover:bg-gray-100  rounded-md transition-colors group"
                title="收起侧边栏"
              >
                <CaretRightIcon
                  className="w-4 h-4 transition-transform group-hover:translate-x-0.5"
                  strokeWidth={2.5}
                />
              </button>
            </div>
            <nav className="space-y-2.5">
              {tocItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    ref={setItemRef(item.id)}
                    href={`#${item.id}`}
                    onClick={(event) => onItemClick?.(event, item.id)}
                    className={`block relative wrap-break-words rounded-md pr-2 leading-6 outline-none transition-colors ${
                      item.indent
                    } ${item.size} ${
                      isActive
                        ? 'text-brand-600  font-semibold'
                        : 'text-gray-500  hover:text-brand-600 '
                    }`}
                  >
                    {item.text}
                  </a>
                );
              })}
            </nav>
          </div>
        </div>

        {/* 行动号召 CTA */}
        <CtaCard variant="desktop" consultationContext={consultationContext} />
      </div>
    </aside>
  );
}
