"use client";

import { useState, useEffect } from "react";
import { openCtaModal } from "@/customers/lib/cta";
import GitHubStarsStat from "@/customers/components/GitHubStarsStat";

export default function Hero({ overviewStats }: { overviewStats: { value: string; label: string; link?: string; live?: boolean }[] }) {
  const fullText = "企业级 AI 客户案例";
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [isTyping, setIsTyping] = useState(true);
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  useEffect(() => {
    let rafId: number;
    let cursorTimeout: ReturnType<typeof setTimeout> | undefined;
    let startTime = 0;
    let lastCharIndex = -1;
    const delay = 500;
    const charInterval = 120;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;

      if (elapsed < delay) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      const typingElapsed = elapsed - delay;
      const charIndex = Math.min(Math.floor(typingElapsed / charInterval), fullText.length);

      if (charIndex !== lastCharIndex) {
        lastCharIndex = charIndex;
        setTypedText(fullText.slice(0, charIndex));
      }

      if (charIndex < fullText.length) {
        rafId = requestAnimationFrame(animate);
      } else {
        setIsTyping(false);
        cursorTimeout = setTimeout(() => {
          setShowCursor(false);
          setIsAnimationComplete(true);
        }, 3000);
      }
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      if (cursorTimeout) clearTimeout(cursorTimeout);
    };
  }, []);

  return (
    <section className="pt-20 pb-2 relative overflow-hidden">
      {/* 背景网格与装饰 */}
      <div className="absolute inset-0 z-0 hero-bg-grid"></div>
      <div className={`absolute top-10 left-[-100px] w-64 h-64 bg-brand-50 dark:bg-brand-500/10 rounded-full blur-3xl opacity-60 z-0 pointer-events-none ${isAnimationComplete ? '' : 'transform-gpu will-change-transform'}`}></div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col items-center text-center mt-2 mb-2 ${isAnimationComplete ? '' : 'transform-gpu'}`}>
        <h1 className={`text-4xl md:text-6xl font-extrabold tracking-tight text-brand-900 dark:text-gray-100 my-6 leading-tight font-display max-w-full flex flex-col md:flex-row flex-nowrap justify-center items-center md:whitespace-nowrap ${isAnimationComplete ? '' : 'transform-gpu will-change-transform'}`}>
          <span>专注于构建</span>
          <span className={`relative inline-block mt-2 md:mt-0 ml-0 md:ml-4 text-4xl md:text-[80px] leading-tight ${isAnimationComplete ? '' : 'transform-gpu'}`}>
            <span className={`inline-block bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 dark:from-brand-400 dark:via-brand-300 dark:to-indigo-400 bg-clip-text text-transparent whitespace-normal md:whitespace-nowrap break-all text-center ${
              isAnimationComplete
                ? "drop-shadow-[0_0_8px_rgba(14,165,233,0.15)]"
                : "bg-[length:200%_auto] animate-gradient-x drop-shadow-[0_0_8px_rgba(14,165,233,0.15)] transform-gpu will-change-transform"
            }`}>
              {typedText}
            </span>
            <span
              key={isTyping ? 'typing' : 'complete'}
              className={`animate-blink text-brand-500 dark:text-brand-400 font-light -ml-1 ${!showCursor ? 'invisible' : ''}`}
            >
              |
            </span>
            <svg
              className="absolute w-full h-3 -bottom-1 left-0 text-brand-100 dark:text-brand-900 -z-10 animate-draw-line"
              viewBox="0 0 100 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0 5 Q 50 10 100 5 L 100 10 L 0 10 Z"
                fill="currentColor"
              ></path>
            </svg>
          </span>
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400 max-w-3xl leading-relaxed mb-8 font-normal px-2">
          依托 <span className="font-semibold text-brand-600 dark:text-brand-400">FastGPT</span> 工作流引擎与知识库检索能力，我们将高频业务场景沉淀为
          <span className="font-semibold text-gray-900 dark:text-gray-200">标准化、可验证、可交付</span> 的 AI 客户案例，帮助企业从场景评估、POC 验证到
          <span className="font-semibold text-brand-600 dark:text-brand-400">生产环境上线高效落地</span>。
        </p>

        <div className="grid w-full grid-cols-2 items-center justify-center gap-3 px-4 mb-6 sm:flex sm:w-auto sm:flex-row sm:gap-4">
          <button
            onClick={() => openCtaModal({
              source: 'home_hero',
              title: '免费评估 AI 落地场景',
              subtitle: '填写约 1 分钟。商务顾问将在 1 天内联系你，确认需求后最快 3 天交付 POC 验证，助力后续生产级交付。'
            })}
            className="w-full sm:w-auto px-3 sm:px-8 py-3.5 text-sm sm:text-lg font-bold rounded-full text-white bg-brand-600 hover:bg-brand-700 active:bg-brand-900 transition-colors shadow-[0_4px_14px_rgba(37,99,235,0.3)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 text-center whitespace-nowrap"
          >
            免费评估场景
          </button>
          <a
            href="https://fastgpt.cn/zh"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-3 sm:px-8 py-3.5 text-sm sm:text-lg font-bold rounded-full text-brand-700 dark:text-brand-100 bg-white dark:bg-white/10 border-2 border-brand-200 dark:border-white/20 hover:border-brand-500 dark:hover:border-white transition-all hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)] hover:-translate-y-0.5 text-center cursor-pointer whitespace-nowrap"
          >
            进入官网
          </a>
        </div>
        <p className="-mt-3 mb-6 px-4 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          1 天内商务联系，确认需求后最快 3 天交付免费 POC 验证。
        </p>

        <div className="self-stretch flex flex-nowrap overflow-x-auto justify-start lg:justify-center gap-6 md:gap-8 -mx-4 sm:-mx-6 lg:mx-0 pb-2 pt-1 px-4 sm:px-6 lg:px-0 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] after:content-[''] after:w-1 after:shrink-0 lg:after:hidden">
          {overviewStats.map((item) => {
            const CardWrapper = item.link ? 'a' : 'div';
            const linkProps = item.link ? { href: item.link, target: "_blank", rel: "noopener noreferrer" } : {};

            return (
              <CardWrapper
                key={item.label}
                {...linkProps}
                className="shrink-0 snap-center flex items-baseline gap-2 border-l border-[#d7dbe0] dark:border-white/10 pl-4 first:border-l-0 first:pl-0 transition-colors cursor-pointer group"
              >
                <div className="text-2xl md:text-[28px] font-extrabold tracking-tight text-brand-600 dark:text-brand-400 font-display group-hover:text-brand-700 dark:group-hover:text-brand-300 transition-colors">
                  {item.live ? <GitHubStarsStat initial={item.value} /> : item.value}
                </div>
                <div className={`text-sm font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors flex items-center ${item.link ? 'pr-4 relative' : ''}`}>
                  {item.label}
                  {item.link && (
                    <svg className="w-3 h-3 absolute right-0 opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </div>
              </CardWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}
