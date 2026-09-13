'use client';

import { useState, useEffect, useRef } from 'react';
import type { MouseEvent } from 'react';
import { X as XIcon } from 'lucide-react';
import type { TocItem } from '@customers/lib/toc';
import CtaCard from './CtaCard';
import type { ConsultationContext } from '@customers/lib/consultation';

/** 目录抽屉打开/关闭的过渡动画时长（ms），需与 CSS duration-500 保持一致 */
const TRANSITION_MS = 500;

export default function MobileToc({
  isOpen,
  onClose,
  tocItems,
  activeId,
  consultationContext,
  onItemClick
}: {
  isOpen: boolean;
  onClose: () => void;
  tocItems: TocItem[];
  activeId: string;
  consultationContext: ConsultationContext;
  onItemClick?: (event: MouseEvent<HTMLAnchorElement>, id: string) => void;
}) {
  /**
   * 控制遮罩是否应存在于渲染树中。
   * false → 完全从渲染树移除（return null），不创建 GPU 合成层，不拦截触摸滚动。
   * 仅在 isOpen 或关闭动画期间为 true。
   */
  const [renderOverlay, setRenderOverlay] = useState(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (isOpen) {
      // 打开：取消关闭定时器，立即将遮罩加入渲染树
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      // eslint-disable-next-line react-hooks/set-state-in-effect -- 同步动画内部状态到 prop 变更，这是 React 推荐的模式
      setRenderOverlay(true);
    } else if (renderOverlay) {
      // 关闭：等待退出动画结束（500ms），再将遮罩从渲染树移除
      closeTimerRef.current = setTimeout(() => {
        setRenderOverlay(false);
        closeTimerRef.current = null;
      }, TRANSITION_MS);
    }

    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [isOpen, renderOverlay]);

  // 完全关闭后不渲染任何 DOM，从根源上避免固定遮罩层拦截页面触摸滚动
  if (!renderOverlay) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] lg:hidden transition-all duration-500 ${
        isOpen ? 'visible' : 'invisible'
      }`}
    >
      {/* 背景遮罩 — backdrop-blur-xs 仅在打开时应用，关闭时移除 iOS 上的 GPU 合成层，避免拦截页面触摸滚动 */}
      <div
        className={`absolute inset-0 bg-gray-900/60 transition-opacity duration-500 cursor-pointer ${
          isOpen ? 'backdrop-blur-xs opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* 内容区域 */}
      <div
        className={`absolute right-0 top-0 bottom-0 w-[340px] max-w-[85vw] bg-white  shadow-2xl transition-transform duration-500 cubic-bezier(0.4, 0, 0.2, 1) ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-hidden">
          {/* 头部 */}
          <div className="flex items-center justify-between px-6 py-6 border-b border-gray-100 ">
            <h3 className="text-xl font-bold text-gray-900  font-display">目录大纲</h3>
            <button
              onClick={onClose}
              className="p-2 -mr-2 text-gray-400 hover:text-gray-600   transition-colors"
            >
              <XIcon className="w-6 h-6" strokeWidth={2.5} />
            </button>
          </div>

          {/* 列表内容 */}
          <div className="flex-1 overflow-y-auto px-6 py-8 space-y-10 custom-scrollbar">
            <nav className="space-y-3.5">
              {tocItems.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={(event) => {
                      onItemClick?.(event, item.id);
                      onClose();
                    }}
                    className={`block relative wrap-break-words rounded-md py-1 pr-2 leading-6 ${
                      item.indent
                    } ${item.size} transition-all duration-300 ${
                      isActive
                        ? 'text-brand-600  font-bold translate-x-1'
                        : 'text-gray-500  hover:text-brand-600 '
                    }`}
                  >
                    {isActive && (
                      <div className="absolute left-[-12px] top-1.5 bottom-1.5 w-[3px] bg-brand-600  rounded-full shadow-[0_0_12px_rgba(37,99,235,0.6)]"></div>
                    )}
                    {item.text}
                  </a>
                );
              })}
            </nav>

            {/* 移动端侧边栏 CTA 卡片 */}
            <CtaCard variant="mobile" consultationContext={consultationContext} />
          </div>
        </div>
      </div>
    </div>
  );
}
