"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { XIcon } from "@phosphor-icons/react";
import {
  buildContactFormUrl,
  DEFAULT_CTA_MODAL_CONTEXT,
  type CtaModalContext
} from "@/customers/lib/cta";

/** 弹窗打开/关闭的过渡动画时长（ms），需与 CSS transition-all duration-300 保持一致 */
const TRANSITION_MS = 300;

export default function FormModal() {
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  /** 遮罩是否应存在于渲染树中（false → hidden，不创建合成层也不拦截触摸滚动） */
  const [renderOverlay, setRenderOverlay] = useState(false);
  const [isIframeLoading, setIsIframeLoading] = useState(true);
  const [modalContext, setModalContext] = useState<CtaModalContext>(DEFAULT_CTA_MODAL_CONTEXT);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const openRafRef = useRef<ReturnType<typeof requestAnimationFrame> | null>(null);
  /**
   * 当前已挂载 iframe 的 src。
   * - 打开时：若与目标 URL 一致（关闭动画期间快速重开同一按钮），不重置加载态，避免 onLoad 不重触发导致卡死；
   * - 关闭完成卸载 iframe 时置 null，下次打开必然重新加载。
   */
  const mountedSrcRef = useRef<string | null>(null);

  /** 表单 iframe 地址：主站独立表单 + UTM 归因参数（utm_source=customers 等） */
  const formUrl = buildContactFormUrl(modalContext);

  /**
   * 关闭弹窗：
   * 1. 先退出可见状态（触发 opacity 过渡动画）
   * 2. 动画结束后将遮罩从渲染树移除（hidden），彻底释放 GPU 合成层
   */
  const closeModal = useCallback(() => {
    setIsFormModalOpen(false);

    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setRenderOverlay(false);
      mountedSrcRef.current = null; // iframe 已卸载
      closeTimerRef.current = null;
    }, TRANSITION_MS);
  }, []);

  /**
   * 打开弹窗：
   * 1. 先将遮罩加入渲染树（此时 opacity-0，用户不可见）
   * 2. 等待浏览器完成首帧渲染后，切换到 opacity-100 触发入场动画
   *
   * 使用双 rAF 确保浏览器在切换 opacity 前已完成 hidden → flex 的布局计算。
   */
  useEffect(() => {
    const handleOpenModal = (event: Event) => {
      const customEvent = event as CustomEvent<CtaModalContext>;
      const nextContext = { ...DEFAULT_CTA_MODAL_CONTEXT, ...customEvent.detail };
      setModalContext(nextContext);

      // 仅当 iframe 需要重新加载时才显示加载态：
      // 关闭动画期间快速重开同一按钮（iframe 尚未卸载、src 相同）时不会触发 onLoad，重置会导致卡死。
      const nextUrl = buildContactFormUrl(nextContext);
      if (mountedSrcRef.current !== nextUrl) {
        setIsIframeLoading(true);
      }

      // 取消进行中的关闭定时器（用户可能在关闭动画期间重新打开）
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
      if (openRafRef.current) {
        cancelAnimationFrame(openRafRef.current);
        openRafRef.current = null;
      }

      // 步骤 1：将遮罩加入渲染树
      setRenderOverlay(true);

      // 步骤 2：双 rAF 后触发 opacity 入场动画
      openRafRef.current = requestAnimationFrame(() => {
        openRafRef.current = requestAnimationFrame(() => {
          setIsFormModalOpen(true);
          closeButtonRef.current?.focus();
          openRafRef.current = null;
        });
      });
    };
    window.addEventListener('open-form-modal', handleOpenModal);
    return () => {
      window.removeEventListener('open-form-modal', handleOpenModal);
      if (openRafRef.current) cancelAnimationFrame(openRafRef.current);
    };
  }, []);

  // 打开时锁定页面滚动；关闭时恢复
  useEffect(() => {
    if (!isFormModalOpen) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, [isFormModalOpen]);

  // Escape 键关闭弹窗（无障碍最佳实践）
  useEffect(() => {
    if (!isFormModalOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        closeModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isFormModalOpen, closeModal]);

  // 组件卸载时清理所有定时器，防止内存泄漏
  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      if (openRafRef.current) cancelAnimationFrame(openRafRef.current);
    };
  }, []);

  return (
    <div
      role="dialog"
      aria-modal={isFormModalOpen}
      aria-hidden={!isFormModalOpen}
      aria-labelledby="cta-form-dialog-title"
      className={`fixed inset-0 z-100 flex items-end justify-center p-0 sm:items-center sm:p-6 transition-opacity duration-300 ${
        !renderOverlay ? 'hidden' : ''
      } ${
        isFormModalOpen
          ? 'opacity-100 pointer-events-auto'
          : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* 背景遮罩 — 与主站弹窗一致：深色 + 轻微模糊；关闭时移除合成层，避免拦截页面触摸滚动 */}
      <div
        className={`absolute inset-0 bg-[#101828]/55 transition-colors duration-300 ${
          isFormModalOpen ? 'backdrop-blur-[2px]' : ''
        }`}
        onMouseDown={(e) => {
          if (e.target === e.currentTarget) closeModal();
        }}
      />

      {/* 弹窗主体：移动端底部抽屉、桌面居中卡片；embed 表单为紧凑版，高度适配主站弹窗比例 */}
      <div
        className={`relative flex h-[94dvh] w-full flex-col overflow-hidden rounded-t-lg bg-white shadow-2xl transition-all duration-300 dark:bg-[#292d33] sm:h-[min(90dvh,820px)] sm:max-w-[760px] sm:rounded-lg ${
          isFormModalOpen
            ? 'scale-100 translate-y-0'
            : 'scale-95 translate-y-4'
        }`}
      >
        {/* 弹窗头部（紧凑版式，给 iframe 让出高度） */}
        <header className="relative shrink-0 border-b border-[#eaecf0] bg-white px-5 py-3.5 pr-14 dark:border-[#373c43] dark:bg-[#292d33] sm:px-7 sm:py-4 sm:pr-16">
          <h2
            id="cta-form-dialog-title"
            className="m-0 text-lg font-semibold leading-7 text-[#101828] dark:text-[#f1f3f5] sm:text-xl"
          >
            {modalContext.title || DEFAULT_CTA_MODAL_CONTEXT.title}
          </h2>
          <p className="mt-0.5 max-w-[570px] truncate text-xs leading-5 text-[#667085] dark:text-[#aeb4bc]">
            {modalContext.subtitle || DEFAULT_CTA_MODAL_CONTEXT.subtitle}
          </p>
          <button
            type="button"
            ref={closeButtonRef}
            aria-label="关闭表单"
            onClick={closeModal}
            className="absolute right-4 top-4 rounded-lg p-2 text-[#667085] transition-colors hover:bg-gray-100 hover:text-[#101828] dark:text-[#aeb4bc] dark:hover:bg-[#30343b] dark:hover:text-[#f1f3f5] sm:right-5 sm:top-5"
          >
            <XIcon className="h-5 w-5" weight="bold" />
          </button>
        </header>

        {/* Iframe 内容区 — 仅在弹窗打开期间挂载（renderOverlay），关闭动画结束后卸载：
            ① 避免页面访问即加载主站表单页（71KB+ 及第三方脚本）；② 每次打开都是全新挂载，
            相同按钮重复点击也会重新触发 onLoad，杜绝加载态卡死。min-h-0 确保 iframe 撑满剩余高度 */}
        {renderOverlay && (
          <div className="relative min-h-0 flex-1 w-full bg-[#f7f8fa] dark:bg-[#202124]">
            {isIframeLoading && (
              <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-4 bg-white dark:bg-[#292d33]">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-brand-100 dark:border-[#373c43] rounded-full" />
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-brand-600 dark:border-brand-400 rounded-full border-t-transparent animate-spin" />
                </div>
                <p className="text-sm font-medium text-gray-500 dark:text-[#aeb4bc] animate-pulse">
                  正在准备表单内容...
                </p>
              </div>
            )}
            <iframe
              src={formUrl}
              className={`w-full h-full border-0 transition-opacity duration-500 ${
                isIframeLoading ? 'opacity-0' : 'opacity-100'
              }`}
              title={modalContext.title || 'FastGPT 商务咨询表单'}
              onLoad={() => {
                setIsIframeLoading(false);
                mountedSrcRef.current = formUrl;
              }}
              loading="eager"
            />
          </div>
        )}
      </div>
    </div>
  );
}
